"use client"

import React from "react"
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native"

interface EmailVerificationScreenProps {
  email: string
  onResendEmail: () => Promise<void>
  onChangeEmail: () => void
  onContinue: () => void
  resendLoading?: boolean
  resendCooldown?: number
  verificationSent?: boolean
}

export const EmailVerificationScreen: React.FC<EmailVerificationScreenProps> = ({
  email,
  onResendEmail,
  onChangeEmail,
  onContinue,
  resendLoading = false,
  resendCooldown = 0,
  verificationSent = false,
}) => {
  const [timeLeft, setTimeLeft] = React.useState(resendCooldown)

  React.useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  React.useEffect(() => {
    setTimeLeft(resendCooldown)
  }, [resendCooldown])

  const handleResend = async () => {
    if (timeLeft === 0 && !resendLoading) {
      await onResendEmail()
    }
  }

  const canResend = timeLeft === 0 && !resendLoading

  return (
    <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
      <View className="flex-1 px-6 py-8">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <TouchableOpacity className="p-2 rounded-lg active:bg-gray-200" onPress={onChangeEmail} activeOpacity={0.7}>
            <Text className="text-blue-600 font-medium text-base">← Change Email</Text>
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View className="flex-1 justify-center items-center">
          {/* Icon */}
          <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mb-8">
            <Text className="text-4xl">📧</Text>
          </View>

          {/* Title */}
          <Text className="text-3xl font-bold text-gray-900 text-center mb-4">Check Your Email</Text>

          {/* Description */}
          <Text className="text-base text-gray-600 text-center mb-2 leading-relaxed px-4">
            We've sent a verification link to
          </Text>

          <Text className="text-base font-semibold text-gray-900 text-center mb-8">{email}</Text>

          {/* Instructions */}
          <View className="bg-white rounded-xl p-6 mb-8 w-full border border-gray-200">
            <Text className="text-sm font-medium text-gray-700 mb-3">To complete your registration:</Text>

            <View className="space-y-2">
              <View className="flex-row items-start">
                <Text className="text-blue-600 mr-2 mt-0.5">1.</Text>
                <Text className="text-sm text-gray-600 flex-1">Open the email we just sent you</Text>
              </View>

              <View className="flex-row items-start">
                <Text className="text-blue-600 mr-2 mt-0.5">2.</Text>
                <Text className="text-sm text-gray-600 flex-1">Click the "Verify Email" button</Text>
              </View>

              <View className="flex-row items-start">
                <Text className="text-blue-600 mr-2 mt-0.5">3.</Text>
                <Text className="text-sm text-gray-600 flex-1">Return to this app to continue</Text>
              </View>
            </View>
          </View>

          {/* Success Message */}
          {verificationSent && (
            <View className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 w-full">
              <View className="flex-row items-center">
                <Text className="text-green-600 mr-2">✓</Text>
                <Text className="text-green-700 font-medium">Verification email sent successfully!</Text>
              </View>
            </View>
          )}

          {/* Resend Section */}
          <View className="items-center mb-8">
            <Text className="text-sm text-gray-600 mb-4 text-center">
              Didn't receive the email? Check your spam folder or
            </Text>

            <TouchableOpacity
              className={`
                px-6 py-3 rounded-lg flex-row items-center
                ${canResend ? "bg-blue-500 active:bg-blue-600" : "bg-gray-200"}
              `}
              onPress={handleResend}
              disabled={!canResend}
              activeOpacity={canResend ? 0.8 : 1}
            >
              {resendLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text className={`font-medium text-sm ${canResend ? "text-white" : "text-gray-500"}`}>
                  {timeLeft > 0 ? `Resend in ${timeLeft}s` : "Resend Email"}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            className="bg-white border border-gray-300 rounded-xl py-4 px-8 active:bg-gray-50 w-full"
            onPress={onContinue}
            activeOpacity={0.8}
          >
            <Text className="text-gray-900 font-semibold text-center text-base">I've Verified My Email</Text>
          </TouchableOpacity>

          {/* Help Text */}
          <View className="mt-8">
            <Text className="text-xs text-center text-gray-500 leading-relaxed">
              Still having trouble? Contact our support team at{" "}
              <Text className="text-blue-600 underline">support@productivitydawn.com</Text>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

// Usage Example
export const EmailVerificationScreenExample: React.FC = () => {
  const [resendLoading, setResendLoading] = React.useState(false)
  const [resendCooldown, setResendCooldown] = React.useState(0)
  const [verificationSent, setVerificationSent] = React.useState(false)

  const handleResendEmail = async () => {
    setResendLoading(true)
    setVerificationSent(false)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setVerificationSent(true)
      setResendCooldown(60) // 60 second cooldown
      console.log("Verification email resent")
    } catch (error) {
      console.error("Failed to resend email:", error)
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <EmailVerificationScreen
      email="user@example.com"
      onResendEmail={handleResendEmail}
      onChangeEmail={() => console.log("Navigate to change email")}
      onContinue={() => console.log("Continue to app")}
      resendLoading={resendLoading}
      resendCooldown={resendCooldown}
      verificationSent={verificationSent}
    />
  )
}
