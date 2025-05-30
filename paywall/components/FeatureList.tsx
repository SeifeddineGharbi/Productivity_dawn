import type React from "react"
import { View, Text } from "react-native"
import type { PaywallFeature } from "../types"

const EXACT_FEATURES: PaywallFeature[] = [
  { id: "1", text: "Complete habit tracking", icon: "✓" },
  { id: "2", text: "Detailed progress analytics", icon: "✓" },
  { id: "3", text: "Smart reminder notifications", icon: "✓" },
  { id: "4", text: "Personalized insights", icon: "✓" },
  { id: "5", text: "Weekly progress reports", icon: "✓" },
]

export const FeatureList: React.FC = () => {
  return (
    <View className="mb-8">
      <Text className="text-lg font-semibold text-gray-900 mb-4">What you'll get:</Text>

      {EXACT_FEATURES.map((feature) => (
        <View key={feature.id} className="flex-row items-center mb-3">
          <View className="w-6 h-6 bg-green-500 rounded-full items-center justify-center mr-3">
            <Text className="text-white font-bold text-sm">{feature.icon}</Text>
          </View>
          <Text className="text-base text-gray-700 flex-1">{feature.text}</Text>
        </View>
      ))}
    </View>
  )
}
