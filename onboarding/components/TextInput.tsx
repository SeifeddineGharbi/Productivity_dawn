"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, TextInput as RNTextInput } from "react-native"
import type { TextInputProps } from "../types"

export const TextInput: React.FC<TextInputProps> = ({ value, onChange, placeholder, disabled = false, error }) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View className="w-full">
      <RNTextInput
        className={`
          px-4 py-4 rounded-xl border-2 text-base
          ${error ? "border-red-300 bg-red-50" : isFocused ? "border-blue-500 bg-white" : "border-gray-300 bg-white"}
          ${disabled ? "opacity-50" : ""}
        `}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder || "Enter your answer"}
        placeholderTextColor="#9CA3AF"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        editable={!disabled}
      />

      {error && <Text className="text-red-500 text-sm mt-2">{error}</Text>}
    </View>
  )
}
