import type React from "react"
import { View, Text } from "../../utils/react-native-web"

interface TaskBreakdownData {
  drinkWater: number
  noSocialMedia: number
  sunlightExposure: number
  elephantTask: number
}

interface TaskBreakdownProps {
  breakdown: TaskBreakdownData
}

export const TaskBreakdown: React.FC<TaskBreakdownProps> = ({ breakdown }) => {
  const tasks = [
    { key: "drinkWater", name: "Drink Water", emoji: "💧", count: breakdown.drinkWater, color: "bg-blue-500" },
    { key: "noSocialMedia", name: "No Social Media", emoji: "📱", count: breakdown.noSocialMedia, color: "bg-red-500" },
    {
      key: "sunlightExposure",
      name: "Sunlight",
      emoji: "☀️",
      count: breakdown.sunlightExposure,
      color: "bg-yellow-500",
    },
    { key: "elephantTask", name: "Elephant Task", emoji: "🐘", count: breakdown.elephantTask, color: "bg-green-500" },
  ]

  return (
    <View className="mx-4 my-4 p-6 bg-white rounded-xl shadow-sm">
      <Text className="text-xl font-bold text-gray-900 mb-4">Task Breakdown</Text>

      {tasks.map((task) => (
        <View key={task.key} className="flex-row items-center justify-between py-2">
          <View className="flex-row items-center">
            <Text className="text-xl mr-3">{task.emoji}</Text>
            <Text className="text-base text-gray-900">{task.name}</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-lg font-bold text-gray-900 mr-2">{task.count}</Text>
            <View className={`w-3 h-3 rounded-full ${task.color}`} />
          </View>
        </View>
      ))}
    </View>
  )
}
