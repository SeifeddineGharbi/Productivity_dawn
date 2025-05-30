import type React from "react"
import { View, Text, TouchableOpacity } from "../../utils/react-native-web"

interface DayAnalytics {
  date: string
  dayName: string
  score: number
  tasksCompleted: number
  totalTasks: number
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
    <View className="mx-4 my-4 p-6 bg-white rounded-xl shadow-sm">
      <Text className="text-xl font-bold text-gray-900 mb-4">Daily Progress</Text>

      <View className="flex-row flex-wrap justify-between">
        {days.map((day) => (
          <TouchableOpacity
            key={day.date}
            onPress={() => onDayPress(day)}
            className="w-12 h-12 rounded-lg items-center justify-center mb-2"
            style={{ backgroundColor: day.score > 0 ? undefined : "#f3f4f6" }}
          >
            <View
              className={`w-10 h-10 rounded-lg items-center justify-center ${day.score > 0 ? getScoreColor(day.score) : "bg-gray-200"}`}
            >
              <Text className={`text-xs font-bold ${day.score > 0 ? "text-white" : "text-gray-500"}`}>
                {day.dayName.slice(0, 1)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}
