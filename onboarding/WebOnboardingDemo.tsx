"use client"

import { useState } from "react"

export const WebOnboardingDemo = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})

  const questions = [
    {
      id: "name",
      title: "What's your name?",
      type: "text",
      placeholder: "Enter your name",
    },
    {
      id: "goals",
      title: "What are your main goals?",
      type: "multiple",
      options: [
        "🏃‍♂️ Exercise regularly",
        "📚 Read more books",
        "🧘‍♀️ Practice mindfulness",
        "💼 Be more productive",
        "🌱 Build healthy habits",
      ],
    },
    {
      id: "wakeTime",
      title: "What time do you usually wake up?",
      type: "time",
    },
    {
      id: "experience",
      title: "How experienced are you with morning routines?",
      type: "single",
      options: ["🌱 Complete beginner", "📈 Some experience", "🎯 Pretty experienced", "🏆 Morning routine master"],
    },
  ]

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateAnswer = (value: any) => {
    setAnswers({ ...answers, [currentQuestion.id]: value })
  }

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "text":
        return (
          <input
            type="text"
            value={answers[currentQuestion.id] || ""}
            onChange={(e) => updateAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        )

      case "multiple":
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  const current = answers[currentQuestion.id] || []
                  const updated = current.includes(option)
                    ? current.filter((item: string) => item !== option)
                    : [...current, option]
                  updateAnswer(updated)
                }}
                className={`w-full p-4 text-left rounded-xl border-2 transition-colors ${
                  (answers[currentQuestion.id] || []).includes(option)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )

      case "single":
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => updateAnswer(option)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-colors ${
                  answers[currentQuestion.id] === option
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )

      case "time":
        return (
          <input
            type="time"
            value={answers[currentQuestion.id] || "07:00"}
            onChange={(e) => updateAnswer(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        )

      default:
        return null
    }
  }

  if (currentStep >= questions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-xl">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">You're all set!</h2>
          <p className="text-gray-600 mb-8">
            Your personalized morning routine is ready. Let's start building better habits!
          </p>
          <button className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors">
            Start My Journey
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>
              Question {currentStep + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{currentQuestion.title}</h2>
          {renderQuestion()}
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!answers[currentQuestion.id]}
            className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  )
}
