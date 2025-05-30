"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { ScrollView, SafeAreaView, ActivityIndicator, Alert } from "react-native"
import type { AnalyticsScreenProps, AnalyticsData, DayAnalytics } from "./types"
import { analyticsService } from "./analytics-service"
import { WeekSelector } from "./components/WeekSelector"
import { WeeklyOverview } from "./components/WeeklyOverview"
import { TaskBreakdown } from "./components/TaskBreakdown"
import { StreakDisplay } from "./components/StreakDisplay"
import { ProgressGrid } from "./components/ProgressGrid"
import { DayDetailModal } from "./components/DayDetailModal"
import { EmptyState } from "./components/EmptyState"

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({ userId, userName }) => {
  const [currentWeek, setCurrentWeek] = useState<Date>(analyticsService.getWeekStart(new Date()))
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDay, setSelectedDay] = useState<DayAnalytics | null>(null)
  const [showDayDetail, setShowDayDetail] = useState(false)

  // Load analytics data for current week
  const loadAnalyticsData = useCallback(
    async (weekStart: Date) => {
      setIsLoading(true)
      try {
        const data = await analyticsService.getWeekAnalytics(userId, weekStart)
        setAnalyticsData(data)
      } catch (error) {
        console.error("Error loading analytics:", error)
        Alert.alert("Error", "Failed to load analytics data. Please try again.")
      } finally {
        setIsLoading(false)
      }
    },
    [userId],
  )

  // Initialize data
  useEffect(() => {
    loadAnalyticsData(currentWeek)
  }, [currentWeek, loadAnalyticsData])

  // Handle week change
  const handleWeekChange = (newWeek: Date) => {
    setCurrentWeek(newWeek)
  }

  // Handle day press
  const handleDayPress = (day: DayAnalytics) => {
    setSelectedDay(day)
    setShowDayDetail(true)
  }

  // Check if can go to next week (not future)
  const canGoNext = () => {
    const nextWeek = new Date(currentWeek)
    nextWeek.setDate(nextWeek.getDate() + 7)
    const today = analyticsService.getWeekStart(new Date())
    return nextWeek <= today
  }

  // Check if user has any data
  const hasData = analyticsData?.weeklyStats.completedDays > 0

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#007AFF" />
        <Text className="mt-4 text-gray-600">Loading your analytics...</Text>
      </SafeAreaView>
    )
  }

  if (!hasData) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <WeekSelector currentWeek={currentWeek} onWeekChange={handleWeekChange} canGoNext={canGoNext()} />
        <EmptyState userName={userName} />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Week Selector */}
      <WeekSelector currentWeek={currentWeek} onWeekChange={handleWeekChange} canGoNext={canGoNext()} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {analyticsData && (
          <>
            {/* Weekly Overview */}
            <WeeklyOverview
              stats={analyticsData.weeklyStats}
              motivationalInsight={analyticsService.getMotivationalInsight(analyticsData)}
            />

            {/* Progress Grid */}
            <ProgressGrid days={analyticsData.days} onDayPress={handleDayPress} />

            {/* Task Breakdown */}
            <TaskBreakdown breakdown={analyticsData.taskBreakdown} />

            {/* Streak Display */}
            <StreakDisplay streakData={analyticsData.streakData} />
          </>
        )}
      </ScrollView>

      {/* Day Detail Modal */}
      <DayDetailModal day={selectedDay} isVisible={showDayDetail} onClose={() => setShowDayDetail(false)} />
    </SafeAreaView>
  )
}
