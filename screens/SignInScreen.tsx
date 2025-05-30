"use client"

import React from "react"
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from "react-native"

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
  error,
}) => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [focusedField, setFocusedField] = React.useState<string | null>(null)
  const [showPassword, setShowPassword] = React.useState(false)

  const isFormValid = formData.email.trim() && formData.password.trim()

  const handleSubmit = async () => {
    if (isFormValid && !loading) {
      await onSubmit(formData)
    }
  }

  const getInputBorderColor = (fieldName: string) => {
    if (focusedField === fieldName) return "border-blue-500 bg-white"
    return "border-gray-300 bg-white"
  }

  return (
    <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
      <View className="flex-1 px-6 py-8">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <TouchableOpacity
            className="p-2 rounded-lg active:bg-gray-200"
            onPress={onBack}
            disabled={loading}
            activeOpacity={0.7}
          >
            <Text className="text-blue-600 font-medium text-base">← Back</Text>
          </TouchableOpacity>

          <TouchableOpacity className="active:opacity-70" onPress={onSignUp} disabled={loading} activeOpacity={0.7}>
            <Text className="text-blue-600 font-medium text-base">Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Welcome Back Section */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-blue-100 rounded-full items-center justify-center mb-4">
            <Text className="text-3xl">👋</Text>
          </View>

          <Text className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</Text>
          <Text className="text-base text-gray-600 text-center">Ready to conquer another amazing day?</Text>
        </View>

        {/* Google Sign In */}
        <TouchableOpacity
          className={`
            bg-white border border-gray-300 rounded-xl py-4 px-6 flex-row items-center justify-center mb-6
            ${loading ? "opacity-50" : "active:bg-gray-50"}
            shadow-sm
          `}
          onPress={onGoogleSignIn}
          disabled={loading}
          activeOpacity={0.8}
        >
          <View className="w-5 h-5 bg-blue-500 rounded mr-3 items-center justify-center">
            <Text className="text-white text-xs font-bold">G</Text>
          </View>
          <Text className="text-gray-900 font-semibold text-center text-base">Continue with Google</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-4 text-sm text-gray-500">or sign in with email</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Form */}
        <View className="space-y-6">
          {/* Email Input */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">Email Address</Text>
            <TextInput
              className={`
                px-4 py-4 rounded-xl border text-base
                ${getInputBorderColor("email")}
              `}
              placeholder="Enter your email address"
              placeholderTextColor="#9CA3AF"
              value={formData.email}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, email: text }))}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
          </View>

          {/* Password Input */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
            <View className="relative">
              <TextInput
                className={`
                  px-4 py-4 rounded-xl border text-base pr-12
                  ${getInputBorderColor("password")}
                `}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={formData.password}
                onChangeText={(text) => setFormData((prev) => ({ ...prev, password: text }))}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
              <TouchableOpacity
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
              >
                <Text className="text-blue-600 font-medium text-sm">{showPassword ? "Hide" : "Show"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Remember Me & Forgot Password */}
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              className="flex-row items-center active:opacity-70"
              onPress={() => setFormData((prev) => ({ ...prev, rememberMe: !prev.rememberMe }))}
              disabled={loading}
              activeOpacity={0.7}
            >
              <View
                className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${
                  formData.rememberMe ? "bg-blue-500 border-blue-500" : "border-gray-300 bg-white"
                }`}
              >
                {formData.rememberMe && <Text className="text-white text-xs font-bold">✓</Text>}
              </View>
              <Text className="text-sm text-gray-700">Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="active:opacity-70"
              onPress={onForgotPassword}
              disabled={loading}
              activeOpacity={0.7}
            >
              <Text className="text-sm text-blue-600 font-medium">Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Error Message */}
        {error && (
          <View className="mt-6 p-3 bg-red-50 rounded-lg border border-red-200">
            <Text className="text-red-700 text-sm text-center">{error}</Text>
          </View>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          className={`
            mt-8 py-4 px-6 rounded-xl flex-row items-center justify-center
            ${isFormValid && !loading ? "bg-blue-500 active:bg-blue-600" : "bg-gray-300"}
          `}
          onPress={handleSubmit}
          disabled={!isFormValid || loading}
          activeOpacity={isFormValid && !loading ? 0.8 : 1}
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text className={`font-semibold text-base ${isFormValid ? "text-white" : "text-gray-500"}`}>Sign In</Text>
          )}
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View className="mt-6">
          <TouchableOpacity
            className="py-3 active:opacity-70"
            onPress={onSignUp}
            disabled={loading}
            activeOpacity={0.7}
          >
            <Text className="text-gray-600 text-center text-base">
              Don't have an account? <Text className="text-blue-600 font-semibold">Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

// Usage Example
export const SignInScreenExample: React.FC = () => {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string>("")

  const handleSubmit = async (data: { email: string; password: string; rememberMe: boolean }) => {
    setLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random error for demo
          if (Math.random() > 0.7) {
            reject(new Error("Invalid email or password"))
          } else {
            resolve(data)
          }
        }, 2000)
      })

      console.log("Sign in successful:", data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <SignInScreen
      onSubmit={handleSubmit}
      onSignUp={() => console.log("Navigate to Sign Up")}
      onForgotPassword={() => console.log("Navigate to Forgot Password")}
      onBack={() => console.log("Navigate Back")}
      onGoogleSignIn={() => console.log("Google Sign In")}
      loading={loading}
      error={error}
    />
  )
}
