import type React from "react"
import { View } from "../utils/react-native-web"
import { BodySmall } from "./typography"

interface ProgressBarProps {
  progress: number
  showPercentage?: boolean
  height?: number
  className?: string
  color?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  showPercentage = false,
  height = 8,
  className = "",
  color = "#007AFF",
}) => {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100)

  return (
    <View className={`relative ${className}`}>
      <View className="bg-gray-200 rounded-full overflow-hidden" style={{ height: `${height}px` }}>
        <View
          className="h-full rounded-full"
          style={{
            width: `${clampedProgress}%`,
            backgroundColor: color,
            transition: "width 0.5s ease-in-out",
          }}
        />
      </View>

      {showPercentage && (
        <BodySmall className="text-gray-600 mt-1 text-right">{Math.round(clampedProgress)}%</BodySmall>
      )}
    </View>
  )
}

interface TaskDotsProps {
  tasks: {
    drinkWater: boolean
    noSocialMedia: boolean
    sunlightExposure: boolean
    elephantTask: boolean
  } | null
}

export const TaskDots: React.FC<TaskDotsProps> = ({ tasks }) => {
  if (!tasks) {
    return (
      <View className="flex-row space-x-1">
        <View className="w-2 h-2 rounded-full bg-gray-300" />
        <View className="w-2 h-2 rounded-full bg-gray-300" />
        <View className="w-2 h-2 rounded-full bg-gray-300" />
        <View className="w-2 h-2 rounded-full bg-gray-300" />
      </View>
    )
  }

  return (
    <View className="flex-row space-x-1">
      <View className={`w-2 h-2 rounded-full ${tasks.drinkWater ? "bg-blue-500" : "bg-gray-300"}`} />
      <View className={`w-2 h-2 rounded-full ${tasks.noSocialMedia ? "bg-red-500" : "bg-gray-300"}`} />
      <View className={`w-2 h-2 rounded-full ${tasks.sunlightExposure ? "bg-yellow-400" : "bg-gray-300"}`} />
      <View className={`w-2 h-2 rounded-full ${tasks.elephantTask ? "bg-green-500" : "bg-gray-300"}`} />
    </View>
  )
}

interface CircularProgressProps {
  progress: number
  size?: number
  strokeWidth?: number
  className?: string
  color?: string
  backgroundColor?: string
  children?: React.ReactNode
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 100,
  strokeWidth = 10,
  className = "",
  color = "#007AFF",
  backgroundColor = "#E5E7EB",
  children,
}) => {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100)

  // Calculate SVG parameters
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference

  return (
    <View className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={backgroundColor} strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
        />
      </svg>
      {children && <View className="absolute inset-0 flex items-center justify-center">{children}</View>}
    </View>
  )
}

interface StepIndicatorProps {
  steps: number
  currentStep: number
  className?: string
  activeColor?: string
  inactiveColor?: string
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  className = "",
  activeColor = "#007AFF",
  inactiveColor = "#E5E7EB",
}) => {
  return (
    <View className={`flex-row justify-center space-x-2 ${className}`}>
      {Array.from({ length: steps }).map((_, index) => (
        <View
          key={index}
          className="rounded-full"
          style={{
            width: 8,
            height: 8,
            backgroundColor: index < currentStep ? activeColor : inactiveColor,
          }}
        />
      ))}
    </View>
  )
}
