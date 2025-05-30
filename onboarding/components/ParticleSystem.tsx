"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { View, Animated, Easing, Dimensions } from "react-native"

interface Particle {
  x: Animated.Value
  y: Animated.Value
  scale: Animated.Value
  opacity: Animated.Value
  color: string
  size: number
}

const ParticleSystem: React.FC = () => {
  const particles = useRef<Particle[]>([])
  const { width, height } = Dimensions.get("window")

  const colors = [
    "#007AFF", // Blue
    "#34C759", // Green
    "#FF9500", // Orange
    "#FF3B30", // Red
    "#5856D6", // Purple
  ]

  useEffect(() => {
    // Create particles
    for (let i = 0; i < 30; i++) {
      const delay = Math.random() * 2000
      const duration = 1500 + Math.random() * 2000
      const size = 5 + Math.random() * 15

      const particle: Particle = {
        x: new Animated.Value(width / 2),
        y: new Animated.Value(height / 2),
        scale: new Animated.Value(0),
        opacity: new Animated.Value(0),
        color: colors[Math.floor(Math.random() * colors.length)],
        size,
      }

      particles.current.push(particle)

      // Animate each particle
      const xDestination = (Math.random() - 0.5) * width * 1.5
      const yDestination = (Math.random() - 0.5) * height * 1.5

      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(particle.scale, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(particle.opacity, {
            toValue: 0.8,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(particle.x, {
            toValue: xDestination,
            duration,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(particle.y, {
            toValue: yDestination,
            duration,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.delay(duration * 0.7),
            Animated.timing(particle.opacity, {
              toValue: 0,
              duration: duration * 0.3,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ]).start()
    }
  }, [])

  return (
    <View className="absolute inset-0 overflow-hidden">
      {particles.current.map((particle, index) => (
        <Animated.View
          key={index}
          style={{
            position: "absolute",
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: particle.size / 2,
            transform: [{ translateX: particle.x }, { translateY: particle.y }, { scale: particle.scale }],
            opacity: particle.opacity,
          }}
        />
      ))}
    </View>
  )
}

export default ParticleSystem
