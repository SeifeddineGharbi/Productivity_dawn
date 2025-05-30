import type React from "react"
import { View, Text } from "../../utils/react-native-web"

interface WeeklyStats {
  completedDays: number
  totalDays: number
  averageScore: number
  totalTasks: number
  completedTasks: number
}

interface WeeklyOverviewProps {
  stats: WeeklyStats
  motivationalInsight: string
}

export const WeeklyOverview: React.FC<WeeklyOverviewProps> = ({ stats, motivationalInsight }) => {
  return (
    <View className="mx-4 mt-4 mb-6">
      <View className="bg-white rounded-2xl p-6 shadow-sm">
        <Text className="text-xl font-bold text-gray-900 mb-4">Weekly Overview</Text>

        <View className="flex-row justify-between mb-4">
          <View className="items-center">
            <Text className="text-2xl font-bold text-blue-600">{stats.completedDays}</Text>
            <Text className="text-sm text-gray-600">Days</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-green-600">{stats.averageScore}%</Text>
            <Text className="text-sm text-gray-600">Avg Score</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-purple-600">{stats.completedTasks}</Text>
            <Text className="text-sm text-gray-600">Tasks Done</Text>
          </View>
        </View>

        <View className="bg-blue-50 rounded-xl p-4">
          <Text className="text-blue-800 text-sm leading-relaxed">{motivationalInsight}</Text>
        </View>
      </View>
    </View>
  )
}
