import type React from "react"
import { View, Text, TouchableOpacity } from "../../utils/react-native-web"

interface WeekSelectorProps {
  currentWeek: Date
  onWeekChange: (week: Date) => void
  canGoNext: boolean
}

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

  const formatWeek = (date: Date) => {
    const endDate = new Date(date)
    endDate.setDate(endDate.getDate() + 6)
    return `${date.toLocaleDateString("en", { month: "short", day: "numeric" })} - ${endDate.toLocaleDateString("en", { month: "short", day: "numeric" })}`
  }

  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
      <TouchableOpacity onPress={goToPreviousWeek} className="p-2">
        <Text className="text-blue-600 text-lg">←</Text>
      </TouchableOpacity>

      <Text className="text-lg font-semibold text-gray-900">{formatWeek(currentWeek)}</Text>

      <TouchableOpacity
        onPress={goToNextWeek}
        className={`p-2 ${!canGoNext ? "opacity-50" : ""}`}
        disabled={!canGoNext}
      >
        <Text className="text-blue-600 text-lg">→</Text>
      </TouchableOpacity>
    </View>
  )
}
