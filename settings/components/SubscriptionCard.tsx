import type React from "react"
import { View, Text, TouchableOpacity } from "../../utils/react-native-web"

interface SubscriptionInfo {
  isActive: boolean
  plan: string
  expiryDate?: string
}

interface SubscriptionCardProps {
  subscription: SubscriptionInfo
  onManage: () => void
  onUpgrade: () => void
  onRestore: () => void
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription, onManage, onUpgrade, onRestore }) => {
  return (
    <View className="mx-4 mb-6">
      <View className="bg-white rounded-2xl p-6 shadow-sm">
        <Text className="text-lg font-semibold text-gray-900 mb-4">Subscription</Text>

        <View className="mb-4">
          <Text className="text-base text-gray-900 font-medium">{subscription.plan}</Text>
          {subscription.isActive && subscription.expiryDate && (
            <Text className="text-sm text-gray-600">Expires: {subscription.expiryDate}</Text>
          )}
        </View>

        <View className="space-y-2">
          {subscription.isActive ? (
            <TouchableOpacity onPress={onManage} className="bg-blue-500 rounded-xl py-3">
              <Text className="text-white font-semibold text-center">Manage Subscription</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onUpgrade} className="bg-blue-500 rounded-xl py-3">
              <Text className="text-white font-semibold text-center">Upgrade to Premium</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={onRestore} className="border border-gray-300 rounded-xl py-3">
            <Text className="text-gray-900 font-medium text-center">Restore Purchases</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
