"use client"

import type React from "react"
import { View, Text, TouchableOpacity } from "../../utils/react-native-web"

interface NotificationSettings {
  morningReminder: boolean
  streakReminder: boolean
  weeklyReport: boolean
}

interface NotificationSectionProps {
  settings: NotificationSettings
  wakeTime: { hour: number; minute: number }
  onUpdate: (settings: NotificationSettings) => Promise<boolean>
}

export const NotificationSection: React.FC<NotificationSectionProps> = ({ settings, wakeTime, onUpdate }) => {
  const toggleSetting = async (key: keyof NotificationSettings) => {
    const newSettings = { ...settings, [key]: !settings[key] }
    await onUpdate(newSettings)
  }

  const Switch = ({ value, onToggle }: { value: boolean; onToggle: () => void }) => (
    <TouchableOpacity onPress={onToggle} className={`w-12 h-6 rounded-full ${value ? "bg-blue-500" : "bg-gray-300"}`}>
      <View className={`w-5 h-5 rounded-full bg-white mt-0.5 transition-transform ${value ? "ml-6" : "ml-0.5"}`} />
    </TouchableOpacity>
  )

  return (
    <View className="mx-4 my-4 p-6 bg-white rounded-xl shadow-sm">
      <Text className="text-xl font-bold text-gray-900 mb-4">Notifications</Text>

      <View className="space-y-4">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-base text-gray-900">Morning Reminder</Text>
            <Text className="text-sm text-gray-600">
              Daily at {wakeTime.hour.toString().padStart(2, "0")}:{wakeTime.minute.toString().padStart(2, "0")}
            </Text>
          </View>
          <Switch value={settings.morningReminder} onToggle={() => toggleSetting("morningReminder")} />
        </View>

        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-base text-gray-900">Streak Reminder</Text>
            <Text className="text-sm text-gray-600">When you miss a day</Text>
          </View>
          <Switch value={settings.streakReminder} onToggle={() => toggleSetting("streakReminder")} />
        </View>

        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-base text-gray-900">Weekly Report</Text>
            <Text className="text-sm text-gray-600">Sunday summary</Text>
          </View>
          <Switch value={settings.weeklyReport} onToggle={() => toggleSetting("weeklyReport")} />
        </View>
      </View>
    </View>
  )
}
