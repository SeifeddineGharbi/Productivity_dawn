"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, Modal, Platform } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import type { TimePickerProps, TimeValue } from "../types"
import { settingsService } from "../settings-service"

export const TimePicker: React.FC<TimePickerProps> = ({ value, onChange, label, error }) => {
  const [showPicker, setShowPicker] = useState(false)

  // Convert TimeValue to Date
  const getDateFromTimeValue = (timeValue: TimeValue): Date => {
    const date = new Date()
    date.setHours(timeValue.hour)
    date.setMinutes(timeValue.minute)
    return date
  }

  // Convert Date to TimeValue
  const getTimeValueFromDate = (date: Date): TimeValue => {
    return {
      hour: date.getHours(),
      minute: date.getMinutes(),
    }
  }

  const handleChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false)
    }

    if (selectedDate) {
      onChange(getTimeValueFromDate(selectedDate))
    }
  }

  return (
    <View className="mb-6">
      <Text className="text-sm font-medium text-gray-700 mb-2">{label}</Text>
      <TouchableOpacity
        className={`
          px-4 py-4 rounded-xl border flex-row items-center justify-between
          ${error ? "border-red-300 bg-red-50" : "border-gray-300 bg-white active:bg-gray-50"}
        `}
        onPress={() => setShowPicker(true)}
        activeOpacity={0.8}
      >
        <Text className="text-base text-gray-800">{settingsService.formatTime(value)}</Text>
        <Text className="text-gray-400">▼</Text>
      </TouchableOpacity>
      {error && <Text className="text-red-600 text-sm mt-1">{error}</Text>}

      {showPicker &&
        (Platform.OS === "ios" ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={showPicker}
            onRequestClose={() => setShowPicker(false)}
          >
            <View className="flex-1 justify-end bg-black bg-opacity-30">
              <View className="bg-white rounded-t-xl">
                <View className="flex-row justify-between p-4 border-b border-gray-200">
                  <TouchableOpacity onPress={() => setShowPicker(false)}>
                    <Text className="text-blue-500 font-medium">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setShowPicker(false)}>
                    <Text className="text-blue-500 font-medium">Done</Text>
                  </TouchableOpacity>
                </View>

                <DateTimePicker
                  value={getDateFromTimeValue(value)}
                  mode="time"
                  display="spinner"
                  onChange={handleChange}
                  style={{ height: 200 }}
                />
              </View>
            </View>
          </Modal>
        ) : (
          <DateTimePicker value={getDateFromTimeValue(value)} mode="time" display="default" onChange={handleChange} />
        ))}
    </View>
  )
}
