"use client"

import type React from "react"
import { View, Text, TouchableOpacity, ActivityIndicator, SafeAreaView } from "../utils/react-native-web"

interface EmailVerificationScreenProps {
  email: string
  onResendEmail: () => void
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
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-6 py-8 justify-center">
        {/* Icon */}
        <View className="items-center mb-8">
          <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mb-6">
            <Text className="text-4xl">📧</Text>
          </View>
          <Text className="text-2xl font-bold text-gray-900 text-center mb-2">Check your email</Text>
          <Text className="text-base text-gray-600 text-center leading-relaxed">
            We've sent a verification link to{"\n"}
            <Text className="font-semibold">{email}</Text>
          </Text>
        </View>

        {/* Success Message */}
        {verificationSent && (
          <View className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <Text className="text-green-700 text-center">Verification email sent!</Text>
          </View>
        )}

        {/* Instructions */}
        <View className="bg-white rounded-xl p-6 mb-8">
          <Text className="text-sm text-gray-600 text-center leading-relaxed">
            Click the link in the email to verify your account. If you don't see it, check your spam folder.
          </Text>
        </View>

        {/* Actions */}
        <View className="space-y-4">
          {/* Resend Email */}
          <TouchableOpacity
            className={`rounded-xl py-4 border-2 border-blue-500 ${
              resendLoading || resendCooldown > 0 ? "opacity-50" : "active:bg-blue-50"
            }`}
            onPress={onResendEmail}
            disabled={resendLoading || resendCooldown > 0}
          >
            {resendLoading ? (
              <ActivityIndicator color="#007AFF" size="small" />
            ) : (
              <Text className="text-blue-500 font-semibold text-center text-base">
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend email"}
              </Text>
            )}
          </TouchableOpacity>

          {/* Change Email */}
          <TouchableOpacity className="py-3" onPress={onChangeEmail}>
            <Text className="text-gray-600 text-center">
              Wrong email? <Text className="text-blue-600 font-semibold">Change it</Text>
            </Text>
          </TouchableOpacity>

          {/* Continue Button (for demo) */}
          <TouchableOpacity className="rounded-xl py-4 bg-blue-500 active:bg-blue-600 mt-8" onPress={onContinue}>
            <Text className="text-white font-semibold text-center text-base">Continue (Demo)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
