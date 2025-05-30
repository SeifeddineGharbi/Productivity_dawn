"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { View, Text, TouchableOpacity, Animated, Easing } from "react-native"
import type { ProgressAnimationProps } from "../types"
import ParticleSystem from "./ParticleSystem"

export const ProgressAnimation: React.FC<ProgressAnimationProps> = ({ userName, onContinue }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current
  const opacityAnim = useRef(new Animated.Value(0)).current
  const textOpacityAnim = useRef(new Animated.Value(0)).current
  const buttonOpacityAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Checkmark animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 400,
        easing: Easing.out(Easing.back(2)),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start()

    // Circle opacity animation
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start()

    // Text animation
    Animated.timing(textOpacityAnim, {
      toValue: 1,
      duration: 600,
      delay: 600,
      useNativeDriver: true,
    }).start()

    // Button animation
    Animated.timing(buttonOpacityAnim, {
      toValue: 1,
      duration: 600,
      delay: 1200,
      useNativeDriver: true,
    }).start()
  }, [])

  return (
    <View className="flex-1 items-center justify-center">
      <ParticleSystem />

      <Animated.View
        className="w-32 h-32 rounded-full bg-green-100 items-center justify-center mb-8"
        style={{
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        <Text className="text-green-600 text-6xl">✓</Text>
      </Animated.View>

      <Animated.View style={{ opacity: textOpacityAnim }} className="items-center">
        <Text className="text-3xl font-bold text-center text-gray-900 mb-4">You're all set, {userName}!</Text>

        <Text className="text-base text-center text-gray-600 mb-8 px-8">
          We've created your personalized morning routine based on your answers. Get ready to transform your mornings!
        </Text>
      </Animated.View>

      <Animated.View style={{ opacity: buttonOpacityAnim }}>
        <TouchableOpacity
          className="bg-blue-500 rounded-xl py-4 px-8 active:bg-blue-600"
          onPress={onContinue}
          activeOpacity={0.8}
        >
          <Text className="text-white font-semibold text-center text-base">Continue to Your Plan</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}
