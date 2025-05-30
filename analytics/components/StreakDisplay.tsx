import type React from "react"
import { View, Text } from "../../utils/react-native-web"

interface StreakData {
  currentStreak: number
  longestStreak: number
  streakStartDate?: string
}

interface StreakDisplayProps {
  streakData: StreakData
}

export const StreakDisplay: React.FC<StreakDisplayProps> = ({ streakData }) => {
  return (
    <View className="mx-4 my-4 p-6 bg-white rounded-xl shadow-sm">
      <Text className="text-xl font-bold text-gray-900 mb-4">Streak Stats</Text>

      <View className="flex-row justify-around">
        <View className="items-center">
          <Text className="text-3xl font-bold text-orange-600">{streakData.currentStreak}</Text>
          <Text className="text-sm text-gray-600">Current Streak</Text>
          <Text className="text-xs text-gray-500">🔥</Text>
        </View>

        <View className="items-center">
          <Text className="text-3xl font-bold text-purple-600">{streakData.longestStreak}</Text>
          <Text className="text-sm text-gray-600">Best Streak</Text>
          <Text className="text-xs text-gray-500">🏆</Text>
        </View>
      </View>

      {streakData.streakStartDate && (
        <View className="mt-4 p-3 bg-orange-50 rounded-lg">
          <Text className="text-orange-800 text-sm text-center">
            Streak started: {new Date(streakData.streakStartDate).toLocaleDateString()}
          </Text>
        </View>
      )}
    </View>
  )
}
