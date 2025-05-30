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

export default function SignUpScreen() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/onboarding")
    }, 1500)
  }

  const handleSignIn = () => {
    router.push("/signin")
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <ScrollView className="flex-1 p-6">
          <View className="mb-8 mt-12">
            <Text className="text-3xl font-bold text-gray-900 mb-2">Create Account</Text>
            <Text className="text-lg text-gray-600">Sign up to get started</Text>
          </View>

          <View className="space-y-4 mb-6">
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">Full Name</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
              />
            </View>

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
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <Text className="text-xs text-gray-500 mt-1">Password must be at least 8 characters</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSignUp}
            disabled={isLoading}
            className={`rounded-lg py-4 items-center ${isLoading ? "bg-indigo-400" : "bg-indigo-600"}`}
          >
            <Text className="text-white font-semibold text-lg">{isLoading ? "Creating Account..." : "Sign Up"}</Text>
          </TouchableOpacity>

          <View className="mt-6">
            <Text className="text-xs text-gray-500 text-center">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>

          <View className="flex-row justify-center mt-8">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity onPress={handleSignIn}>
              <Text className="text-indigo-600 font-medium">Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
