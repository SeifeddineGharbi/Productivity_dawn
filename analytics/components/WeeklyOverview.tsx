import type React from "react"
import { View, Text } from "react-native"
import type { WeeklyStats } from "../types"

interface WeeklyOverviewProps {
  stats: WeeklyStats
  motivationalInsight: string
}

export const WeeklyOverview: React.FC<WeeklyOverviewProps> = ({ stats, motivationalInsight }) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return "📈"
      case "down":
        return "📉"
      default:
        return "➡️"
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <View className="bg-white rounded-2xl p-6 mx-4 mb-4 shadow-md">
      <Text className="text-xl font-semibold mb-4 text-gray-900">Weekly Overview</Text>

      {/* Main Stats */}
      <View className="flex-row justify-between mb-6">
        <View className="items-center flex-1">
          <Text className="text-3xl font-bold text-blue-600">{stats.completionPercentage}%</Text>
          <Text className="text-sm text-gray-600 text-center">Week Complete</Text>
          {stats.trendPercentage > 0 && (
            <View className="flex-row items-center mt-1">
              <Text className={`text-xs ${getTrendColor(stats.trend)}`}>
                {getTrendIcon(stats.trend)} {stats.trendPercentage}%
              </Text>
            </View>
          )}
        </View>

        <View className="items-center flex-1">
          <Text className="text-3xl font-bold text-green-600">{stats.perfectDays}</Text>
          <Text className="text-sm text-gray-600 text-center">Perfect Days</Text>
          <Text className="text-xs text-gray-500 mt-1">All 4 tasks</Text>
        </View>

        <View className="items-center flex-1">
          <Text className="text-3xl font-bold text-purple-600">{stats.averageScore}</Text>
          <Text className="text-sm text-gray-600 text-center">Avg Score</Text>
          <Text className="text-xs text-gray-500 mt-1">This week</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View className="mb-4">
        <View className="flex-row justify-between mb-2">
          <Text className="text-sm font-medium text-gray-700">Daily Completion</Text>
          <Text className="text-sm text-gray-600">
            {stats.completedDays}/{stats.totalDays} days
          </Text>
        </View>
        <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <View className="h-full bg-blue-500 rounded-full" style={{ width: `${stats.completionPercentage}%` }} />
        </View>
      </View>

      {/* Motivational Insight */}
      <View className="bg-blue-50 rounded-xl p-4">
        <Text className="text-sm text-blue-800 leading-relaxed">{motivationalInsight}</Text>
      </View>
    </View>
  )
}
