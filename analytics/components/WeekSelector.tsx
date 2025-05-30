import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import type { WeekSelectorProps } from "../types"
import { analyticsService } from "../analytics-service"

export const WeekSelector: React.FC<WeekSelectorProps> = ({ currentWeek, onWeekChange, canGoNext }) => {
  const goToPreviousWeek = () => {
    const prevWeek = new Date(currentWeek)
    prevWeek.setDate(prevWeek.getDate() - 7)
    onWeekChange(prevWeek)
  }

  const goToNextWeek = () => {
    if (canGoNext) {
      const nextWeek = new Date(currentWeek)
      nextWeek.setDate(nextWeek.getDate() + 7)
      onWeekChange(nextWeek)
    }
  }

  const weekRange = analyticsService.formatWeekRange(currentWeek)

  return (
    <View className="flex-row items-center justify-between px-6 py-4">
      <TouchableOpacity className="p-2 rounded-lg active:bg-gray-100" onPress={goToPreviousWeek} activeOpacity={0.7}>
        <Text className="text-blue-600 font-semibold text-lg">←</Text>
      </TouchableOpacity>

      <View className="items-center">
        <Text className="text-lg font-semibold text-gray-900">{weekRange}</Text>
        <Text className="text-sm text-gray-500">Weekly Progress</Text>
      </View>

      <TouchableOpacity
        className={`p-2 rounded-lg ${canGoNext ? "active:bg-gray-100" : "opacity-30"}`}
        onPress={goToNextWeek}
        disabled={!canGoNext}
        activeOpacity={canGoNext ? 0.7 : 1}
      >
        <Text className={`font-semibold text-lg ${canGoNext ? "text-blue-600" : "text-gray-400"}`}>→</Text>
      </TouchableOpacity>
    </View>
  )
}
