"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { PaywallScreen } from "./PaywallScreen"
import type { SubscriptionDetails } from "./types"

export const PaywallScreenExample: React.FC = () => {
  const [showPaywall, setShowPaywall] = useState(false)
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null)

  const handlePurchaseSuccess = (subscriptionDetails: SubscriptionDetails) => {
    setSubscription(subscriptionDetails)
    setShowPaywall(false)
    console.log("Purchase successful:", subscriptionDetails)
  }

  const handleClosePaywall = () => {
    setShowPaywall(false)
  }

  if (showPaywall) {
    return <PaywallScreen onPurchaseSuccess={handlePurchaseSuccess} onClose={handleClosePaywall} source="example" />
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-50 p-6">
      <Text className="text-2xl font-bold text-gray-900 mb-4 text-center">Productivity Dawn Paywall</Text>

      {subscription ? (
        <View className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6 w-full">
          <Text className="text-green-800 font-semibold text-center mb-2">✅ Premium Active</Text>
          <Text className="text-green-700 text-center">Plan: {subscription.plan}</Text>
          <Text className="text-green-700 text-center">Trial: {subscription.isTrialPeriod ? "Yes" : "No"}</Text>
          <Text className="text-green-700 text-center">
            Expires: {subscription.expirationDate.toLocaleDateString()}
          </Text>
        </View>
      ) : (
        <Text className="text-gray-600 text-center mb-6">
          Experience the premium paywall with RevenueCat integration
        </Text>
      )}

      <TouchableOpacity
        className="bg-blue-500 rounded-xl py-4 px-8 active:bg-blue-600"
        onPress={() => setShowPaywall(true)}
        activeOpacity={0.8}
      >
        <Text className="text-white font-bold text-center">{subscription ? "View Paywall Again" : "Show Paywall"}</Text>
      </TouchableOpacity>

      {subscription && (
        <TouchableOpacity
          className="mt-4 py-2 px-4 active:opacity-70"
          onPress={() => setSubscription(null)}
          activeOpacity={0.7}
        >
          <Text className="text-gray-500 text-center">Reset Subscription</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
