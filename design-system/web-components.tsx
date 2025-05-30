"use client"

import type React from "react"

// Web-compatible versions of React Native components for Next.js preview

export const SafeAreaView: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = "" }) => <div className={`min-h-screen ${className}`}>{children}</div>

export const ScrollView: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = "" }) => <div className={`overflow-y-auto ${className}`}>{children}</div>

export const View: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = "" }) => <div className={className}>{children}</div>

export const Text: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = "" }) => <span className={className}>{children}</span>

export const TouchableOpacity: React.FC<{
  children: React.ReactNode
  className?: string
  onPress?: () => void
  disabled?: boolean
}> = ({ children, className = "", onPress, disabled }) => (
  <button
    className={`${className} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    onClick={onPress}
    disabled={disabled}
  >
    {children}
  </button>
)

export const ActivityIndicator: React.FC<{
  size?: "small" | "large"
  color?: string
  className?: string
}> = ({ size = "small", color = "currentColor", className = "" }) => (
  <div
    className={`animate-spin rounded-full border-2 border-t-transparent ${
      size === "large" ? "h-8 w-8" : "h-4 w-4"
    } ${className}`}
    style={{ borderColor: `${color} transparent transparent transparent` }}
  />
)
