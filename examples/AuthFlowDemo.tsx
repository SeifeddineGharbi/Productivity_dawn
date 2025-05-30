"use client"

import React from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import {
  WelcomeScreenExample,
  EmailRegistrationScreenExample,
  SignInScreenExample,
  EmailVerificationScreenExample,
} from "../screens"

type AuthScreen = "welcome" | "registration" | "signin" | "verification"

export const AuthFlowDemo: React.FC = () => {
  const [activeScreen, setActiveScreen] = React.useState<AuthScreen>("welcome")

  const screens = [
    { id: "welcome" as const, title: "Welcome", component: WelcomeScreenExample },
    { id: "registration" as const, title: "Registration", component: EmailRegistrationScreenExample },
    { id: "signin" as const, title: "Sign In", component: SignInScreenExample },
    { id: "verification" as const, title: "Verification", component: EmailVerificationScreenExample },
  ]

  const ActiveComponent = screens.find((screen) => screen.id === activeScreen)?.component || WelcomeScreenExample

  return (
    <View className="flex-1 bg-gray-100">
      {/* Navigation Header */}
      <View className="bg-white border-b border-gray-200 pt-12 pb-4">
        <Text className="text-2xl font-bold text-center text-gray-900 mb-4">Productivity Dawn Auth Flow</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4"
          contentContainerStyle={{ paddingHorizontal: 8 }}
        >
          {screens.map((screen) => (
            <TouchableOpacity
              key={screen.id}
              className={`
                px-4 py-2 rounded-full mr-3
                ${activeScreen === screen.id ? "bg-blue-500" : "bg-gray-200"}
              `}
              onPress={() => setActiveScreen(screen.id)}
            >
              <Text
                className={`
                  font-medium
                  ${activeScreen === screen.id ? "text-white" : "text-gray-700"}
                `}
              >
                {screen.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Active Screen */}
      <View className="flex-1">
        <ActiveComponent />
      </View>
    </View>
  )
}

// Main App Component for Testing
export const App: React.FC = () => {
  return <AuthFlowDemo />
}
