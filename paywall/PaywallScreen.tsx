"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert } from "react-native"
import type { PaywallProps, PurchaseState, PricingPlan, SubscriptionDetails } from "./types"
import { revenueCatService } from "./revenuecat-service"
import { paywallAnalytics } from "./analytics-service"
import { PremiumBadge } from "./components/PremiumBadge"
import { FeatureList } from "./components/FeatureList"
import { PricingCard } from "./components/PricingCard"
import { LegalLinks } from "./components/LegalLinks"
import { PurchaseSuccessModal } from "./components/PurchaseSuccessModal"

export const PaywallScreen: React.FC<PaywallProps> = ({ onPurchaseSuccess, onClose, source = "unknown" }) => {
  const [purchaseState, setPurchaseState] = useState<PurchaseState>({
    isLoading: false,
    error: null,
    isRestoring: false,
    purchasingPackage: null,
  })

  const [offerings, setOfferings] = useState<any>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successSubscription, setSuccessSubscription] = useState<SubscriptionDetails | null>(null)

  // Initialize RevenueCat and load offerings
  useEffect(() => {
    initializePaywall()

    // Track paywall view
    paywallAnalytics.trackPaywallView(source)

    return () => {
      // Track paywall close if component unmounts
      paywallAnalytics.trackPaywallClose(source)
    }
  }, [source])

  const initializePaywall = async () => {
    try {
      // Configure RevenueCat (API key should come from environment)
      const configured = await revenueCatService.configure("your_revenuecat_api_key")

      if (configured) {
        // Load offerings
        const currentOfferings = await revenueCatService.getOfferings()
        setOfferings(currentOfferings)
      } else {
        setPurchaseState((prev) => ({
          ...prev,
          error: "Failed to initialize payment system",
        }))
      }
    } catch (error) {
      console.error("Error initializing paywall:", error)
      setPurchaseState((prev) => ({
        ...prev,
        error: "Failed to load subscription options",
      }))
    }
  }

  // Define pricing plans based on exact specifications
  const pricingPlans: PricingPlan[] = [
    {
      id: "annual",
      title: "Annual Plan",
      price: "$24.99/year",
      period: "Just $2.08/month",
      savings: "Save 52% vs weekly",
      isPopular: true,
      packageIdentifier: "annual",
      ctaText: "Choose Annual",
    },
    {
      id: "weekly",
      title: "Weekly Plan",
      price: "$3.99/week",
      period: "",
      trial: "7-day free trial",
      isPopular: false,
      packageIdentifier: "weekly",
      ctaText: "Start Free Trial",
    },
  ]

  // Handle purchase
  const handlePurchase = useCallback(
    async (planId: string) => {
      if (!offerings) {
        Alert.alert("Error", "Subscription options not available. Please try again.")
        return
      }

      const plan = pricingPlans.find((p) => p.id === planId)
      if (!plan) return

      // Find the package
      const packageToPurchase = offerings.availablePackages.find(
        (pkg: any) => pkg.identifier === plan.packageIdentifier,
      )

      if (!packageToPurchase) {
        Alert.alert("Error", "Selected plan not available. Please try another option.")
        return
      }

      setPurchaseState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
        purchasingPackage: planId,
      }))

      // Track purchase attempt
      paywallAnalytics.trackPurchaseAttempt(packageToPurchase.identifier, planId)

      try {
        const result = await revenueCatService.purchasePackage(packageToPurchase)

        if (result.success && result.customerInfo) {
          // Convert to subscription details
          const subscriptionDetails = revenueCatService.convertToSubscriptionDetails(result.customerInfo)

          if (subscriptionDetails) {
            // Track success
            paywallAnalytics.trackPurchaseSuccess(
              packageToPurchase.identifier,
              planId,
              subscriptionDetails.isTrialPeriod,
            )

            // Show success modal
            setSuccessSubscription(subscriptionDetails)
            setShowSuccessModal(true)
          } else {
            throw new Error("Failed to process subscription details")
          }
        } else {
          throw new Error(result.error || "Purchase failed")
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Purchase failed"

        // Track failure
        paywallAnalytics.trackPurchaseFailure(packageToPurchase.identifier, planId, errorMessage)

        setPurchaseState((prev) => ({
          ...prev,
          error: errorMessage,
        }))

        Alert.alert("Purchase Failed", errorMessage, [
          { text: "Cancel", style: "cancel" },
          { text: "Try Again", onPress: () => handlePurchase(planId) },
        ])
      } finally {
        setPurchaseState((prev) => ({
          ...prev,
          isLoading: false,
          purchasingPackage: null,
        }))
      }
    },
    [offerings, pricingPlans],
  )

  // Handle restore purchases
  const handleRestorePurchases = useCallback(async () => {
    setPurchaseState((prev) => ({
      ...prev,
      isRestoring: true,
      error: null,
    }))

    // Track restore attempt
    paywallAnalytics.trackRestoreAttempt()

    try {
      const result = await revenueCatService.restorePurchases()

      if (result.success && result.customerInfo) {
        const subscriptionDetails = revenueCatService.convertToSubscriptionDetails(result.customerInfo)

        if (subscriptionDetails) {
          // Track success
          paywallAnalytics.trackRestoreSuccess()

          Alert.alert("Purchases Restored", "Your subscription has been restored successfully!", [
            {
              text: "Continue",
              onPress: () => onPurchaseSuccess(subscriptionDetails),
            },
          ])
        } else {
          throw new Error("No active subscription found")
        }
      } else {
        throw new Error(result.error || "No purchases to restore")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Restore failed"

      // Track failure
      paywallAnalytics.trackRestoreFailure(errorMessage)

      Alert.alert("Restore Failed", errorMessage, [{ text: "OK" }])
    } finally {
      setPurchaseState((prev) => ({
        ...prev,
        isRestoring: false,
      }))
    }
  }, [onPurchaseSuccess])

  // Handle success modal continue
  const handleSuccessModalContinue = () => {
    setShowSuccessModal(false)
    if (successSubscription) {
      onPurchaseSuccess(successSubscription)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Close Button */}
      {onClose && (
        <View className="flex-row justify-end px-6 pt-4">
          <TouchableOpacity
            className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center active:bg-gray-300"
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text className="text-gray-600 font-bold">✕</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView className="flex-1 px-6 py-8" showsVerticalScrollIndicator={false}>
        {/* Premium Badge */}
        <PremiumBadge />

        {/* Feature List */}
        <FeatureList />

        {/* Pricing Plans */}
        {pricingPlans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            onPress={() => handlePurchase(plan.id)}
            isLoading={purchaseState.purchasingPackage === plan.id}
            disabled={purchaseState.isLoading || purchaseState.isRestoring}
          />
        ))}

        {/* Legal Links */}
        <LegalLinks onRestorePurchases={handleRestorePurchases} isRestoring={purchaseState.isRestoring} />
      </ScrollView>

      {/* Purchase Success Modal */}
      <PurchaseSuccessModal
        isVisible={showSuccessModal}
        subscription={successSubscription}
        onContinue={handleSuccessModalContinue}
      />
    </SafeAreaView>
  )
}
