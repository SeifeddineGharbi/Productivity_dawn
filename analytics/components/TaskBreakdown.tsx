import type React from "react"
import { View, Text } from "../../utils/react-native-web"

interface TaskBreakdownProps {
  breakdown: {
    drinkWater: number
    noSocialMedia: number
    sunlightExposure: number
    elephantTask: number
  }
}

export const TaskBreakdown: React.FC<TaskBreakdownProps> = ({ breakdown }) => {
  const tasks = [
    { key: "drinkWater", name: "Drink Water", emoji: "💧", color: "bg-blue-500" },
    { key: "noSocialMedia", name: "No Social Media", emoji: "📱", color: "bg-red-500" },
    { key: "sunlightExposure", name: "Sunlight", emoji: "☀️", color: "bg-yellow-500" },
    { key: "elephantTask", name: "Elephant Task", emoji: "🐘", color: "bg-green-500" },
  ]

  return (
    <View className="mx-4 mb-6">
      <View className="bg-white rounded-2xl p-6 shadow-sm">
        <Text className="text-lg font-semibold text-gray-900 mb-4">Task Breakdown</Text>

        <View className="space-y-3">
          {tasks.map((task) => (
            <View key={task.key} className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <Text className="text-xl mr-3">{task.emoji}</Text>
                <Text className="text-gray-900 font-medium">{task.name}</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-gray-600 mr-2">{breakdown[task.key as keyof typeof breakdown]}/7</Text>
                <View className="w-16 h-2 bg-gray-200 rounded-full">
                  <View
                    className={`h-2 rounded-full ${task.color}`}
                    style={{ width: `${(breakdown[task.key as keyof typeof breakdown] / 7) * 100}%` }}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}
