import type React from "react"
import { View, Text } from "react-native"

export const PremiumBadge: React.FC = () => {
  return (
    <View className="items-center mb-8">
      <View className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full items-center justify-center mb-4 shadow-lg">
        <Text className="text-4xl">👑</Text>
      </View>

      <View className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-full mb-4">
        <Text className="text-white font-bold text-lg">PREMIUM</Text>
      </View>

      <Text className="text-2xl font-bold text-center text-gray-900 mb-2">Unlock Your Full</Text>
      <Text className="text-2xl font-bold text-center text-gray-900">Morning Potential</Text>
    </View>
  )
}
