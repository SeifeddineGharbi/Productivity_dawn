import type React from "react"
import { View, Text } from "../../utils/react-native-web"

interface EmptyStateProps {
  userName: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({ userName }) => {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <Text className="text-6xl mb-4">📊</Text>
      <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">No Data Yet</Text>
      <Text className="text-gray-600 text-center leading-relaxed">
        Hi {userName}! Complete your first morning routine to see your analytics here.
      </Text>
    </View>
  )
}
