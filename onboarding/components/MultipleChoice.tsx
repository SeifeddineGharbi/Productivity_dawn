import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import type { MultipleChoiceProps } from "../types"

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({ options, value, onChange, disabled = false }) => {
  return (
    <View className="space-y-3 w-full">
      {options?.map((option) => (
        <TouchableOpacity
          key={option.id}
          className={`
            p-4 rounded-xl border-2 flex-row items-center
            ${value === option.id ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}
            ${disabled ? "opacity-50" : "active:bg-gray-50"}
          `}
          onPress={() => !disabled && onChange(option.id)}
          disabled={disabled}
          activeOpacity={0.8}
        >
          <View
            className={`
              w-6 h-6 rounded-full border-2 mr-4 items-center justify-center
              ${value === option.id ? "border-blue-500 bg-blue-500" : "border-gray-300"}
            `}
          >
            {value === option.id && <Text className="text-white text-xs font-bold">✓</Text>}
          </View>

          <View className="flex-row items-center">
            <Text className="text-xl mr-2">{option.emoji}</Text>
            <Text className="text-base text-gray-800">{option.text}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}
