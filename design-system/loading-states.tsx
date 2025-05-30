import type React from "react"
import { View, ActivityIndicator } from "react-native"
import { Body } from "./typography"

interface LoadingProps {
  size?: "small" | "large"
  color?: string
  text?: string
  className?: string
}

export const Loading: React.FC<LoadingProps> = ({ size = "large", color = "#007AFF", text, className = "" }) => (
  <View className={`items-center justify-center ${className}`}>
    <ActivityIndicator size={size} color={color} />
    {text && <Body className="text-gray-600 mt-2 text-center">{text}</Body>}
  </View>
)

// Full Screen Loading
export const FullScreenLoading: React.FC<{ text?: string }> = ({ text = "Loading..." }) => (
  <View className="flex-1 items-center justify-center bg-white">
    <Loading text={text} />
  </View>
)

// Button Loading State
export const ButtonLoading: React.FC<{ color?: string }> = ({ color = "white" }) => (
  <ActivityIndicator size="small" color={color} />
)

// Skeleton Loading Components
export const SkeletonBox: React.FC<{
  width?: string
  height?: string
  className?: string
}> = ({ width = "w-full", height = "h-4", className = "" }) => (
  <View className={`${width} ${height} bg-gray-200 rounded animate-pulse ${className}`} />
)

export const SkeletonText: React.FC<{
  lines?: number
  className?: string
}> = ({ lines = 3, className = "" }) => (
  <View className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <SkeletonBox key={index} width={index === lines - 1 ? "w-3/4" : "w-full"} height="h-4" />
    ))}
  </View>
)

// Task Loading Skeleton
export const TaskSkeleton: React.FC = () => (
  <View className="p-4 rounded-xl bg-white border border-gray-200 mb-2">
    <View className="flex-row items-center">
      <SkeletonBox width="w-6" height="h-6" className="rounded-full mr-4" />
      <SkeletonBox width="w-32" height="h-4" />
    </View>
  </View>
)
