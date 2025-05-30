import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import type { ProgressGridProps } from "../types"

export const ProgressGrid: React.FC<ProgressGridProps> = ({ days, onDayPress }) => {
  const getDotColor = (taskName: string, completed: boolean) => {
    const colors = {
      drinkWater: completed ? "bg-blue-500" : "bg-gray-300",
      noSocialMedia: completed ? "bg-red-500" : "bg-gray-300",
      sunlightExposure: completed ? "bg-yellow-400" : "bg-gray-300",
      elephantTask: completed ? "bg-green-500" : "bg-gray-300",
    }
    return colors[taskName as keyof typeof colors] || "bg-gray-300"
  }

  return (
    <View className="bg-white rounded-2xl p-6 mx-4 mb-4 shadow-md">
      <Text className="text-xl font-semibold mb-4 text-gray-900">Daily Progress</Text>

      <View className="space-y-4">
        {days.map((day) => (
          <TouchableOpacity
            key={day.date}
            className={`flex-row items-center justify-between py-3 px-2 rounded-lg ${
              day.isToday ? "bg-blue-50 border border-blue-200" : "active:bg-gray-50"
            }`}
            onPress={() => onDayPress(day)}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center flex-1">
              <Text className={`text-sm font-medium w-12 ${day.isToday ? "text-blue-600" : "text-gray-600"}`}>
                {day.dayName}
              </Text>

              <View className="flex-row ml-4">
                <View
                  className={`w-3 h-3 rounded-full mr-2 ${getDotColor("drinkWater", day.tasks?.drinkWater || false)}`}
                />
                <View
                  className={`w-3 h-3 rounded-full mr-2 ${getDotColor(
                    "noSocialMedia",
                    day.tasks?.noSocialMedia || false,
                  )}`}
                />
                <View
                  className={`w-3 h-3 rounded-full mr-2 ${getDotColor(
                    "sunlightExposure",
                    day.tasks?.sunlightExposure || false,
                  )}`}
                />
                <View
                  className={`w-3 h-3 rounded-full ${getDotColor("elephantTask", day.tasks?.elephantTask || false)}`}
                />
              </View>
            </View>

            <View className="items-end">
              {day.tasks ? (
                <>
                  <Text className="text-sm font-semibold text-gray-900">{day.completedCount}/4</Text>
                  {day.isPerfectDay && <Text className="text-xs text-green-600 font-medium">Perfect!</Text>}
                </>
              ) : (
                <Text className="text-xs text-gray-400">No data</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}
