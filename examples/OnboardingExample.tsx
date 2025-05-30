"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { OnboardingFlow } from "../onboarding/OnboardingFlow"

export const OnboardingExample: React.FC = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false)

  // Mock Firebase user ID
  const mockFirebaseUserId = "user123"

  // Mock RevenueCat API key
  const mockRevenueCatApiKey = "your_revenuecat_api_key"

  if (isOnboardingComplete) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 p-6">
        <Text className="text-3xl font-bold text-center text-gray-900 mb-4">Welcome to Productivity Dawn!</Text>
        <Text className="text-base text-center text-gray-600 mb-8">
          Your personalized morning routine is ready. Let's start your journey to more productive mornings!
        </Text>
        <TouchableOpacity
          className="bg-blue-500 rounded-xl py-4 px-8 active:bg-blue-600"
          onPress={() => setIsOnboardingComplete(false)}
          activeOpacity={0.8}
        >
          <Text className="text-white font-semibold text-center text-base">Restart Onboarding</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <OnboardingFlow
      firebaseUserId={mockFirebaseUserId}
      revenueCatApiKey={mockRevenueCatApiKey}
      onComplete={() => setIsOnboardingComplete(true)}
      onSkip={() => console.log("Onboarding skipped")}
    />
  )
}
