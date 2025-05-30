import type React from "react"
import { View, Text, TouchableOpacity } from "../../utils/react-native-web"

interface DayAnalytics {
  date: string
  dayName: string
  isToday: boolean
  tasks: any
  score: number
}

interface ProgressGridProps {
  days: DayAnalytics[]
  onDayPress: (day: DayAnalytics) => void
}

export const ProgressGrid: React.FC<ProgressGridProps> = ({ days, onDayPress }) => {
  const getScoreColor = (score: number) => {
    if (score >= 75) return "bg-green-500"
    if (score >= 50) return "bg-yellow-500"
    if (score >= 25) return "bg-orange-500"
    return "bg-red-500"
  }

  return (
    <View className="mx-4 mb-6">
      <View className="bg-white rounded-2xl p-6 shadow-sm">
        <Text className="text-lg font-semibold text-gray-900 mb-4">Daily Progress</Text>

        <View className="flex-row justify-between">
          {days.map((day) => (
            <TouchableOpacity key={day.date} onPress={() => onDayPress(day)} className="items-center flex-1">
              <Text className={`text-xs font-medium mb-2 ${day.isToday ? "text-blue-600" : "text-gray-600"}`}>
                {day.dayName}
              </Text>
              <View
                className={`w-8 h-8 rounded-full items-center justify-center ${
                  day.score > 0 ? getScoreColor(day.score) : "bg-gray-200"
                }`}
              >
                <Text className={`text-xs font-bold ${day.score > 0 ? "text-white" : "text-gray-500"}`}>
                  {day.score > 0 ? day.score : "—"}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  )
}
