import type React from "react"
import { View, Text, TouchableOpacity, Modal } from "../../utils/react-native-web"

interface DayAnalytics {
  date: string
  dayName: string
  score: number
  tasksCompleted: number
  totalTasks: number
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
      <View className="flex-1 bg-black/50 items-center justify-center p-4">
        <View className="bg-white rounded-xl p-6 w-full max-w-sm">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-900">{day.dayName}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-gray-500 text-xl">×</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-gray-600 mb-4">{new Date(day.date).toLocaleDateString()}</Text>

          <View className="items-center mb-4">
            <Text className="text-3xl font-bold text-blue-600">{day.score}%</Text>
            <Text className="text-gray-600">Score</Text>
          </View>

          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-lg font-bold text-green-600">{day.tasksCompleted}</Text>
              <Text className="text-sm text-gray-600">Completed</Text>
            </View>
            <View className="items-center">
              <Text className="text-lg font-bold text-gray-600">{day.totalTasks}</Text>
              <Text className="text-sm text-gray-600">Total Tasks</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}
