import type React from "react"
import { View, Text } from "react-native"
import type { TaskBreakdown as TaskBreakdownType } from "../types"

interface TaskBreakdownProps {
  breakdown: TaskBreakdownType
}

export const TaskBreakdown: React.FC<TaskBreakdownProps> = ({ breakdown }) => {
  const taskDetails = [
    { key: "drinkWater", name: "Drink Water", emoji: "💧", color: "bg-blue-500" },
    { key: "noSocialMedia", name: "No Social Media", emoji: "📱", color: "bg-red-500" },
    { key: "sunlightExposure", name: "Sunlight Exposure", emoji: "☀️", color: "bg-yellow-400" },
    { key: "elephantTask", name: "Elephant Task", emoji: "🐘", color: "bg-green-500" },
  ]

  return (
    <View className="bg-white rounded-2xl p-6 mx-4 mb-4 shadow-md">
      <Text className="text-xl font-semibold mb-4 text-gray-900">Task Breakdown</Text>

      <View className="space-y-4">
        {taskDetails.map((task) => {
          const stats = breakdown[task.key as keyof TaskBreakdownType]
          return (
            <View key={task.key} className="space-y-2">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Text className="text-xl mr-3">{task.emoji}</Text>
                  <Text className="text-base font-medium text-gray-900">{task.name}</Text>
                </View>
                <Text className="text-lg font-semibold text-gray-900">{stats.percentage}%</Text>
              </View>

              <View className="flex-row items-center">
                <View className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden mr-3">
                  <View className={`h-full ${task.color} rounded-full`} style={{ width: `${stats.percentage}%` }} />
                </View>
                <Text className="text-sm text-gray-600 w-16 text-right">
                  {stats.completed}/{stats.total}
                </Text>
              </View>
            </View>
          )
        })}
      </View>
    </View>
  )
}
