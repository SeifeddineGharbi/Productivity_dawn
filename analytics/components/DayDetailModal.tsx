import type React from "react"
import { View, Text, TouchableOpacity, Modal } from "../../utils/react-native-web"

interface DayAnalytics {
  date: string
  dayName: string
  isToday: boolean
  tasks: any
  score: number
}

interface DayDetailModalProps {
  day: DayAnalytics | null
  isVisible: boolean
  onClose: () => void
}

export const DayDetailModal: React.FC<DayDetailModalProps> = ({ day, isVisible, onClose }) => {
  if (!day) return null

  return (
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 bg-black bg-opacity-50 items-center justify-center p-4">
        <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-gray-900">{day.dayName}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-gray-500 text-xl">×</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-center text-2xl font-bold text-blue-600 mb-4">{day.score}%</Text>

          <View className="space-y-2">
            <Text className="text-sm font-medium text-gray-700">Tasks completed:</Text>
            {day.tasks &&
              Object.entries(day.tasks).map(([taskId, completed]) => (
                <View key={taskId} className="flex-row items-center">
                  <Text className={`mr-2 ${completed ? "text-green-600" : "text-gray-400"}`}>
                    {completed ? "✓" : "○"}
                  </Text>
                  <Text className="text-gray-900 capitalize">{taskId.replace(/([A-Z])/g, " $1").trim()}</Text>
                </View>
              ))}
          </View>
        </View>
      </View>
    </Modal>
  )
}
