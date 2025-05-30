import type React from "react"
import { View, Text } from "react-native"
import type { StreakData } from "../types"

interface StreakDisplayProps {
  streakData: StreakData
}

export const StreakDisplay: React.FC<StreakDisplayProps> = ({ streakData }) => {
  return (
    <View className="bg-white rounded-2xl p-6 mx-4 mb-4 shadow-md">
      <Text className="text-xl font-semibold mb-4 text-gray-900">Streak Progress</Text>

      <View className="flex-row justify-between mb-6">
        <View className="items-center flex-1">
          <View className="flex-row items-center mb-2">
            <Text className="text-3xl font-bold text-orange-600">{streakData.current}</Text>
            <Text className="text-2xl ml-2">🔥</Text>
          </View>
          <Text className="text-sm text-gray-600 text-center">Current Streak</Text>
          {streakData.isNewRecord && <Text className="text-xs text-orange-600 font-medium mt-1">New Record! 🎉</Text>}
        </View>

        <View className="items-center flex-1">
          <View className="flex-row items-center mb-2">
            <Text className="text-3xl font-bold text-yellow-600">{streakData.best}</Text>
            <Text className="text-2xl ml-2">🏆</Text>
          </View>
          <Text className="text-sm text-gray-600 text-center">Best Ever</Text>
        </View>
      </View>

      {/* Next Milestone */}
      {streakData.daysUntilNextMilestone > 0 && (
        <View className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4">
          <Text className="text-sm font-medium text-gray-800 mb-1">Next Milestone</Text>
          <Text className="text-lg font-bold text-orange-700">
            {streakData.daysUntilNextMilestone} days to {streakData.nextMilestone}-day streak!
          </Text>

          {/* Progress to next milestone */}
          <View className="mt-3">
            <View className="h-2 bg-orange-200 rounded-full overflow-hidden">
              <View
                className="h-full bg-orange-500 rounded-full"
                style={{
                  width: `${(streakData.current / streakData.nextMilestone) * 100}%`,
                }}
              />
            </View>
            <Text className="text-xs text-orange-600 mt-1">
              {streakData.current}/{streakData.nextMilestone} days
            </Text>
          </View>
        </View>
      )}
    </View>
  )
}
