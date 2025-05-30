import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import type { GenderPickerProps } from "../types"

export const GenderPicker: React.FC<GenderPickerProps> = ({ value, onChange }) => {
  const options = [
    { id: "male", label: "Male", emoji: "👨" },
    { id: "female", label: "Female", emoji: "👩" },
    { id: "non_binary", label: "Non-binary", emoji: "🧑" },
    { id: "prefer_not_to_say", label: "Prefer not to say", emoji: "🤐" },
  ]

  return (
    <View className="space-y-2">
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          className={`
            p-4 rounded-xl border-2 flex-row items-center
            ${value === option.id ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}
            active:bg-gray-50
          `}
          onPress={() => onChange(option.id as any)}
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
            <Text className="text-base text-gray-800">{option.label}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}
