"use client"

import type React from "react"
import { View, Text } from "react-native"
import type { QuestionTemplateProps } from "../types"
import { MultipleChoice } from "./MultipleChoice"
import { TextInput } from "./TextInput"
import { TimePicker } from "./TimePicker"

export const QuestionTemplate: React.FC<QuestionTemplateProps> = ({ question, value, onChange, error, isLoading }) => {
  const renderQuestionInput = () => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <MultipleChoice
            options={question.options}
            value={value as string}
            onChange={onChange as (value: string) => void}
            disabled={isLoading}
          />
        )

      case "text-input":
        return (
          <TextInput
            value={value as string}
            onChange={onChange as (value: string) => void}
            placeholder={`Enter your ${question.id === "name" ? "name" : "answer"}`}
            disabled={isLoading}
            error={error}
          />
        )

      case "time-picker":
        return (
          <TimePicker
            value={(value as { hour: number; minute: number }) || { hour: 7, minute: 0 }}
            onChange={onChange as (value: { hour: number; minute: number }) => void}
            disabled={isLoading}
          />
        )

      default:
        return null
    }
  }

  return (
    <View className="w-full">
      <View className="items-center mb-8">
        <Text className="text-5xl mb-6">{question.emoji}</Text>
        <Text className="text-2xl font-bold text-center text-gray-900 mb-2">{question.question}</Text>

        {!question.required && <Text className="text-sm text-gray-500">(Optional)</Text>}
      </View>

      {renderQuestionInput()}

      {error && question.type !== "text-input" && (
        <Text className="text-red-500 text-sm mt-4 text-center">{error}</Text>
      )}
    </View>
  )
}
