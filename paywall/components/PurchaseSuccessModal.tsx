"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { View, Text, TouchableOpacity, Modal, Animated, Easing } from "react-native"
import type { SubscriptionDetails } from "../types"

interface PurchaseSuccessModalProps {
  isVisible: boolean
  subscription: SubscriptionDetails | null
  onContinue: () => void
}

export const PurchaseSuccessModal: React.FC<PurchaseSuccessModalProps> = ({ isVisible, subscription, onContinue }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current
  const opacityAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (isVisible) {
      // Animate in
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      // Reset animations
      scaleAnim.setValue(0)
      opacityAnim.setValue(0)
    }
  }, [isVisible])

  if (!subscription) return null

  const formatExpirationDate = (date: Date): string => {
    return date.toLocaleDateString("en", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Modal visible={isVisible} transparent animationType="none" onRequestClose={onContinue}>
      <View className="flex-1 bg-black bg-opacity-50 items-center justify-center px-6">
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          }}
          className="bg-white rounded-2xl p-8 w-full max-w-sm items-center"
        >
          {/* Success Icon */}
          <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-6">
            <Text className="text-4xl">🎉</Text>
          </View>

          {/* Success Message */}
          <Text className="text-2xl font-bold text-gray-900 text-center mb-2">Welcome to Premium!</Text>

          {subscription.isTrialPeriod ? (
            <Text className="text-base text-gray-600 text-center mb-6">
              Your 7-day free trial has started! You'll be charged{" "}
              {subscription.plan === "annual" ? "$24.99/year" : "$3.99/week"} when your trial ends on{" "}
              {formatExpirationDate(subscription.expirationDate)}.
            </Text>
          ) : (
            <Text className="text-base text-gray-600 text-center mb-6">
              You now have access to all premium features! Your subscription will renew on{" "}
              {formatExpirationDate(subscription.expirationDate)}.
            </Text>
          )}

          {/* Premium Features Preview */}
          <View className="bg-blue-50 rounded-xl p-4 mb-6 w-full">
            <Text className="text-sm font-medium text-blue-800 text-center mb-2">🚀 Now Available:</Text>
            <Text className="text-sm text-blue-700 text-center">
              Detailed analytics • Smart reminders • Weekly reports • Personalized insights
            </Text>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            className="bg-blue-500 rounded-xl py-4 px-8 w-full active:bg-blue-600"
            onPress={onContinue}
            activeOpacity={0.8}
          >
            <Text className="text-white font-bold text-center">Start Your Journey</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  )
}
