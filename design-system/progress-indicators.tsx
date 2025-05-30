import type React from "react"
import { View } from "react-native"
import { Body, BodySmall } from "./typography"

interface ProgressBarProps {
  progress: number // 0-100
  color?: string
  backgroundColor?: string
  height?: number
  showPercentage?: boolean
  className?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = "#007AFF",
  backgroundColor = "#E5E7EB",
  height = 8,
  showPercentage = false,
  className = "",
}) => (
  <View className={className}>
    <View className="rounded-full overflow-hidden" style={{ height, backgroundColor }}>
      <View
        className="h-full rounded-full transition-all duration-300"
        style={{
          width: `${Math.min(Math.max(progress, 0), 100)}%`,
          backgroundColor: color,
        }}
      />
    </View>

    {showPercentage && <BodySmall className="text-gray-600 mt-1 text-center">{Math.round(progress)}%</BodySmall>}
  </View>
)

// Circular Progress
export const CircularProgress: React.FC<{
  progress: number // 0-100
  size?: number
  strokeWidth?: number
  color?: string
  backgroundColor?: string
  showPercentage?: boolean
}> = ({
  progress,
  size = 60,
  strokeWidth = 6,
  color = "#007AFF",
  backgroundColor = "#E5E7EB",
  showPercentage = true,
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <View className="items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="transition-all duration-500"
        />
      </svg>

      {showPercentage && <Body className="font-semibold text-gray-900">{Math.round(progress)}%</Body>}
    </View>
  )
}

// Step Progress Indicator
export const StepProgress: React.FC<{
  currentStep: number
  totalSteps: number
  className?: string
}> = ({ currentStep, totalSteps, className = "" }) => (
  <View className={`flex-row items-center justify-center space-x-2 ${className}`}>
    {Array.from({ length: totalSteps }).map((_, index) => (
      <View key={index} className={`w-2 h-2 rounded-full ${index < currentStep ? "bg-primary-500" : "bg-gray-300"}`} />
    ))}
    <BodySmall className="ml-2 text-gray-600">
      {currentStep} of {totalSteps}
    </BodySmall>
  </View>
)

// Task Completion Dots (for calendar view)
export const TaskDots: React.FC<{
  tasks: {
    water: boolean
    noSocial: boolean
    sunlight: boolean
    elephant: boolean
  }
  size?: "small" | "medium"
}> = ({ tasks, size = "medium" }) => {
  const dotSize = size === "small" ? "w-1.5 h-1.5" : "w-2 h-2"

  return (
    <View className="flex-row space-x-0.5">
      <View className={`${dotSize} rounded-full ${tasks.water ? "bg-blue-500" : "bg-gray-300"}`} />
      <View className={`${dotSize} rounded-full ${tasks.noSocial ? "bg-red-500" : "bg-gray-300"}`} />
      <View className={`${dotSize} rounded-full ${tasks.sunlight ? "bg-yellow-500" : "bg-gray-300"}`} />
      <View className={`${dotSize} rounded-full ${tasks.elephant ? "bg-green-500" : "bg-gray-300"}`} />
    </View>
  )
}
