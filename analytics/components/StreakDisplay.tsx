import type React from "react"
import { View, Text } from "../../utils/react-native-web"

interface StreakDisplayProps {
  streakData: {
    current: number
    longest: number
    thisWeek: number
  }
}

export const StreakDisplay: React.FC<StreakDisplayProps> = ({ streakData }) => {
  return (
    <View className="mx-4 mb-6">
      <View className="bg-white rounded-2xl p-6 shadow-sm">
        <Text className="text-lg font-semibold text-gray-900 mb-4">Streak Stats</Text>

        <View className="flex-row justify-between">
          <View className="items-center">
            <Text className="text-2xl font-bold text-orange-600">{streakData.current}</Text>
            <Text className="text-sm text-gray-600">Current</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-red-600">{streakData.longest}</Text>
            <Text className="text-sm text-gray-600">Best Ever</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-blue-600">{streakData.thisWeek}</Text>
            <Text className="text-sm text-gray-600">This Week</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
