export interface AnalyticsData {
  weekStart: string // YYYY-MM-DD format
  weekEnd: string
  days: DayAnalytics[]
  weeklyStats: WeeklyStats
  taskBreakdown: TaskBreakdown
  streakData: StreakData
}

export interface DayAnalytics {
  date: string
  dayName: string
  isToday: boolean
  tasks: {
    drinkWater: boolean
    noSocialMedia: boolean
    sunlightExposure: boolean
    elephantTask: boolean
  } | null
  score: number
  isPerfectDay: boolean
  completedCount: number
}

export interface WeeklyStats {
  totalDays: number
  completedDays: number
  perfectDays: number
  averageScore: number
  completionPercentage: number
  trend: "up" | "down" | "stable"
  trendPercentage: number
}

export interface TaskBreakdown {
  drinkWater: TaskStats
  noSocialMedia: TaskStats
  sunlightExposure: TaskStats
  elephantTask: TaskStats
}

export interface TaskStats {
  completed: number
  total: number
  percentage: number
  trend: "up" | "down" | "stable"
}

export interface StreakData {
  current: number
  best: number
  isNewRecord: boolean
  daysUntilNextMilestone: number
  nextMilestone: number
}

export interface AnalyticsScreenProps {
  userId: string
  userName: string
}

export interface WeekSelectorProps {
  currentWeek: Date
  onWeekChange: (week: Date) => void
  canGoNext: boolean
}

export interface ProgressGridProps {
  days: DayAnalytics[]
  onDayPress: (day: DayAnalytics) => void
}

export interface DayDetailModalProps {
  day: DayAnalytics | null
  isVisible: boolean
  onClose: () => void
}
