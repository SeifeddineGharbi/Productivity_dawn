// Firebase data structure types
export interface TaskData {
  id: string
  userId: string
  date: string // YYYY-MM-DD format
  tasks: {
    drinkWater: boolean
    noSocialMedia: boolean
    sunlightExposure: boolean
    elephantTask: boolean
  }
  score: number
  submittedAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface UserProgress {
  id: string
  userId: string
  currentStreak: number
  longestStreak: number
  totalDays: number
  lastSubmissionDate: string
  wakeTime: { hour: number; minute: number }
  updatedAt: Date
}

export interface OfflineTask {
  id: string
  userId: string
  date: string
  tasks: TaskData["tasks"]
  timestamp: Date
  synced: boolean
}

export interface TaskItem {
  id: keyof TaskData["tasks"]
  title: string
  description: string
  emoji: string
  color: string
  hexColor: string
  completed: boolean
}

export interface WeekDay {
  date: string
  dayName: string
  isToday: boolean
  tasks: TaskData["tasks"] | null
  score: number
}

export interface TasksScreenProps {
  userId: string
  userName: string
  wakeTime: { hour: number; minute: number }
}
