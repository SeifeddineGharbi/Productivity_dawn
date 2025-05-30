"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, Switch, TouchableOpacity } from "react-native"
import Slider from "@react-native-community/slider"
import type { NotificationSectionProps } from "../types"
import { settingsService } from "../settings-service"

export const NotificationSection: React.FC<NotificationSectionProps> = ({ settings, wakeTime, onUpdate }) => {
  const [localSettings, setLocalSettings] = useState(settings)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setLocalSettings(settings)
  }, [settings])

  const handleToggleReminders = (value: boolean) => {
    const updatedSettings = {
      ...localSettings,
      dailyRemindersEnabled: value,
    }
    setLocalSettings(updatedSettings)
    saveSettings(updatedSettings)
  }

  const handleToggleWeeklyReports = (value: boolean) => {
    const updatedSettings = {
      ...localSettings,
      weeklyReportsEnabled: value,
    }
    setLocalSettings(updatedSettings)
    saveSettings(updatedSettings)
  }

  const handleSliderChange = (value: number) => {
    // Round to nearest 5 minutes
    const roundedValue = Math.round(value / 5) * 5
    setLocalSettings({
      ...localSettings,
      reminderOffset: roundedValue,
    })
  }

  const handleSliderComplete = (value: number) => {
    // Round to nearest 5 minutes
    const roundedValue = Math.round(value / 5) * 5
    const updatedSettings = {
      ...localSettings,
      reminderOffset: roundedValue,
    }
    setLocalSettings(updatedSettings)
    saveSettings(updatedSettings)
  }

  const handleWeeklyReportDayChange = (day: "monday" | "friday" | "sunday") => {
    const updatedSettings = {
      ...localSettings,
      weeklyReportDay: day,
    }
    setLocalSettings(updatedSettings)
    saveSettings(updatedSettings)
  }

  const saveSettings = async (updatedSettings: typeof localSettings) => {
    setIsUpdating(true)
    try {
      await onUpdate(updatedSettings)
    } finally {
      setIsUpdating(false)
    }
  }

  // Calculate actual reminder time
  const reminderTime = settingsService.calculateReminderTime(wakeTime, localSettings.reminderOffset)
  const reminderTimeFormatted = settingsService.formatTime(reminderTime)

  return (
    <View className="bg-white rounded-2xl p-6 mx-4 mb-4 shadow-md">
      <Text className="text-xl font-semibold text-gray-900 mb-4">Notifications</Text>

      {/* Daily Reminders */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-base font-medium text-gray-900">Daily Reminders</Text>
          <Switch
            value={localSettings.dailyRemindersEnabled}
            onValueChange={handleToggleReminders}
            disabled={isUpdating}
            trackColor={{ false: "#D1D5DB", true: "#007AFF" }}
            thumbColor="#FFFFFF"
          />
        </View>
        <Text className="text-sm text-gray-600 mb-4">Receive daily reminders to complete your morning routine</Text>

        {localSettings.dailyRemindersEnabled && (
          <View className="space-y-4">
            <Text className="text-sm font-medium text-gray-700">
              Remind me {localSettings.reminderOffset} minutes after wake time
            </Text>

            <Slider
              minimumValue={30}
              maximumValue={180}
              step={5}
              value={localSettings.reminderOffset}
              onValueChange={handleSliderChange}
              onSlidingComplete={handleSliderComplete}
              minimumTrackTintColor="#007AFF"
              maximumTrackTintColor="#D1D5DB"
              thumbTintColor="#007AFF"
              disabled={isUpdating}
            />

            <View className="flex-row justify-between">
              <Text className="text-xs text-gray-500">30 min</Text>
              <Text className="text-xs text-gray-500">180 min</Text>
            </View>

            <View className="bg-blue-50 p-4 rounded-xl">
              <Text className="text-sm text-blue-800">
                Your reminder will be sent at approximately{" "}
                <Text className="font-semibold">{reminderTimeFormatted}</Text> each day
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Weekly Reports */}
      <View>
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-base font-medium text-gray-900">Weekly Reports</Text>
          <Switch
            value={localSettings.weeklyReportsEnabled}
            onValueChange={handleToggleWeeklyReports}
            disabled={isUpdating}
            trackColor={{ false: "#D1D5DB", true: "#007AFF" }}
            thumbColor="#FFFFFF"
          />
        </View>
        <Text className="text-sm text-gray-600 mb-4">Receive a weekly summary of your progress</Text>

        {localSettings.weeklyReportsEnabled && (
          <View className="space-y-2">
            <Text className="text-sm font-medium text-gray-700">Send report on:</Text>

            <View className="flex-row space-x-2">
              <TouchableOpacity
                className={`py-2 px-4 rounded-lg ${
                  localSettings.weeklyReportDay === "monday" ? "bg-blue-500" : "bg-gray-200"
                }`}
                onPress={() => handleWeeklyReportDayChange("monday")}
                disabled={isUpdating}
                activeOpacity={0.7}
              >
                <Text
                  className={`font-medium ${
                    localSettings.weeklyReportDay === "monday" ? "text-white" : "text-gray-800"
                  }`}
                >
                  Monday
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`py-2 px-4 rounded-lg ${
                  localSettings.weeklyReportDay === "friday" ? "bg-blue-500" : "bg-gray-200"
                }`}
                onPress={() => handleWeeklyReportDayChange("friday")}
                disabled={isUpdating}
                activeOpacity={0.7}
              >
                <Text
                  className={`font-medium ${
                    localSettings.weeklyReportDay === "friday" ? "text-white" : "text-gray-800"
                  }`}
                >
                  Friday
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`py-2 px-4 rounded-lg ${
                  localSettings.weeklyReportDay === "sunday" ? "bg-blue-500" : "bg-gray-200"
                }`}
                onPress={() => handleWeeklyReportDayChange("sunday")}
                disabled={isUpdating}
                activeOpacity={0.7}
              >
                <Text
                  className={`font-medium ${
                    localSettings.weeklyReportDay === "sunday" ? "text-white" : "text-gray-800"
                  }`}
                >
                  Sunday
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}
