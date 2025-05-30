"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native"
import type { OnboardingContainerProps, Answer, TimeValue } from "../types"
import { onboardingQuestions } from "../questions"
import { firebaseService } from "../firebase-service"
import { validateAnswer } from "../validation"
import { QuestionTemplate } from "./QuestionTemplate"
import { ProgressAnimation } from "./ProgressAnimation"

export const OnboardingContainer: React.FC<OnboardingContainerProps> = ({ userId, onComplete, onSkip }) => {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  // Default time values
  const defaultWakeTime: TimeValue = { hour: 7, minute: 0 }
  const defaultWorkTime: TimeValue = { hour: 9, minute: 0 }

  // Initialize onboarding session
  useEffect(() => {
    const initSession = async () => {
      setIsLoading(true)
      try {
        const session = await firebaseService.getOrCreateOnboardingSession(userId)
        setSessionId(session.id)

        // Set existing answers if any
        if (session.answers) {
          setAnswers(session.answers)
        }

        // Set current step
        setCurrentStep(session.currentStep || 0)

        // Initialize default values for time pickers if not set
        if (!session.answers?.wake_time) {
          handleAnswerChange("wake_time", defaultWakeTime)
        }

        if (!session.answers?.work_start_time) {
          handleAnswerChange("work_start_time", defaultWorkTime)
        }
      } catch (error) {
        console.error("Error initializing onboarding session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initSession()
  }, [userId])

  // Get current question
  const currentQuestion = onboardingQuestions[currentStep]

  // Handle answer change
  const handleAnswerChange = async (questionId: string, value: Answer) => {
    if (!sessionId) return

    // Update local state
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))

    // Clear error
    setError(null)

    // Save to Firebase
    setIsSaving(true)
    try {
      await firebaseService.saveAnswer(sessionId, questionId, value)

      // Log analytics event
      firebaseService.logAnalyticsEvent(currentQuestion.analyticsEventName, {
        question_id: questionId,
        answer: value,
      })
    } catch (error) {
      console.error("Error saving answer:", error)
    } finally {
      setIsSaving(false)
    }
  }

  // Handle navigation
  const handleNext = async () => {
    if (!sessionId || !currentQuestion) return

    // Validate current answer
    const currentAnswer = answers[currentQuestion.id]
    const validationError = validateAnswer(
      currentQuestion.type,
      currentAnswer,
      currentQuestion.required,
      currentQuestion.validationRules,
      answers,
    )

    if (validationError) {
      setError(validationError)
      return
    }

    // If this is the last question, complete onboarding
    if (currentStep === onboardingQuestions.length - 1) {
      setIsLoading(true)
      try {
        await firebaseService.completeOnboarding(sessionId)
        setIsCompleted(true)
      } catch (error) {
        console.error("Error completing onboarding:", error)
      } finally {
        setIsLoading(false)
      }
      return
    }

    // Otherwise, go to next question
    setIsLoading(true)
    try {
      const nextStep = currentStep + 1
      await firebaseService.updateCurrentStep(sessionId, nextStep)
      setCurrentStep(nextStep)
      setError(null)
    } catch (error) {
      console.error("Error updating step:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = async () => {
    if (!sessionId || currentStep === 0) return

    setIsLoading(true)
    try {
      const prevStep = currentStep - 1
      await firebaseService.updateCurrentStep(sessionId, prevStep)
      setCurrentStep(prevStep)
      setError(null)
    } catch (error) {
      console.error("Error updating step:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSkip = () => {
    // Only allow skipping the first question
    if (currentStep === 0 && onSkip) {
      handleNext()
    }
  }

  // If completed, show completion animation
  if (isCompleted) {
    return <ProgressAnimation userName={(answers.name as string) || "there"} onContinue={onComplete} />
  }

  // Show loading state while initializing
  if (isLoading && !currentQuestion) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#007AFF" />
        <Text className="mt-4 text-gray-600">Loading your onboarding...</Text>
      </View>
    )
  }

  // Calculate progress
  const progress = ((currentStep + 1) / onboardingQuestions.length) * 100

  return (
    <ScrollView className="flex-1 bg-gray-50" contentContainerClassName="flex-grow" keyboardShouldPersistTaps="handled">
      <View className="flex-1 px-6 py-8">
        {/* Progress Bar */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-sm text-gray-600">
              {currentStep + 1} of {onboardingQuestions.length}
            </Text>
            <Text className="text-sm text-gray-600">{Math.round(progress)}%</Text>
          </View>

          <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <View className="h-full bg-blue-500 rounded-full" style={{ width: `${progress}%` }} />
          </View>
        </View>

        {/* Question */}
        {currentQuestion && (
          <QuestionTemplate
            question={currentQuestion}
            value={answers[currentQuestion.id] || null}
            onChange={(value) => handleAnswerChange(currentQuestion.id, value)}
            error={error || undefined}
            isLoading={isSaving}
          />
        )}

        {/* Navigation Buttons */}
        <View className="mt-8 space-y-4">
          <TouchableOpacity
            className={`
              py-4 px-6 rounded-xl flex-row items-center justify-center
              ${isLoading || isSaving ? "opacity-50" : ""}
              ${
                currentQuestion?.required && !answers[currentQuestion?.id] && currentStep !== 0
                  ? "bg-gray-300"
                  : "bg-blue-500 active:bg-blue-600"
              }
            `}
            onPress={handleNext}
            disabled={
              isLoading || isSaving || (currentQuestion?.required && !answers[currentQuestion?.id] && currentStep !== 0)
            }
            activeOpacity={0.8}
          >
            {isLoading || isSaving ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text className="text-white font-semibold text-base">
                {currentStep === onboardingQuestions.length - 1 ? "Complete" : "Continue"}
              </Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-between">
            {currentStep > 0 ? (
              <TouchableOpacity
                className="py-2 px-4 active:opacity-70"
                onPress={handleBack}
                disabled={isLoading || isSaving}
                activeOpacity={0.7}
              >
                <Text className="text-blue-600 font-medium">← Back</Text>
              </TouchableOpacity>
            ) : (
              <View />
            )}

            {currentStep === 0 && (
              <TouchableOpacity
                className="py-2 px-4 active:opacity-70"
                onPress={handleSkip}
                disabled={isLoading || isSaving}
                activeOpacity={0.7}
              >
                <Text className="text-gray-500 font-medium">Skip</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
