"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, Switch, ScrollView, SafeAreaView } from "@/utils/react-native-web"
import { useRouter } from "next/navigation"

export default function SettingsScreen() {
  const router = useRouter()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const navigateToTasks = () => {
    router.push("/tasks")
  }

  const navigateToAnalytics = () => {
    router.push("/analytics")
  }

  const handleSignOut = () => {
    // Simulate sign out
    router.push("/welcome")
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 p-6">
        <Text className="text-2xl font-bold text-gray-900 mb-6">Settings</Text>

        {/* Profile Section */}
        <View className="bg-indigo-50 rounded-xl p-4 mb-6 flex-row items-center">
          <View className="w-16 h-16 rounded-full bg-indigo-200 mr-4 items-center justify-center">
            <Text className="text-2xl font-bold text-indigo-600">JD</Text>
          </View>
          <View>
            <Text className="text-lg font-bold text-gray-900">John Doe</Text>
            <Text className="text-gray-600">john.doe@example.com</Text>
          </View>
          <TouchableOpacity className="ml-auto">
            <Text className="text-indigo-600 font-medium">Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Notifications Section */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">Notifications</Text>
          <View className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
              <Text className="text-gray-800">Enable Notifications</Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "#d1d5db", true: "#818cf8" }}
                thumbColor={notificationsEnabled ? "#4f46e5" : "#f3f4f6"}
              />
            </View>
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
              <Text className="text-gray-800">Daily Reminder</Text>
              <TouchableOpacity>
                <Text className="text-indigo-600">9:00 AM</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center p-4">
              <Text className="text-gray-800">Weekly Summary</Text>
              <Switch value={true} trackColor={{ false: "#d1d5db", true: "#818cf8" }} thumbColor={"#4f46e5"} />
            </View>
          </View>
        </View>

        {/* Appearance Section */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">Appearance</Text>
          <View className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
              <Text className="text-gray-800">Dark Mode</Text>
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: "#d1d5db", true: "#818cf8" }}
                thumbColor={darkModeEnabled ? "#4f46e5" : "#f3f4f6"}
              />
            </View>
            <View className="flex-row justify-between items-center p-4">
              <Text className="text-gray-800">Sound Effects</Text>
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ false: "#d1d5db", true: "#818cf8" }}
                thumbColor={soundEnabled ? "#4f46e5" : "#f3f4f6"}
              />
            </View>
          </View>
        </View>

        {/* Subscription Section */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">Subscription</Text>
          <View className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-white font-bold text-lg">Free Plan</Text>
              <TouchableOpacity className="bg-white rounded-full px-3 py-1">
                <Text className="text-indigo-600 font-medium">Upgrade</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-white opacity-90 mb-2">
              Upgrade to Premium for advanced analytics, unlimited tasks, and more.
            </Text>
          </View>
        </View>

        {/* Support Section */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">Support</Text>
          <View className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <TouchableOpacity className="p-4 border-b border-gray-200">
              <Text className="text-gray-800">Help Center</Text>
            </TouchableOpacity>
            <TouchableOpacity className="p-4 border-b border-gray-200">
              <Text className="text-gray-800">Contact Support</Text>
            </TouchableOpacity>
            <TouchableOpacity className="p-4">
              <Text className="text-gray-800">Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity onPress={handleSignOut} className="bg-red-100 rounded-lg py-4 items-center mb-8">
          <Text className="text-red-600 font-semibold">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View className="flex-row justify-around items-center border-t border-gray-200 py-3 bg-white">
        <TouchableOpacity className="items-center" onPress={navigateToTasks}>
          <View className="w-6 h-6 bg-gray-300 rounded-full mb-1"></View>
          <Text className="text-xs text-gray-500">Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center" onPress={navigateToAnalytics}>
          <View className="w-6 h-6 bg-gray-300 rounded-full mb-1"></View>
          <Text className="text-xs text-gray-500">Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <View className="w-6 h-6 bg-indigo-600 rounded-full mb-1"></View>
          <Text className="text-xs text-indigo-600 font-medium">Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
