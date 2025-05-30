"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, Modal, Platform } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import type { TimePickerProps, TimeValue } from "../types"

export const TimePicker: React.FC<TimePickerProps> = ({ value, onChange, disabled = false }) => {
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

  // Format time for display
  const formatTime = (time: TimeValue): string => {
    const date = getDateFromTimeValue(time)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
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
    <View className="w-full">
      <TouchableOpacity
        className={`
          px-4 py-4 rounded-xl border-2 flex-row items-center justify-between
          ${disabled ? "opacity-50 border-gray-300 bg-gray-50" : "border-gray-300 bg-white active:bg-gray-50"}
        `}
        onPress={() => !disabled && setShowPicker(true)}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Text className="text-base text-gray-800">{formatTime(value)}</Text>
        <Text className="text-gray-400">▼</Text>
      </TouchableOpacity>

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
