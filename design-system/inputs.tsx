"use client"

import type React from "react"
import { useState } from "react"
import { View, TextInput, TouchableOpacity } from "../utils/react-native-web"
import { Label, BodySmall, Body } from "./typography"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  required?: boolean
  className?: string
  onChangeText?: (text: string) => void
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  required = false,
  className = "",
  onChangeText,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View className={`mb-4 ${className}`}>
      {label && (
        <Label className="mb-2">
          {label}
          {required && <BodySmall className="text-red-500"> *</BodySmall>}
        </Label>
      )}

      <TextInput
        className={`
          px-4 py-3 rounded-xl border text-base
          ${error ? "border-red-300 bg-red-50" : isFocused ? "border-primary-500 bg-white" : "border-gray-300 bg-white"}
        `}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor="#9CA3AF"
        onChangeText={onChangeText}
        {...props}
      />

      {error && <BodySmall className="text-red-500 mt-1">{error}</BodySmall>}

      {hint && !error && <BodySmall className="text-gray-500 mt-1">{hint}</BodySmall>}
    </View>
  )
}

// Password Input with Strength Indicator
export const PasswordInput: React.FC<
  InputProps & {
    showStrength?: boolean
    strength?: number
  }
> = ({ showStrength = false, strength = 0, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)

  const getStrengthColor = (strength: number) => {
    if (strength < 2) return "bg-red-500"
    if (strength < 3) return "bg-yellow-500"
    if (strength < 4) return "bg-blue-500"
    return "bg-green-500"
  }

  const getStrengthText = (strength: number) => {
    if (strength < 2) return "Weak"
    if (strength < 3) return "Fair"
    if (strength < 4) return "Good"
    return "Strong"
  }

  return (
    <View>
      <View className="relative">
        <Input {...props} secureTextEntry={!showPassword} />
        <TouchableOpacity
          className="absolute right-4 top-1/2 -translate-y-1/2"
          onPress={() => setShowPassword(!showPassword)}
        >
          <BodySmall className="text-primary-500">{showPassword ? "Hide" : "Show"}</BodySmall>
        </TouchableOpacity>
      </View>

      {showStrength && (
        <View className="mt-2">
          <View className="flex-row space-x-1 mb-1">
            {[1, 2, 3, 4].map((level) => (
              <View
                key={level}
                className={`flex-1 h-1 rounded ${level <= strength ? getStrengthColor(strength) : "bg-gray-200"}`}
              />
            ))}
          </View>
          <BodySmall className="text-gray-600">Password strength: {getStrengthText(strength)}</BodySmall>
        </View>
      )}
    </View>
  )
}

// Time Picker Input
export const TimePickerInput: React.FC<{
  label: string
  value: { hour: number; minute: number }
  onChange: (time: { hour: number; minute: number }) => void
  error?: string
}> = ({ label, value, onChange, error }) => {
  const [showPicker, setShowPicker] = useState(false)

  const formatTime = (hour: number, minute: number) => {
    const period = hour >= 12 ? "PM" : "AM"
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    const displayMinute = minute.toString().padStart(2, "0")
    return `${displayHour}:${displayMinute} ${period}`
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":").map(Number)
    onChange({ hour: hours, minute: minutes })
  }

  return (
    <View className="mb-4">
      <Label className="mb-2">{label}</Label>

      <TouchableOpacity
        className={`
          px-4 py-3 rounded-xl border flex-row items-center justify-between
          ${error ? "border-red-300 bg-red-50" : "border-gray-300 bg-white"}
        `}
        onPress={() => setShowPicker(true)}
      >
        <Body>{formatTime(value.hour, value.minute)}</Body>
        <Body className="text-gray-400">▼</Body>
      </TouchableOpacity>

      {error && <BodySmall className="text-red-500 mt-1">{error}</BodySmall>}

      {showPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg">
            <input
              type="time"
              value={`${value.hour.toString().padStart(2, "0")}:${value.minute.toString().padStart(2, "0")}`}
              onChange={handleTimeChange}
              className="mb-4"
            />
            <div className="flex justify-end">
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setShowPicker(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </View>
  )
}
