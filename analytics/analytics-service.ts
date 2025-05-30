import { tasksFirebaseService } from "../tasks/firebase-service"
import type { TaskData } from "../tasks/types"
import type { AnalyticsData, DayAnalytics, WeeklyStats, TaskBreakdown, StreakData } from "./types"

class AnalyticsService {
  // Get analytics data for a specific week
  async getWeekAnalytics(userId: string, weekStart: Date): Promise<AnalyticsData> {
    try {
      // Get week data from Firebase
      const weekTasks = await tasksFirebaseService.getWeekData(userId, weekStart)

      // Get user progress for streak data
      const userProgress = await tasksFirebaseService.getUserProgress(userId)

      // Generate week end date
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekEnd.getDate() + 6)

      // Process daily analytics
      const days = this.processDailyAnalytics(weekStart, weekTasks)

      // Calculate weekly stats
      const weeklyStats = this.calculateWeeklyStats(days, weekTasks)

      // Calculate task breakdown
      const taskBreakdown = this.calculateTaskBreakdown(days)

      // Process streak data
      const streakData = this.processStreakData(userProgress)

      return {
        weekStart: weekStart.toISOString().split("T")[0],
        weekEnd: weekEnd.toISOString().split("T")[0],
        days,
        weeklyStats,
        taskBreakdown,
        streakData,
      }
    } catch (error) {
      console.error("Error getting week analytics:", error)
      throw error
    }
  }

  // Process daily analytics for the week
  private processDailyAnalytics(weekStart: Date, weekTasks: TaskData[]): DayAnalytics[] {
    const days: DayAnalytics[] = []
    const today = new Date().toISOString().split("T")[0]

    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart)
      date.setDate(date.getDate() + i)
      const dateStr = date.toISOString().split("T")[0]

      const dayTask = weekTasks.find((task) => task.date === dateStr)
      const tasks = dayTask?.tasks || null

      let completedCount = 0
      let isPerfectDay = false

      if (tasks) {
        completedCount = Object.values(tasks).filter(Boolean).length
        isPerfectDay = completedCount === 4
      }

      days.push({
        date: dateStr,
        dayName: date.toLocaleDateString("en", { weekday: "short" }),
        isToday: dateStr === today,
        tasks,
        score: dayTask?.score || 0,
        isPerfectDay,
        completedCount,
      })
    }

    return days
  }

  // Calculate weekly statistics
  private calculateWeeklyStats(days: DayAnalytics[], weekTasks: TaskData[]): WeeklyStats {
    const completedDays = days.filter((day) => day.tasks !== null).length
    const perfectDays = days.filter((day) => day.isPerfectDay).length
    const totalScore = days.reduce((sum, day) => sum + day.score, 0)
    const averageScore = completedDays > 0 ? Math.round(totalScore / completedDays) : 0
    const completionPercentage = Math.round((completedDays / 7) * 100)

    // Calculate trend (compare with previous week if available)
    const trend = this.calculateTrend(weekTasks)

    return {
      totalDays: 7,
      completedDays,
      perfectDays,
      averageScore,
      completionPercentage,
      trend: trend.direction,
      trendPercentage: trend.percentage,
    }
  }

  // Calculate task breakdown statistics
  private calculateTaskBreakdown(days: DayAnalytics[]): TaskBreakdown {
    const taskNames: (keyof DayAnalytics["tasks"])[] = [
      "drinkWater",
      "noSocialMedia",
      "sunlightExposure",
      "elephantTask",
    ]
    const breakdown: Partial<TaskBreakdown> = {}

    taskNames.forEach((taskName) => {
      const completedDays = days.filter((day) => day.tasks?.[taskName] === true).length
      const totalDays = days.filter((day) => day.tasks !== null).length
      const percentage = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0

      breakdown[taskName] = {
        completed: completedDays,
        total: totalDays,
        percentage,
        trend: "stable", // TODO: Calculate trend based on previous week
      }
    })

    return breakdown as TaskBreakdown
  }

  // Process streak data
  private processStreakData(userProgress: any): StreakData {
    const current = userProgress?.currentStreak || 0
    const best = userProgress?.longestStreak || 0
    const isNewRecord = current > 0 && current === best

    // Calculate next milestone
    const milestones = [7, 14, 30, 60, 100, 365]
    const nextMilestone = milestones.find((milestone) => milestone > current) || current + 100
    const daysUntilNextMilestone = nextMilestone - current

    return {
      current,
      best,
      isNewRecord,
      daysUntilNextMilestone,
      nextMilestone,
    }
  }

  // Calculate trend compared to previous period
  private calculateTrend(weekTasks: TaskData[]): { direction: "up" | "down" | "stable"; percentage: number } {
    // Simplified trend calculation
    // In a real app, you'd compare with previous week's data
    const averageScore = weekTasks.reduce((sum, task) => sum + task.score, 0) / Math.max(weekTasks.length, 1)

    if (averageScore >= 75) return { direction: "up", percentage: 5 }
    if (averageScore <= 50) return { direction: "down", percentage: 3 }
    return { direction: "stable", percentage: 0 }
  }

  // Get motivational insight based on data
  getMotivationalInsight(analytics: AnalyticsData): string {
    const { weeklyStats, streakData, taskBreakdown } = analytics

    if (weeklyStats.perfectDays >= 5) {
      return "🔥 INCREDIBLE week! You're building unstoppable momentum!"
    }

    if (weeklyStats.perfectDays >= 3) {
      return "💪 Strong consistency! You're developing champion habits!"
    }

    if (streakData.current >= 7) {
      return `🎯 ${streakData.current}-day streak! You're proving what's possible!`
    }

    if (weeklyStats.completionPercentage >= 70) {
      return "📈 Solid progress! Small steps lead to big transformations!"
    }

    // Find best performing task
    const bestTask = Object.entries(taskBreakdown).sort(([, a], [, b]) => b.percentage - a.percentage)[0]

    if (bestTask && bestTask[1].percentage >= 80) {
      const taskNames = {
        drinkWater: "hydration",
        noSocialMedia: "focus",
        sunlightExposure: "energy",
        elephantTask: "productivity",
      }
      return `✨ Your ${taskNames[bestTask[0] as keyof typeof taskNames]} game is strong! Keep building on this foundation!`
    }

    return "🌱 Every expert was once a beginner. You're planting seeds for greatness!"
  }

  // Get week start date (Monday)
  getWeekStart(date: Date): Date {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1)
    return new Date(d.setDate(diff))
  }

  // Format week range for display
  formatWeekRange(weekStart: Date): string {
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 6)

    const startMonth = weekStart.toLocaleDateString("en", { month: "short" })
    const endMonth = weekEnd.toLocaleDateString("en", { month: "short" })
    const startDay = weekStart.getDate()
    const endDay = weekEnd.getDate()

    if (startMonth === endMonth) {
      return `${startMonth} ${startDay}-${endDay}`
    } else {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}`
    }
  }
}

export const analyticsService = new AnalyticsService()
