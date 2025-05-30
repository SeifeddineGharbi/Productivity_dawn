"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Animated,
} from "../utils/react-native-web"
import type { TasksScreenProps, TaskData, UserProgress, TaskItem, WeekDay } from "./types"
import { tasksFirebaseService } from "./firebase-service"
import { notificationService } from "./notification-service"

const EXACT_TASKS: Omit<TaskItem, "completed">[] = [
  {
    id: "drinkWater",
    title: "Drink Water",
    description: "Consume water immediately upon waking",
    emoji: "💧",
    color: "blue",
    hexColor: "#007AFF",
  },
  {
    id: "noSocialMedia",
    title: "No Social Media",
    description: "Avoid notifications/social media before getting out of bed",
    emoji: "📱",
    color: "red",
    hexColor: "#FF3B30",
  },
  {
    id: "sunlightExposure",
    title: "Sunlight Exposure",
    description: "Get 5-10 minutes of direct sunlight",
    emoji: "☀️",
    color: "yellow",
    hexColor: "#FFCC00",
  },
  {
    id: "elephantTask",
    title: "Elephant Task",
    description: "Identify the most important task of the day",
    emoji: "🐘",
    color: "green",
    hexColor: "#34C759",
  },
]

export const TasksScreen: React.FC<TasksScreenProps> = ({ userId, userName, wakeTime }) => {
  const [todayTasks, setTodayTasks] = useState<TaskData | null>(null)
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null)
  const [weekData, setWeekData] = useState<WeekDay[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [localTasks, setLocalTasks] = useState({
    drinkWater: false,
    noSocialMedia: false,
    sunlightExposure: false,
    elephantTask: false,
  })

  // Animation values for task toggles
  const animatedValues = useMemo(
    () => ({
      drinkWater: new Animated.Value(0),
      noSocialMedia: new Animated.Value(0),
      sunlightExposure: new Animated.Value(0),
      elephantTask: new Animated.Value(0),
    }),
    [],
  )

  // Initialize data and listeners
  useEffect(() => {
    initializeData()
    setupNotifications()

    // Log screen view
    tasksFirebaseService.logScreenView(userId)

    // Set up real-time listener for today's tasks
    const unsubscribe = tasksFirebaseService.subscribeToTodayTasks(userId, (data) => {
      setTodayTasks(data)
      if (data) {
        setLocalTasks(data.tasks)
        // Update animations based on completed tasks
        Object.entries(data.tasks).forEach(([taskId, completed]) => {
          Animated.timing(animatedValues[taskId as keyof typeof animatedValues], {
            toValue: completed ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
          }).start()
        })
      }
    })

    return () => {
      unsubscribe()
    }
  }, [userId])

  // Initialize data
  const initializeData = async () => {
    setIsLoading(true)
    try {
      // Load user progress
      const progress = await tasksFirebaseService.getUserProgress(userId)
      setUserProgress(progress)

      // Load week data for calendar
      const startOfWeek = getStartOfWeek(new Date())
      const weekTasks = await tasksFirebaseService.getWeekData(userId, startOfWeek)
      setWeekData(generateWeekData(startOfWeek, weekTasks))
    } catch (error) {
      console.error("Error initializing data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Setup notifications
  const setupNotifications = async () => {
    const hasPermission = await notificationService.requestPermissions()
    if (hasPermission) {
      notificationService.scheduleMorningReminder(wakeTime, userId)
    }
  }

  // Get start of current week (Monday)
  const getStartOfWeek = (date: Date): Date => {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
    return new Date(d.setDate(diff))
  }

  // Generate week data for calendar
  const generateWeekData = (startDate: Date, weekTasks: TaskData[]): WeekDay[] => {
    const days: WeekDay[] = []
    const today = new Date().toISOString().split("T")[0]

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)
      const dateStr = date.toISOString().split("T")[0]

      const dayTask = weekTasks.find((task) => task.date === dateStr)

      days.push({
        date: dateStr,
        dayName: date.toLocaleDateString("en", { weekday: "short" }),
        isToday: dateStr === today,
        tasks: dayTask?.tasks || null,
        score: dayTask?.score || 0,
      })
    }

    return days
  }

  // Toggle task with analytics
  const toggleTaskWithAnalytics = useCallback(
    (taskId: keyof TaskData["tasks"]) => {
      // Don't allow changes if already submitted
      if (todayTasks) return

      const newValue = !localTasks[taskId]
      setLocalTasks((prev) => ({
        ...prev,
        [taskId]: newValue,
      }))

      // Animate the change
      Animated.spring(animatedValues[taskId], {
        toValue: newValue ? 1 : 0,
        useNativeDriver: false,
        tension: 100,
        friction: 8,
      }).start()

      // Log analytics
      tasksFirebaseService.logTaskToggle(taskId, newValue, userId)
    },
    [localTasks, todayTasks, animatedValues, userId],
  )

  // Submit tasks with scoring
  const submitTasksWithScoring = async () => {
    if (isSubmitting || todayTasks) return

    setIsSubmitting(true)
    try {
      const result = await tasksFirebaseService.submitTasks(userId, localTasks)

      if (result.success) {
        Alert.alert(
          "Tasks Submitted! 🎉",
          `Score: ${result.score}%\n\n${result.message}`,
          [
            {
              text: "Awesome!",
              style: "default",
            },
          ],
          { cancelable: false },
        )

        // Refresh user progress
        const progress = await tasksFirebaseService.getUserProgress(userId)
        setUserProgress(progress)
      }
    } catch (error) {
      console.error("Error submitting tasks:", error)
      Alert.alert("Error", "Failed to submit tasks. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Format current date
  const formattedDate = new Date().toLocaleDateString("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

  // Prepare tasks with completion status
  const tasksWithCompletion: TaskItem[] = EXACT_TASKS.map((task) => ({
    ...task,
    completed: todayTasks ? todayTasks.tasks[task.id] : localTasks[task.id],
  }))

  // Check if already submitted
  const isSubmitted = !!todayTasks

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#007AFF" />
        <Text className="mt-4 text-gray-600">Loading your morning plan...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-4 py-2">
        <Text className="text-2xl font-bold text-gray-900">Good morning, {userName}! 🌅</Text>
        <Text className="text-base text-gray-600">{formattedDate}</Text>
      </View>

      {/* Weekly Calendar */}
      <ScrollView horizontal className="px-4 mb-4" showsHorizontalScrollIndicator={false}>
        {weekData.map((day) => (
          <View key={day.date} className={`items-center mr-4 ${day.isToday ? "bg-blue-50 rounded-lg p-2" : ""}`}>
            <Text className={`text-sm font-medium mb-2 ${day.isToday ? "text-blue-600" : "text-gray-600"}`}>
              {day.dayName}
            </Text>
            <View className="flex-row">
              <View className={`w-2 h-2 rounded-full mr-1 ${day.tasks?.drinkWater ? "bg-blue-500" : "bg-gray-300"}`} />
              <View
                className={`w-2 h-2 rounded-full mr-1 ${day.tasks?.noSocialMedia ? "bg-red-500" : "bg-gray-300"}`}
              />
              <View
                className={`w-2 h-2 rounded-full mr-1 ${day.tasks?.sunlightExposure ? "bg-yellow-400" : "bg-gray-300"}`}
              />
              <View className={`w-2 h-2 rounded-full ${day.tasks?.elephantTask ? "bg-green-500" : "bg-gray-300"}`} />
            </View>
            {day.isToday && <Text className="text-xs text-blue-600 mt-1 font-medium">Today</Text>}
          </View>
        ))}
      </ScrollView>

      {/* Today's Tasks */}
      <View className="px-4 mb-6">
        <View className="bg-white rounded-2xl p-6 shadow-md">
          <Text className="text-xl font-semibold mb-4 text-gray-900">Today's Morning Plan</Text>

          {isSubmitted && (
            <View className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
              <View className="flex-row items-center">
                <Text className="text-green-600 mr-2">✅</Text>
                <Text className="text-green-700 font-medium">Tasks completed! Score: {todayTasks?.score}%</Text>
              </View>
              <Text className="text-green-600 text-sm mt-1">
                {tasksFirebaseService.getMotivationalMessage(todayTasks?.score || 0)}
              </Text>
            </View>
          )}

          {tasksWithCompletion.map((task) => (
            <TouchableOpacity
              key={task.id}
              className={`flex-row items-center py-3 ${isSubmitted ? "opacity-70" : "active:opacity-70"}`}
              onPress={() => toggleTaskWithAnalytics(task.id)}
              disabled={isSubmitted}
            >
              <Text className="text-2xl mr-4">{task.emoji}</Text>
              <View className="flex-1">
                <Text className="text-base font-medium text-gray-900">{task.title}</Text>
                <Text className="text-sm text-gray-500">{task.description}</Text>
              </View>
              <Animated.View
                className={`w-6 h-6 rounded-full border-2 items-center justify-center`}
                style={{
                  backgroundColor: animatedValues[task.id].interpolate({
                    inputRange: [0, 1],
                    outputRange: ["transparent", task.hexColor],
                  }),
                  borderColor: animatedValues[task.id].interpolate({
                    inputRange: [0, 1],
                    outputRange: ["#D1D5DB", task.hexColor],
                  }),
                }}
              >
                {task.completed && <Text className="text-white text-xs font-bold">✓</Text>}
              </Animated.View>
            </TouchableOpacity>
          ))}

          {!isSubmitted && (
            <TouchableOpacity
              className={`rounded-xl py-4 mt-6 ${isSubmitting ? "bg-blue-400" : "bg-blue-500 active:bg-blue-600"}`}
              onPress={submitTasksWithScoring}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text className="text-white font-semibold text-center text-base">Submit Tasks</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Streak Counter */}
      <View className="px-4 pb-4">
        <Text className="text-center text-gray-600">Current Streak: {userProgress?.currentStreak || 0} days 🔥</Text>
        {userProgress?.longestStreak && userProgress.longestStreak > (userProgress.currentStreak || 0) && (
          <Text className="text-center text-gray-500 text-sm mt-1">Best Streak: {userProgress.longestStreak} days</Text>
        )}
      </View>
    </SafeAreaView>
  )
}
