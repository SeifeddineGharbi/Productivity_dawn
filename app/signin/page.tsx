"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from "@/utils/react-native-web"
import { useRouter } from "next/navigation"

export default function SignInScreen() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = () => {
    if (!email || !password) {
      alert("Please enter both email and password")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/tasks")
    }, 1500)
  }

  const handleForgotPassword = () => {
    router.push("/forgot-password")
  }

  const handleSignUp = () => {
    router.push("/signup")
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <ScrollView className="flex-1 p-6">
          <View className="mb-8 mt-12">
            <Text className="text-3xl font-bold text-gray-900 mb-2">Welcome back</Text>
            <Text className="text-lg text-gray-600">Sign in to continue</Text>
          </View>

          <View className="space-y-4 mb-6">
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">Email</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">Password</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity onPress={handleForgotPassword} className="mb-6">
            <Text className="text-indigo-600 font-medium text-right">Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSignIn}
            disabled={isLoading}
            className={`rounded-lg py-4 items-center ${isLoading ? "bg-indigo-400" : "bg-indigo-600"}`}
          >
            <Text className="text-white font-semibold text-lg">{isLoading ? "Signing in..." : "Sign In"}</Text>
          </TouchableOpacity>

          <View className="flex-row justify-center mt-8">
            <Text className="text-gray-600">Don't have an account? </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text className="text-indigo-600 font-medium">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
