import type React from "react"
import { View, Text, TouchableOpacity } from "../../utils/react-native-web"

interface SubscriptionInfo {
  isActive: boolean
  plan: string
  expiryDate?: string
  features: string[]
}

interface SubscriptionCardProps {
  subscription: SubscriptionInfo
  onManage: () => void
  onUpgrade: () => void
  onRestore: () => void
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription, onManage, onUpgrade, onRestore }) => {
  return (
    <View className="mx-4 my-4 p-6 bg-white rounded-xl shadow-sm">
      <Text className="text-xl font-bold text-gray-900 mb-4">Subscription</Text>

      <View className="mb-4">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-base text-gray-900">Current Plan</Text>
          <View className={`px-2 py-1 rounded-full ${subscription.isActive ? "bg-green-100" : "bg-gray-100"}`}>
            <Text className={`text-xs font-medium ${subscription.isActive ? "text-green-800" : "text-gray-600"}`}>
              {subscription.isActive ? "Active" : "Inactive"}
            </Text>
          </View>
        </View>
        <Text className="text-lg font-semibold text-gray-900">{subscription.plan}</Text>
        {subscription.expiryDate && (
          <Text className="text-sm text-gray-600">
            Expires: {new Date(subscription.expiryDate).toLocaleDateString()}
          </Text>
        )}
      </View>

      <View className="space-y-2 mb-4">
        {subscription.features.map((feature, index) => (
          <View key={index} className="flex-row items-center">
            <Text className="text-green-600 mr-2">✓</Text>
            <Text className="text-sm text-gray-700">{feature}</Text>
          </View>
        ))}
      </View>

      <View className="space-y-2">
        {subscription.isActive ? (
          <TouchableOpacity onPress={onManage} className="py-3 px-4 bg-blue-500 rounded-lg">
            <Text className="text-white font-medium text-center">Manage Subscription</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onUpgrade} className="py-3 px-4 bg-blue-500 rounded-lg">
            <Text className="text-white font-medium text-center">Upgrade to Premium</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={onRestore} className="py-2">
          <Text className="text-blue-600 text-center">Restore Purchases</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
