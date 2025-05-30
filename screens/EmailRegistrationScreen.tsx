"use client"

import type React from "react"
import { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "../utils/react-native-web"

interface EmailRegistrationScreenProps {
  onSubmit: (data: { email: string; password: string; name: string }) => Promise<void>
  onSignIn: () => void
  onBack: () => void
  loading?: boolean
  error?: string
}

export const EmailRegistrationScreen: React.FC<EmailRegistrationScreenProps> = ({
  onSubmit,
  onSignIn,
  onBack,
  loading = false,
  error = "",
}) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = async () => {
    if (!name || !email || !password || password !== confirmPassword) return
    await onSubmit({ name, email, password })
  }

  const isValid = name && email && password && password === confirmPassword && password.length >= 6

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-8 min-h-screen">
          {/* Header */}
          <View className="flex-row items-center mb-8">
            <TouchableOpacity onPress={onBack} className="mr-4">
              <Text className="text-blue-600 text-lg">←</Text>
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-gray-900">Create Account</Text>
          </View>

          {/* Error Message */}
          {error && (
            <View className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <Text className="text-red-700 text-center">{error}</Text>
            </View>
          )}

          {/* Form */}
          <View className="space-y-4 mb-8">
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">Full Name</Text>
              <TextInput
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white"
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">Email</Text>
              <TextInput
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
              <TextInput
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white"
                placeholder="Create a password (min. 6 characters)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">Confirm Password</Text>
              <TextInput
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            {password && confirmPassword && password !== confirmPassword && (
              <Text className="text-red-600 text-sm">Passwords don't match</Text>
            )}
          </View>

          {/* Create Account Button */}
          <TouchableOpacity
            className={`rounded-xl py-4 mb-6 ${loading || !isValid ? "bg-blue-400" : "bg-blue-500 active:bg-blue-600"}`}
            onPress={handleSubmit}
            disabled={loading || !isValid}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text className="text-white font-semibold text-center text-base">Create Account</Text>
            )}
          </TouchableOpacity>

          {/* Sign In Link */}
          <TouchableOpacity onPress={onSignIn}>
            <Text className="text-center text-gray-600">
              Already have an account? <Text className="text-blue-600 font-semibold">Sign In</Text>
            </Text>
          </TouchableOpacity>

          {/* Terms */}
          <View className="mt-8 pt-6 border-t border-gray-200">
            <Text className="text-xs text-center text-gray-500 leading-relaxed">
              By creating an account, you agree to our <Text className="text-blue-600 underline">Terms of Service</Text>{" "}
              and <Text className="text-blue-600 underline">Privacy Policy</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
