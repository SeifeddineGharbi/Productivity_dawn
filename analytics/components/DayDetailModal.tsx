import type React from "react"
import { View, Text, TouchableOpacity, Modal } from "react-native"
import type { DayDetailModalProps } from "../types"

export const DayDetailModal: React.FC<DayDetailModalProps> = ({ day, isVisible, onClose }) => {
  if (!day) return null

  const taskDetails = [
    { key: "drinkWater", name: "Drink Water", emoji: "💧", description: "Hydrate immediately upon waking" },
    { key: "noSocialMedia", name: "No Social Media", emoji: "📱", description: "Avoid distractions before getting up" },
    {
      key: "sunlightExposure",
      name: "Sunlight Exposure",
      emoji: "☀️",
      description: "Get 5-10 minutes of direct sunlight",
    },
    { key: "elephantTask", name: "Elephant Task", emoji: "🐘", description: "Identify your most important task" },
  ]

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Modal visible={isVisible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="bg-white border-b border-gray-200 px-6 py-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xl font-bold text-gray-900">{formatDate(day.date)}</Text>
              {day.isToday && <Text className="text-sm text-blue-600 font-medium">Today</Text>}
            </View>
            <TouchableOpacity className="p-2 rounded-lg active:bg-gray-100" onPress={onClose} activeOpacity={0.7}>
              <Text className="text-blue-600 font-semibold">Done</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-1 p-6">
          {day.tasks ? (
            <>
              {/* Score Display */}
              <View className="bg-white rounded-2xl p-6 mb-6 shadow-md items-center">
                <Text className="text-4xl font-bold text-blue-600 mb-2">{day.score}%</Text>
                <Text className="text-lg text-gray-600">Daily Score</Text>
                {day.isPerfectDay && (
                  <View className="bg-green-100 rounded-full px-4 py-2 mt-3">
                    <Text className="text-green-800 font-semibold">🎉 Perfect Day!</Text>
                  </View>
                )}
              </View>

              {/* Task Details */}
              <View className="bg-white rounded-2xl p-6 shadow-md">
                <Text className="text-xl font-semibold mb-4 text-gray-900">Task Completion</Text>

                <View className="space-y-4">
                  {taskDetails.map((task) => {
                    const completed = day.tasks?.[task.key as keyof typeof day.tasks] || false
                    return (
                      <View key={task.key} className="flex-row items-center">
                        <View
                          className={`w-8 h-8 rounded-full mr-4 items-center justify-center ${
                            completed ? "bg-green-100" : "bg-gray-100"
                          }`}
                        >
                          <Text className="text-lg">{completed ? "✅" : task.emoji}</Text>
                        </View>

                        <View className="flex-1">
                          <Text className={`text-base font-medium ${completed ? "text-green-800" : "text-gray-600"}`}>
                            {task.name}
                          </Text>
                          <Text className="text-sm text-gray-500">{task.description}</Text>
                        </View>

                        {completed && <Text className="text-green-600 font-semibold">✓</Text>}
                      </View>
                    )
                  })}
                </View>
              </View>
            </>
          ) : (
            /* No Data State */
            <View className="flex-1 items-center justify-center">
              <View className="bg-white rounded-2xl p-8 shadow-md items-center">
                <Text className="text-6xl mb-4">📊</Text>
                <Text className="text-xl font-semibold text-gray-900 mb-2">No Data</Text>
                <Text className="text-gray-600 text-center">No tasks were completed on this day.</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  )
}
