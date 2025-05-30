import { initializeApp } from "firebase/app"
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  onSnapshot,
  serverTimestamp,
  enableNetwork,
  disableNetwork,
} from "firebase/firestore"
import { getAnalytics, logEvent } from "firebase/analytics"
import AsyncStorage from "@react-native-async-storage/async-storage"
import NetInfo from "@react-native-community/netinfo"
import type { TaskData, UserProgress, OfflineTask } from "./types"

// Initialize Firebase (replace with your config)
const firebaseConfig = {
  // Your Firebase config here
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const analytics = getAnalytics(app)

class TasksFirebaseService {
  private offlineQueue: OfflineTask[] = []
  private isOnline = true

  constructor() {
    this.initializeNetworkListener()
    this.loadOfflineQueue()
  }

  // Network monitoring
  private initializeNetworkListener() {
    NetInfo.addEventListener((state) => {
      const wasOffline = !this.isOnline
      this.isOnline = state.isConnected ?? false

      if (wasOffline && this.isOnline) {
        this.syncOfflineQueue()
      }

      if (this.isOnline) {
        enableNetwork(db)
      } else {
        disableNetwork(db)
      }
    })
  }

  // Get today's date in YYYY-MM-DD format
  private getTodayDate(): string {
    return new Date().toISOString().split("T")[0]
  }

  // Check if it's past 3 AM (daily reset time)
  private shouldResetDaily(lastDate: string): boolean {
    const today = new Date()
    const lastSubmission = new Date(lastDate)
    const resetTime = new Date(today)
    resetTime.setHours(3, 0, 0, 0) // 3:00 AM

    // If current time is before 3 AM, use yesterday's reset time
    if (today.getHours() < 3) {
      resetTime.setDate(resetTime.getDate() - 1)
    }

    return lastSubmission < resetTime
  }

  // Calculate weighted score
  calculateScore(tasks: TaskData["tasks"]): number {
    const weights = {
      drinkWater: 0.2, // 20% weight
      noSocialMedia: 0.3, // 30% weight (highest)
      sunlightExposure: 0.2, // 20% weight
      elephantTask: 0.3, // 30% weight (highest)
    }

    let totalScore = 0
    if (tasks.drinkWater) totalScore += weights.drinkWater
    if (tasks.noSocialMedia) totalScore += weights.noSocialMedia
    if (tasks.sunlightExposure) totalScore += weights.sunlightExposure
    if (tasks.elephantTask) totalScore += weights.elephantTask

    return Math.round(totalScore * 100) // Return percentage
  }

  // Get motivational message based on score
  getMotivationalMessage(score: number): string {
    if (score >= 90) return "CRUSHING IT! You're unstoppable!"
    if (score >= 75) return "STRONG performance! Keep building momentum!"
    if (score >= 50) return "SOLID effort! Tomorrow's your chance to level up!"
    if (score >= 30) return "PROGRESS over perfection! You're building something great!"
    return "Every CHAMPION has off days. Ready to bounce back?"
  }

  // Get today's task data
  async getTodayTasks(userId: string): Promise<TaskData | null> {
    try {
      const todayDate = this.getTodayDate()
      const taskRef = doc(db, "tasks", `${userId}_${todayDate}`)
      const taskSnap = await getDoc(taskRef)

      if (taskSnap.exists()) {
        return { id: taskSnap.id, ...taskSnap.data() } as TaskData
      }

      return null
    } catch (error) {
      console.error("Error getting today's tasks:", error)
      return null
    }
  }

  // Submit tasks (with offline support)
  async submitTasks(
    userId: string,
    tasks: TaskData["tasks"],
    forceOffline = false,
  ): Promise<{ success: boolean; score: number; message: string }> {
    const score = this.calculateScore(tasks)
    const message = this.getMotivationalMessage(score)
    const todayDate = this.getTodayDate()

    const taskData: Omit<TaskData, "id"> = {
      userId,
      date: todayDate,
      tasks,
      score,
      submittedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // If offline or forced offline, queue the submission
    if (!this.isOnline || forceOffline) {
      await this.queueOfflineSubmission(userId, todayDate, tasks)
      return { success: true, score, message }
    }

    try {
      const taskRef = doc(db, "tasks", `${userId}_${todayDate}`)

      await setDoc(taskRef, {
        ...taskData,
        submittedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })

      // Update user progress
      await this.updateUserProgress(userId, score, todayDate)

      // Log analytics events
      Object.entries(tasks).forEach(([taskName, completed]) => {
        if (completed) {
          logEvent(analytics, "task_completed", {
            task_name: taskName,
            user_id: userId,
            score,
          })
        }
      })

      logEvent(analytics, "tasks_submitted", {
        user_id: userId,
        score,
        total_completed: Object.values(tasks).filter(Boolean).length,
      })

      return { success: true, score, message }
    } catch (error) {
      console.error("Error submitting tasks:", error)
      // Fallback to offline queue
      await this.queueOfflineSubmission(userId, todayDate, tasks)
      return { success: true, score, message }
    }
  }

  // Update user progress and streak
  private async updateUserProgress(userId: string, score: number, date: string): Promise<void> {
    try {
      const progressRef = doc(db, "userProgress", userId)
      const progressSnap = await getDoc(progressRef)

      let currentStreak = 1
      let longestStreak = 1
      let totalDays = 1

      if (progressSnap.exists()) {
        const data = progressSnap.data() as UserProgress
        totalDays = (data.totalDays || 0) + 1

        // Calculate streak
        const lastDate = data.lastSubmissionDate
        if (lastDate) {
          const yesterday = new Date()
          yesterday.setDate(yesterday.getDate() - 1)
          const yesterdayStr = yesterday.toISOString().split("T")[0]

          if (lastDate === yesterdayStr || this.shouldResetDaily(lastDate)) {
            currentStreak = (data.currentStreak || 0) + 1
          } else {
            currentStreak = 1
          }
        }

        longestStreak = Math.max(currentStreak, data.longestStreak || 0)
      }

      await setDoc(
        progressRef,
        {
          userId,
          currentStreak,
          longestStreak,
          totalDays,
          lastSubmissionDate: date,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      )
    } catch (error) {
      console.error("Error updating user progress:", error)
    }
  }

  // Get user progress
  async getUserProgress(userId: string): Promise<UserProgress | null> {
    try {
      const progressRef = doc(db, "userProgress", userId)
      const progressSnap = await getDoc(progressRef)

      if (progressSnap.exists()) {
        return { id: progressSnap.id, ...progressSnap.data() } as UserProgress
      }

      return null
    } catch (error) {
      console.error("Error getting user progress:", error)
      return null
    }
  }

  // Get week data for calendar
  async getWeekData(userId: string, startDate: Date): Promise<TaskData[]> {
    try {
      const endDate = new Date(startDate)
      endDate.setDate(endDate.getDate() + 6)

      const startDateStr = startDate.toISOString().split("T")[0]
      const endDateStr = endDate.toISOString().split("T")[0]

      const tasksQuery = query(
        collection(db, "tasks"),
        where("userId", "==", userId),
        where("date", ">=", startDateStr),
        where("date", "<=", endDateStr),
        orderBy("date"),
      )

      const querySnapshot = await getDocs(tasksQuery)
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as TaskData)
    } catch (error) {
      console.error("Error getting week data:", error)
      return []
    }
  }

  // Real-time listener for today's tasks
  subscribeToTodayTasks(userId: string, callback: (data: TaskData | null) => void): () => void {
    const todayDate = this.getTodayDate()
    const taskRef = doc(db, "tasks", `${userId}_${todayDate}`)

    return onSnapshot(
      taskRef,
      (doc) => {
        if (doc.exists()) {
          callback({ id: doc.id, ...doc.data() } as TaskData)
        } else {
          callback(null)
        }
      },
      (error) => {
        console.error("Error in real-time listener:", error)
        callback(null)
      },
    )
  }

  // Offline queue management
  private async queueOfflineSubmission(userId: string, date: string, tasks: TaskData["tasks"]): Promise<void> {
    const offlineTask: OfflineTask = {
      id: `${userId}_${date}_${Date.now()}`,
      userId,
      date,
      tasks,
      timestamp: new Date(),
      synced: false,
    }

    this.offlineQueue.push(offlineTask)
    await this.saveOfflineQueue()
  }

  private async loadOfflineQueue(): Promise<void> {
    try {
      const queueData = await AsyncStorage.getItem("@tasks_offline_queue")
      if (queueData) {
        this.offlineQueue = JSON.parse(queueData)
      }
    } catch (error) {
      console.error("Error loading offline queue:", error)
    }
  }

  private async saveOfflineQueue(): Promise<void> {
    try {
      await AsyncStorage.setItem("@tasks_offline_queue", JSON.stringify(this.offlineQueue))
    } catch (error) {
      console.error("Error saving offline queue:", error)
    }
  }

  private async syncOfflineQueue(): Promise<void> {
    if (this.offlineQueue.length === 0) return

    console.log(`Syncing ${this.offlineQueue.length} offline submissions...`)

    for (const offlineTask of this.offlineQueue) {
      if (offlineTask.synced) continue

      try {
        await this.submitTasks(offlineTask.userId, offlineTask.tasks)
        offlineTask.synced = true
      } catch (error) {
        console.error("Error syncing offline task:", error)
      }
    }

    // Remove synced tasks
    this.offlineQueue = this.offlineQueue.filter((task) => !task.synced)
    await this.saveOfflineQueue()

    console.log("Offline sync completed")
  }

  // Analytics helpers
  logTaskToggle(taskName: string, completed: boolean, userId: string): void {
    logEvent(analytics, "task_toggled", {
      task_name: taskName,
      completed,
      user_id: userId,
    })
  }

  logScreenView(userId: string): void {
    logEvent(analytics, "screen_view", {
      screen_name: "tasks",
      user_id: userId,
    })
  }
}

export const tasksFirebaseService = new TasksFirebaseService()
