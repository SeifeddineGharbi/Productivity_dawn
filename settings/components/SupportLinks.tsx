import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import type { SupportLinksProps } from "../types"

export const SupportLinks: React.FC<SupportLinksProps> = ({
  onRateApp,
  onContactSupport,
  onPrivacyPolicy,
  onTermsOfService,
}) => {
  return (
    <View className="bg-white rounded-2xl p-6 mx-4 mb-4 shadow-md">
      <Text className="text-xl font-semibold text-gray-900 mb-4">Support</Text>

      <View className="space-y-4">
        <TouchableOpacity
          className="flex-row items-center py-3 active:bg-gray-50 rounded-lg"
          onPress={onRateApp}
          activeOpacity={0.7}
        >
          <Text className="text-xl mr-4">⭐</Text>
          <View className="flex-1">
            <Text className="text-base font-medium text-gray-900">Rate the App</Text>
            <Text className="text-sm text-gray-600">Let us know how we're doing</Text>
          </View>
          <Text className="text-gray-400">→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center py-3 active:bg-gray-50 rounded-lg"
          onPress={onContactSupport}
          activeOpacity={0.7}
        >
          <Text className="text-xl mr-4">📧</Text>
          <View className="flex-1">
            <Text className="text-base font-medium text-gray-900">Contact Support</Text>
            <Text className="text-sm text-gray-600">Get help with any issues</Text>
          </View>
          <Text className="text-gray-400">→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center py-3 active:bg-gray-50 rounded-lg"
          onPress={onPrivacyPolicy}
          activeOpacity={0.7}
        >
          <Text className="text-xl mr-4">🔒</Text>
          <View className="flex-1">
            <Text className="text-base font-medium text-gray-900">Privacy Policy</Text>
            <Text className="text-sm text-gray-600">How we protect your data</Text>
          </View>
          <Text className="text-gray-400">→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center py-3 active:bg-gray-50 rounded-lg"
          onPress={onTermsOfService}
          activeOpacity={0.7}
        >
          <Text className="text-xl mr-4">📝</Text>
          <View className="flex-1">
            <Text className="text-base font-medium text-gray-900">Terms of Service</Text>
            <Text className="text-sm text-gray-600">App usage agreement</Text>
          </View>
          <Text className="text-gray-400">→</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
