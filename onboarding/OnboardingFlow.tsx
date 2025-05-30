"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { View, Text, ActivityIndicator } from "react-native"
import { OnboardingContainer } from "./components/OnboardingContainer"
import { firebaseService } from "./firebase-service"
import { initializeRevenueCat } from "./revenuecat-service"
import { Paywall } from "../design-system/revenuecat-components"

interface OnboardingFlowProps {
  firebaseUserId: string
  revenueCatApiKey: string
  onComplete: () => void
  onSkip?: () => void
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  firebaseUserId,
  revenueCatApiKey,
  onComplete,
  onSkip,
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [showPaywall, setShowPaywall] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize RevenueCat
  useEffect(() => {
    const initialize = async () => {
      try {
        initializeRevenueCat(revenueCatApiKey)
        setIsLoading(false)
      } catch (error) {
        console.error("Error initializing RevenueCat:", error)
        setError("Failed to initialize. Please try again.")
        setIsLoading(false)
      }
    }

    initialize()
  }, [revenueCatApiKey])

  // Handle onboarding completion
  const handleOnboardingComplete = () => {
    // Log analytics event
    firebaseService.logAnalyticsEvent("onboarding_completed", {
      user_id: firebaseUserId,
    })

    // Show paywall
    setShowPaywall(true)
  }

  // Handle paywall completion
  const handlePaywallComplete = () => {
    // Log analytics event
    firebaseService.logAnalyticsEvent("paywall_completed", {
      user_id: firebaseUserId,
    })

    // Complete onboarding flow
    onComplete()
  }

  // Show loading state
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#007AFF" />
        <Text className="mt-4 text-gray-600">Initializing...</Text>
      </View>
    )
  }

  // Show error state
  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 p-6">
        <Text className="text-red-500 text-xl font-bold mb-4">Error</Text>
        <Text className="text-gray-700 text-center mb-6">{error}</Text>
        <Text className="text-gray-500 text-center">
          Please restart the app and try again. If the problem persists, contact support.
        </Text>
      </View>
    )
  }

  // Show paywall if onboarding is completed
  if (showPaywall) {
    // Example subscription plans for RevenueCat
    const plans = [
      {
        id: "monthly",
        title: "Monthly",
        price: "$9.99/month",
        period: "month",
        featured: false,
      },
      {
        id: "annual",
        title: "Annual",
        price: "$59.99/year",
        period: "year",
        savings: "Save 50%",
        featured: true,
        trial: "7-day free trial",
      },
      {
        id: "lifetime",
        title: "Lifetime",
        price: "$149.99",
        period: "one-time",
        featured: false,
      },
    ]

    return (
      <Paywall
        plans={plans}
        onPurchase={async (planId) => {
          // In a real app, this would use RevenueCat's purchasePackage
          console.log("Purchase plan:", planId)
          handlePaywallComplete()
        }}
        onRestore={async () => {
          // In a real app, this would use RevenueCat's restorePurchases
          console.log("Restore purchases")
          return false
        }}
      />
    )
  }

  // Show onboarding flow
  return <OnboardingContainer userId={firebaseUserId} onComplete={handleOnboardingComplete} onSkip={onSkip} />
}
