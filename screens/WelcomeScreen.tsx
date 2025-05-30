"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { View, Text, TouchableOpacity, ScrollView } from "../utils/react-native-web"

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
  // Use refs for animation
  const fadeAnim = useRef<HTMLDivElement>(null);
  const slideAnim = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Apply animations on mount
    if (fadeAnim.current) {
      fadeAnim.current.style.opacity = "0";
      setTimeout(() => {
        if (fadeAnim.current) fadeAnim.current.style.opacity = "1";
      }, 100);
    }

    if (slideAnim.current) {
      slideAnim.current.style.transform = "translateY(50px)";
      slideAnim.current.style.opacity = "0";
      setTimeout(() => {
        if (slideAnim.current) {
          slideAnim.current.style.transform = "translateY(0)";
          slideAnim.current.style.opacity = "1";
        }
      }, 100);
    }
  }, []);

  return (
    <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
      <View className="flex-1 justify-center px-6 py-8 min-h-screen">
        {/* Hero Animation Area */}
        <View
          ref={fadeAnim}
          className="items-center mb-12 transition-opacity duration-800"
        >
          {/* Hero Image Placeholder */}
          <View className="w-32 h-32 bg-blue-100 rounded-full items-center justify-center mb-8">
            <Text className="text-6xl">🌅</Text>
          </View>

          {/* App Logo/Title */}
          <View className="items-center mb-2">
            <Text className="text-2xl font-bold text-blue-600 mb-1">PRODUCTIVITY DAWN</Text>
            <Text className="text-sm font-medium text-gray-500 tracking-wider">MORNING MASTERY</Text>
          </View>
        </View>

        {/* Hero Content */}
        <View
          ref={slideAnim}
          className="mb-12 transition-all duration-800"
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
        </View>

        {/* Action Buttons */}
        <View className="space-y-4">
          {/* Google Sign In */}
          <TouchableOpacity
            className={`
              bg-blue-500 rounded-xl py-4 px-6 flex-row items-center justify-center
              ${loading ? "opacity-50" : "active:bg-blue-600"}
              shadow-sm
            `}
            onPress={onGoogleSignIn}
            disabled={loading}
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
          >
            <View className="w-5 h-5 mr-3 \
