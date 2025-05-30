"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "@/utils/react-native-web"
import { useRouter } from "next/navigation"

// Mock data for analytics
const weeklyData = [
  { day: "Mon", completed: 5, total: 7 },
  { day: "Tue", completed: 8, total: 10 },
  { day: "Wed", completed: 4, total: 9 },
  { day: "Thu", completed: 7, total: 7 },
  { day: "Fri", completed: 3, total: 8 },
  { day: "Sat", completed: 2, total: 4 },
  { day: "Sun", completed: 1, total: 3 },
]

const categoryData = [
  { name: "Work", completed: 15, total: 20, color: "#4f46e5" },
  { name: "Personal", completed: 8, total: 12, color: "#06b6d4" },
  { name: "Health", completed: 5, total: 8, color: "#10b981" },
  { name: "Learning", completed: 3, total: 10, color: "#f59e0b" },
]

export default function AnalyticsScreen() {
  const router = useRouter()
  const [selectedWeek, setSelectedWeek] = useState("This Week")

  const navigateToTasks = () => {
    router.push("/tasks")
  }

  const navigateToSettings = () => {
    router.push("/settings")
  }

  // Calculate total stats
  const totalTasks = weeklyData.reduce((sum, day) => sum + day.total, 0)
  const completedTasks = weeklyData.reduce((sum, day) => sum + day.completed, 0)
  const completionRate = Math.round((completedTasks / totalTasks) * 100)

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 p-6">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-gray-900">Analytics</Text>
          <View className="flex-row space-x-2">
            <TouchableOpacity
              onPress={() => setSelectedWeek("Last Week")}
              className={`px-3 py-1 rounded-full ${selectedWeek === "Last Week" ? "bg-indigo-600" : "bg-gray-200"}`}
            >
              <Text className={selectedWeek === "Last Week" ? "text-white" : "text-gray-700"}>Last Week</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedWeek("This Week")}
              className={`px-3 py-1 rounded-full ${selectedWeek === "This Week" ? "bg-indigo-600" : "bg-gray-200"}`}
            >
              <Text className={selectedWeek === "This Week" ? "text-white" : "text-gray-700"}>This Week</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Summary Cards */}
        <View className="flex-row justify-between mb-6">
          <View className="bg-indigo-50 rounded-xl p-4 w-[48%]">
            <Text className="text-indigo-900 font-medium mb-1">Completion Rate</Text>
            <Text className="text-3xl font-bold text-indigo-600">{completionRate}%</Text>
          </View>
          <View className="bg-indigo-50 rounded-xl p-4 w-[48%]">
            <Text className="text-indigo-900 font-medium mb-1">Tasks Completed</Text>
            <Text className="text-3xl font-bold text-indigo-600">
              {completedTasks}/{totalTasks}
            </Text>
          </View>
        </View>

        {/* Weekly Progress */}
        <View className="mb-8">
          <Text className="text-lg font-bold text-gray-900 mb-4">Weekly Progress</Text>
          <View className="flex-row justify-between">
            {weeklyData.map((day, index) => (
              <View key={index} className="items-center">
                <View className="h-32 w-8 bg-gray-100 rounded-full relative mb-2">
                  <View
                    className="absolute bottom-0 w-full bg-indigo-600 rounded-full"
                    style={{
                      height: `${(day.completed / day.total) * 100}%`,
                    }}
                  />
                </View>
                <Text className="text-xs text-gray-600">{day.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Category Breakdown */}
        <View className="mb-8">
          <Text className="text-lg font-bold text-gray-900 mb-4">Category Breakdown</Text>
          {categoryData.map((category, index) => (
            <View key={index} className="mb-4">
              <View className="flex-row justify-between mb-1">
                <Text className="text-gray-700">{category.name}</Text>
                <Text className="text-gray-700">
                  {category.completed}/{category.total}
                </Text>
              </View>
              <View className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <View
                  className="h-full"
                  style={{
                    width: `${(category.completed / category.total) * 100}%`,
                    backgroundColor: category.color,
                  }}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Streak */}
        <View className="bg-indigo-50 rounded-xl p-4 mb-8">
          <Text className="text-lg font-bold text-indigo-900 mb-2">Current Streak</Text>
          <View className="flex-row items-center">
            <Text className="text-3xl font-bold text-indigo-600 mr-2">7</Text>
            <Text className="text-indigo-900">days</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View className="flex-row justify-around items-center border-t border-gray-200 py-3 bg-white">
        <TouchableOpacity className="items-center" onPress={navigateToTasks}>
          <View className="w-6 h-6 bg-gray-300 rounded-full mb-1"></View>
          <Text className="text-xs text-gray-500">Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <View className="w-6 h-6 bg-indigo-600 rounded-full mb-1"></View>
          <Text className="text-xs text-indigo-600 font-medium">Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center" onPress={navigateToSettings}>
          <View className="w-6 h-6 bg-gray-300 rounded-full mb-1"></View>
          <Text className="text-xs text-gray-500">Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
