"use client"

import type React from "react"
import { useState } from "react"
import { View, TouchableOpacity } from "react-native"
import {
  Screen,
  Header,
  Section,
  Card,
  H1,
  H3,
  Body,
  PrimaryButton,
  SecondaryButton,
  TaskButton,
  ProgressBar,
  TaskDots,
  designTokens,
} from "../design-system"

// Example of how to use the design system in the actual app
export const TasksScreen: React.FC = () => {
  const [tasks, setTasks] = useState({
    water: false,
    noSocial: false,
    sunlight: false,
    elephant: false,
  })

  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const toggleTask = (taskName: keyof typeof tasks) => {
    setTasks((prev) => ({
      ...prev,
      [taskName]: !prev[taskName],
    }))
  }

  const calculateScore = () => {
    const weights = {
      water: 20,
      noSocial: 30,
      sunlight: 20,
      elephant: 30,
    }

    let totalScore = 0
    Object.entries(tasks).forEach(([task, completed]) => {
      if (completed) {
        totalScore += weights[task as keyof typeof weights]
      }
    })

    return totalScore
  }

  const handleSubmit = () => {
    const finalScore = calculateScore()
    setScore(finalScore)
    setSubmitted(true)
  }

  const getMotivationalMessage = (score: number) => {
    if (score >= 90) return "CRUSHING IT! You're unstoppable!"
    if (score >= 75) return "STRONG performance! Keep building momentum!"
    if (score >= 50) return "SOLID effort! Tomorrow's your chance to level up!"
    if (score >= 30) return "PROGRESS over perfection! You're building something great!"
    return "Every CHAMPION has off days. Ready to bounce back?"
  }

  if (submitted) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <View className="w-24 h-24 bg-primary-100 rounded-full items-center justify-center mb-6">
            <Body className="text-4xl">🎉</Body>
          </View>

          <H1 className="mb-2">{score}%</H1>
          <Body className="text-center mb-6 px-4">{getMotivationalMessage(score)}</Body>

          <Card className="w-full mb-6">
            <View className="space-y-3">
              <View className="flex-row items-center justify-between">
                <Body>💧 Drink Water</Body>
                <Body className={tasks.water ? "text-green-600" : "text-gray-400"}>{tasks.water ? "✓" : "✗"}</Body>
              </View>
              <View className="flex-row items-center justify-between">
                <Body>📱 No Social Media</Body>
                <Body className={tasks.noSocial ? "text-green-600" : "text-gray-400"}>
                  {tasks.noSocial ? "✓" : "✗"}
                </Body>
              </View>
              <View className="flex-row items-center justify-between">
                <Body>☀️ Sunlight Exposure</Body>
                <Body className={tasks.sunlight ? "text-green-600" : "text-gray-400"}>
                  {tasks.sunlight ? "✓" : "✗"}
                </Body>
              </View>
              <View className="flex-row items-center justify-between">
                <Body>🐘 Elephant Task</Body>
                <Body className={tasks.elephant ? "text-green-600" : "text-gray-400"}>
                  {tasks.elephant ? "✓" : "✗"}
                </Body>
              </View>
            </View>
          </Card>

          <SecondaryButton onPress={() => setSubmitted(false)}>View Analytics</SecondaryButton>
        </View>
      </Screen>
    )
  }

  return (
    <Screen>
      <Header title="Good morning, Alex!" rightAction={<Body className="text-gray-600">⚙️</Body>} />

      <Section title="Today's Morning Plan">
        <Card>
          <View className="space-y-3">
            <TaskButton
              completed={tasks.water}
              onPress={() => toggleTask("water")}
              taskColor={designTokens.colors.task.water}
            >
              💧 Drink Water
            </TaskButton>

            <TaskButton
              completed={tasks.noSocial}
              onPress={() => toggleTask("noSocial")}
              taskColor={designTokens.colors.task.noSocial}
            >
              📱 No Social Media
            </TaskButton>

            <TaskButton
              completed={tasks.sunlight}
              onPress={() => toggleTask("sunlight")}
              taskColor={designTokens.colors.task.sunlight}
            >
              ☀️ Sunlight Exposure
            </TaskButton>

            <TaskButton
              completed={tasks.elephant}
              onPress={() => toggleTask("elephant")}
              taskColor={designTokens.colors.task.elephant}
            >
              🐘 Elephant Task
            </TaskButton>
          </View>

          <PrimaryButton onPress={handleSubmit} fullWidth className="mt-6">
            Submit Tasks
          </PrimaryButton>
        </Card>
      </Section>

      <Section title="Current Streak">
        <Card>
          <View className="items-center">
            <H3 className="mb-2">12 days</H3>
            <ProgressBar progress={75} showPercentage className="w-full" />
          </View>
        </Card>
      </Section>
    </Screen>
  )
}

// Example Analytics Screen
export const AnalyticsScreen: React.FC = () => {
  const weekData = [
    { day: "Mon", tasks: { water: true, noSocial: false, sunlight: true, elephant: true } },
    { day: "Tue", tasks: { water: true, noSocial: true, sunlight: false, elephant: true } },
    { day: "Wed", tasks: { water: false, noSocial: true, sunlight: true, elephant: false } },
    { day: "Thu", tasks: { water: true, noSocial: true, sunlight: true, elephant: true } },
    { day: "Fri", tasks: { water: true, noSocial: false, sunlight: true, elephant: true } },
    { day: "Sat", tasks: { water: false, noSocial: false, sunlight: false, elephant: false } },
    { day: "Sun", tasks: { water: true, noSocial: true, sunlight: true, elephant: true } },
  ]

  return (
    <Screen scrollable>
      <Header title="Analytics" />

      <Section title="This Week">
        <Card>
          <View className="space-y-4">
            <View className="flex-row justify-between items-center">
              <Body>← Mar 4-10</Body>
              <Body className="font-semibold">Mar 11-17</Body>
              <Body>Mar 18-24 →</Body>
            </View>

            <View className="space-y-2">
              {weekData.map((day, index) => (
                <View key={index} className="flex-row items-center justify-between">
                  <Body className="w-12">{day.day}</Body>
                  <TaskDots tasks={day.tasks} />
                </View>
              ))}
            </View>

            <View className="pt-4 border-t border-gray-200">
              <Body className="text-center">Weekly Completion: 71%</Body>
              <Body className="text-center text-gray-600">Perfect Days: 2/7</Body>
            </View>
          </View>
        </Card>
      </Section>

      <Section title="Task Breakdown">
        <Card>
          <View className="space-y-3">
            <View className="flex-row items-center justify-between">
              <Body>💧 Water: 5/7 days</Body>
              <Body className="text-blue-600">71%</Body>
            </View>
            <View className="flex-row items-center justify-between">
              <Body>📱 No Social: 4/7 days</Body>
              <Body className="text-red-600">57%</Body>
            </View>
            <View className="flex-row items-center justify-between">
              <Body>☀️ Sunlight: 5/7 days</Body>
              <Body className="text-yellow-600">71%</Body>
            </View>
            <View className="flex-row items-center justify-between">
              <Body>🐘 Elephant: 5/7 days</Body>
              <Body className="text-green-600">71%</Body>
            </View>
          </View>
        </Card>
      </Section>

      <Section title="Streaks">
        <Card>
          <View className="items-center">
            <H3 className="mb-1">Current Streak</H3>
            <H1 className="text-primary-500 mb-2">12 days</H1>
            <Body className="text-gray-600">Best Ever: 28 days</Body>
          </View>
        </Card>
      </Section>
    </Screen>
  )
}

// Example Onboarding Screen
export const OnboardingQuestionScreen: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const options = [
    { id: "male", label: "👨 Male", emoji: "👨" },
    { id: "female", label: "👩 Female", emoji: "👩" },
    { id: "non-binary", label: "🧑 Non-binary", emoji: "🧑" },
    { id: "prefer-not-to-say", label: "🤐 Prefer not to say", emoji: "🤐" },
  ]

  return (
    <Screen>
      <Header leftAction={<Body className="text-primary-500">← Back</Body>} />

      <View className="flex-1 justify-center">
        <View className="items-center mb-8">
          <View className="flex-row space-x-1 mb-2">
            {Array.from({ length: 14 }).map((_, index) => (
              <View key={index} className={`w-2 h-2 rounded-full ${index < 3 ? "bg-primary-500" : "bg-gray-300"}`} />
            ))}
          </View>
          <Body className="text-gray-600">3 of 14</Body>
        </View>

        <View className="items-center mb-8">
          <Body className="text-4xl mb-4">🧑‍🤝‍🧑</Body>
          <H1 className="text-center mb-2">How do you identify?</H1>
        </View>

        <View className="space-y-3 mb-8">
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              className={`p-4 rounded-xl border-2 flex-row items-center ${
                selectedOption === option.id ? "border-primary-500 bg-primary-50" : "border-gray-200 bg-white"
              }`}
              onPress={() => setSelectedOption(option.id)}
            >
              <View
                className={`w-6 h-6 rounded-full border-2 mr-4 items-center justify-center ${
                  selectedOption === option.id ? "border-primary-500 bg-primary-500" : "border-gray-300"
                }`}
              >
                {selectedOption === option.id && <Body className="text-white text-xs">✓</Body>}
              </View>
              <Body>{option.label}</Body>
            </TouchableOpacity>
          ))}
        </View>

        <PrimaryButton disabled={!selectedOption} fullWidth>
          Continue
        </PrimaryButton>
      </View>
    </Screen>
  )
}
