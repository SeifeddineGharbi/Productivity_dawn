import type React from "react"
import { View, Text } from "react-native"

interface EmptyStateProps {
  userName: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({ userName }) => {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <View className="bg-white rounded-2xl p-8 shadow-md items-center">
        <Text className="text-6xl mb-4">📈</Text>
        <Text className="text-2xl font-bold text-gray-900 mb-2">Welcome, {userName}!</Text>
        <Text className="text-gray-600 text-center mb-4 leading-relaxed">
          Your analytics will appear here once you start completing your morning tasks.
        </Text>
        <Text className="text-sm text-gray-500 text-center">
          Complete your first day to see your progress visualization!
        </Text>
      </View>
    </View>
  )
}
