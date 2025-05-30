"use client"

import { View, Text, TouchableOpacity, Image, SafeAreaView } from "@/utils/react-native-web"
import { useRouter } from "next/navigation"

export default function WelcomeScreen() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push("/signin")
  }

  const handleSignIn = () => {
    router.push("/signin")
  }

  return (
    <SafeAreaView className="flex-1 bg-indigo-50">
      <View className="flex-1 p-6">
        <View className="flex-1 items-center justify-center">
          <Image
            source={{ uri: "/placeholder.svg?height=120&width=120" }}
            alt="Productivity Dawn Logo"
            className="w-32 h-32 mb-8"
          />
          <Text className="text-3xl font-bold text-center text-indigo-900 mb-4">Welcome to Productivity Dawn</Text>
          <Text className="text-lg text-center text-gray-600 mb-8">
            Start your day right with focused productivity tools designed to help you achieve more
          </Text>
        </View>

        <View className="space-y-4 mb-6">
          <TouchableOpacity onPress={handleGetStarted} className="bg-indigo-600 rounded-lg py-4 items-center">
            <Text className="text-white font-semibold text-lg">Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSignIn}
            className="bg-white border border-indigo-600 rounded-lg py-4 items-center"
          >
            <Text className="text-indigo-600 font-semibold text-lg">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
