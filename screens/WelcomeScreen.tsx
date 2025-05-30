"use client"

import React from "react"
import { View, Text, TouchableOpacity, ScrollView, Animated } from "react-native"

interface WelcomeScreenProps {
  onGoogleSignIn: () => void
  onEmailSignUp: () => void
  onSignIn: () => void
  loading?: boolean
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onGoogleSignIn,
  onEmailSignUp,
  onSignIn,
  loading = false,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current
  const slideAnim = React.useRef(new Animated.Value(50)).current

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  return (
    <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
      <View className="flex-1 justify-center px-6 py-8 min-h-screen">
        {/* Hero Animation Area */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="items-center mb-12"
        >
          {/* Hero Image Placeholder - Replace with actual image/animation */}
          <View className="w-32 h-32 bg-blue-100 rounded-full items-center justify-center mb-8">
            <Text className="text-6xl">🌅</Text>
          </View>

          {/* App Logo/Title */}
          <View className="items-center mb-2">
            <Text className="text-2xl font-bold text-blue-600 mb-1">PRODUCTIVITY DAWN</Text>
            <Text className="text-sm font-medium text-gray-500 tracking-wider">MORNING MASTERY</Text>
          </View>
        </Animated.View>

        {/* Hero Content */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="mb-12"
        >
          <Text className="text-3xl font-bold text-center text-gray-900 mb-4 leading-tight">
            CONQUER your day with the <Text className="text-blue-600">simplest, science-backed</Text> morning routine
          </Text>

          <Text className="text-base text-center text-gray-600 mb-2 leading-relaxed">
            Transform your mornings with 4 powerful habits that take just 15 minutes but change everything.
          </Text>

          {/* Feature Highlights */}
          <View className="space-y-2 mt-6">
            <View className="flex-row items-center justify-center">
              <Text className="text-green-600 mr-2">✓</Text>
              <Text className="text-sm text-gray-700">Science-backed 4-habit system</Text>
            </View>
            <View className="flex-row items-center justify-center">
              <Text className="text-green-600 mr-2">✓</Text>
              <Text className="text-sm text-gray-700">Just 15 minutes each morning</Text>
            </View>
            <View className="flex-row items-center justify-center">
              <Text className="text-green-600 mr-2">✓</Text>
              <Text className="text-sm text-gray-700">Track progress & build streaks</Text>
            </View>
          </View>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="space-y-4"
        >
          {/* Google Sign In */}
          <TouchableOpacity
            className={`
              bg-blue-500 rounded-xl py-4 px-6 flex-row items-center justify-center
              ${loading ? "opacity-50" : "active:bg-blue-600"}
              shadow-sm
            `}
            onPress={onGoogleSignIn}
            disabled={loading}
            activeOpacity={0.8}
          >
            <View className="w-5 h-5 bg-white rounded mr-3 items-center justify-center">
              <Text className="text-blue-500 text-xs font-bold">G</Text>
            </View>
            <Text className="text-white font-semibold text-center text-base">Continue with Google</Text>
          </TouchableOpacity>

          {/* Email Sign Up */}
          <TouchableOpacity
            className={`
              bg-white border border-gray-300 rounded-xl py-4 px-6 flex-row items-center justify-center
              ${loading ? "opacity-50" : "active:bg-gray-50"}
              shadow-sm
            `}
            onPress={onEmailSignUp}
            disabled={loading}
            activeOpacity={0.8}
          >
            <View className="w-5 h-5 mr-3 items-center justify-center">
              <Text className="text-gray-600 text-sm">✉️</Text>
            </View>
            <Text className="text-gray-900 font-semibold text-center text-base">Continue with Email</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center my-6">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-4 text-sm text-gray-500">or</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Sign In Link */}
          <TouchableOpacity
            className={`py-3 ${loading ? "opacity-50" : "active:opacity-70"}`}
            onPress={onSignIn}
            disabled={loading}
            activeOpacity={0.7}
          >
            <Text className="text-blue-600 font-medium text-center text-base">
              Already have an account? <Text className="font-semibold">Sign In</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Footer */}
        <Animated.View style={{ opacity: fadeAnim }} className="mt-8 pt-6 border-t border-gray-200">
          <Text className="text-xs text-center text-gray-500 leading-relaxed">
            By continuing, you agree to our <Text className="text-blue-600 underline">Terms of Service</Text> and{" "}
            <Text className="text-blue-600 underline">Privacy Policy</Text>
          </Text>
        </Animated.View>
      </View>
    </ScrollView>
  )
}

// Usage Example
export const WelcomeScreenExample: React.FC = () => {
  const [loading, setLoading] = React.useState(false)

  const handleGoogleSignIn = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      console.log("Google Sign In")
    }, 2000)
  }

  const handleEmailSignUp = () => {
    console.log("Navigate to Email Registration")
  }

  const handleSignIn = () => {
    console.log("Navigate to Sign In")
  }

  return (
    <WelcomeScreen
      onGoogleSignIn={handleGoogleSignIn}
      onEmailSignUp={handleEmailSignUp}
      onSignIn={handleSignIn}
      loading={loading}
    />
  )
}
