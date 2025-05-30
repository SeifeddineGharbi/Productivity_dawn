import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import type { SubscriptionCardProps } from "../types"
import { settingsService } from "../settings-service"

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription, onManage, onUpgrade, onRestore }) => {
  const planName = settingsService.formatPlanName(subscription.plan)
  const nextBillingDate = settingsService.formatNextBillingDate(subscription)
  const isPremium = subscription.plan !== "free"
  const isLifetime = subscription.plan === "lifetime"
  const isAnnual = subscription.plan === "annual"

  return (
    <View className="bg-white rounded-2xl p-6 mx-4 mb-4 shadow-md">
      <Text className="text-xl font-semibold text-gray-900 mb-4">Subscription</Text>

      {/* Current Plan */}
      <View className="mb-6">
        <View className="flex-row items-center mb-2">
          <View
            className={`px-3 py-1 rounded-full ${
              isPremium ? "bg-yellow-100 border border-yellow-200" : "bg-gray-100 border border-gray-200"
            } mr-2`}
          >
            <Text className={`text-sm font-medium ${isPremium ? "text-yellow-800" : "text-gray-800"}`}>
              {isPremium ? `${planName} 👑` : "Free Plan"}
            </Text>
          </View>

          {subscription.status === "trial" && (
            <View className="px-3 py-1 rounded-full bg-blue-100 border border-blue-200">
              <Text className="text-sm font-medium text-blue-800">Trial</Text>
            </View>
          )}
        </View>

        {!isLifetime && subscription.expiresAt && (
          <Text className="text-sm text-gray-600">
            {subscription.renewsAutomatically
              ? `Renews automatically on ${nextBillingDate}`
              : `Expires on ${nextBillingDate}`}
          </Text>
        )}

        {isLifetime && <Text className="text-sm text-gray-600">Lifetime access</Text>}
      </View>

      {/* Upgrade Promotion */}
      {isPremium && !isAnnual && !isLifetime && (
        <View className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
          <Text className="text-base font-medium text-gray-900 mb-1">Save 50% with Annual Plan</Text>
          <Text className="text-sm text-gray-700 mb-3">
            Upgrade to our annual plan and get 12 months for the price of 6!
          </Text>
          <TouchableOpacity
            className="bg-blue-500 py-3 rounded-lg active:bg-blue-600"
            onPress={onUpgrade}
            activeOpacity={0.8}
          >
            <Text className="text-white font-medium text-center">Upgrade Now</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Free Plan Upgrade */}
      {!isPremium && (
        <View className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
          <Text className="text-base font-medium text-gray-900 mb-1">Unlock Premium Features</Text>
          <Text className="text-sm text-gray-700 mb-3">
            Get detailed analytics, custom reminders, and more with Premium!
          </Text>
          <TouchableOpacity
            className="bg-blue-500 py-3 rounded-lg active:bg-blue-600"
            onPress={onUpgrade}
            activeOpacity={0.8}
          >
            <Text className="text-white font-medium text-center">Upgrade Now</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Subscription Actions */}
      <View className="flex-row justify-between">
        <TouchableOpacity
          className="py-2 px-4 rounded-lg bg-gray-100 active:bg-gray-200 flex-1 mr-2"
          onPress={onManage}
          activeOpacity={0.7}
        >
          <Text className="text-gray-800 font-medium text-center">Manage Subscription</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="py-2 px-4 rounded-lg bg-gray-100 active:bg-gray-200 flex-1 ml-2"
          onPress={onRestore}
          activeOpacity={0.7}
        >
          <Text className="text-gray-800 font-medium text-center">Restore Purchases</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
