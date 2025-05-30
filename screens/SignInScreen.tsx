"use client"

import type React from "react"
import { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
} from "../utils/react-native-web"

interface SignInScreenProps {
  onSubmit: (data: { email: string; password: string; rememberMe: boolean }) => Promise<void>
  onSignUp: () => void
  onForgotPassword: () => void
  onBack: () => void
  onGoogleSignIn: () => void
  loading?: boolean
  error?: string
}

export const SignInScreen: React.FC<SignInScreenProps> = ({
  onSubmit,
  onSignUp,
  onForgotPassword,
  onBack,
  onGoogleSignIn,
  loading = false,
  error = "",
}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = async () => {
    if (!email || !password) return
    await onSubmit({ email, password, rememberMe })
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-8 min-h-screen">
          {/* Header */}
          <View className="flex-row items-center mb-8">
            <TouchableOpacity onPress={onBack} className="mr-4">
              <Text className="text-blue-600 text-lg">←</Text>
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-gray-900">Sign In</Text>
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
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View className="flex-row items-center justify-between">
              <TouchableOpacity className="flex-row items-center" onPress={() => setRememberMe(!rememberMe)}>
                <View
                  className={`w-5 h-5 rounded border-2 mr-2 items-center justify-center ${rememberMe ? "bg-blue-500 border-blue-500" : "border-gray-300"}`}
                >
                  {rememberMe && <Text className="text-white text-xs">✓</Text>}
                </View>
                <Text className="text-sm text-gray-700">Remember me</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onForgotPassword}>
                <Text className="text-sm text-blue-600">Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            className={`rounded-xl py-4 mb-6 ${loading ? "bg-blue-400" : "bg-blue-500 active:bg-blue-600"}`}
            onPress={handleSubmit}
            disabled={loading || !email || !password}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text className="text-white font-semibold text-center text-base">Sign In</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-4 text-sm text-gray-500">or</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Google Sign In */}
          <TouchableOpacity
            className="bg-white border border-gray-300 rounded-xl py-4 px-6 flex-row items-center justify-center mb-8"
            onPress={onGoogleSignIn}
            disabled={loading}
          >
            <View className="w-5 h-5 bg-white rounded mr-3 items-center justify-center">
              <Text className="text-blue-500 text-xs font-bold">G</Text>
            </View>
            <Text className="text-gray-900 font-semibold text-center text-base">Continue with Google</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <TouchableOpacity onPress={onSignUp}>
            <Text className="text-center text-gray-600">
              Don't have an account? <Text className="text-blue-600 font-semibold">Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
