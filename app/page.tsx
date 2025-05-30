"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { View, Text, ActivityIndicator } from "@/utils/react-native-web"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Simulate checking authentication status
    const checkAuth = setTimeout(() => {
      // Redirect to welcome screen or tasks screen based on auth status
      // For demo purposes, we'll redirect to welcome screen
      router.replace("/welcome")
    }, 1000)

    return () => clearTimeout(checkAuth)
  }, [router])

  return (
    <View className="flex-1 items-center justify-center h-full">
      <Text className="text-2xl font-bold mb-4">Productivity Dawn</Text>
      <ActivityIndicator size="large" color="#6366f1" />
    </View>
  )
}
