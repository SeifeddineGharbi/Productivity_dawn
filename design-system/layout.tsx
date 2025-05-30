import type React from "react"
import { View, ScrollView, SafeAreaView } from "../utils/react-native-web"
import { H3 } from "./typography"

// Safe Area Container
export const SafeContainer: React.FC<React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }> = ({
  children,
  className = "",
  ...props
}) => (
  <SafeAreaView className={`flex-1 bg-background ${className}`} {...props}>
    {children}
  </SafeAreaView>
)

// Screen Container
export const Screen: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode
    scrollable?: boolean
    padding?: boolean
  }
> = ({ children, scrollable = false, padding = true, className = "", ...props }) => {
  const paddingClass = padding ? "p-4" : ""
  const containerClass = `flex-1 bg-background ${paddingClass} ${className}`

  if (scrollable) {
    return (
      <SafeContainer>
        <ScrollView className={containerClass} showsVerticalScrollIndicator={false} {...props}>
          {children}
        </ScrollView>
      </SafeContainer>
    )
  }

  return (
    <SafeContainer>
      <View className={containerClass} {...props}>
        {children}
      </View>
    </SafeContainer>
  )
}

// Header Component
export const Header: React.FC<{
  title?: string
  leftAction?: React.ReactNode
  rightAction?: React.ReactNode
  className?: string
}> = ({ title, leftAction, rightAction, className = "" }) => (
  <View className={`flex-row items-center justify-between p-4 bg-white border-b border-gray-200 ${className}`}>
    <View className="w-16">{leftAction}</View>

    {title && <H3 className="flex-1 text-center">{title}</H3>}

    <View className="w-16 items-end">{rightAction}</View>
  </View>
)

// Section Container
export const Section: React.FC<{
  children: React.ReactNode
  title?: string
  className?: string
}> = ({ children, title, className = "" }) => (
  <View className={`mb-6 ${className}`}>
    {title && <H3 className="mb-4">{title}</H3>}
    {children}
  </View>
)

// Row Layout
export const Row: React.FC<{
  children: React.ReactNode
  align?: "start" | "center" | "end" | "between" | "around"
  className?: string
}> = ({ children, align = "start", className = "" }) => {
  const alignClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
  }

  return <View className={`flex-row items-center ${alignClasses[align]} ${className}`}>{children}</View>
}

// Column Layout
export const Column: React.FC<{
  children: React.ReactNode
  align?: "start" | "center" | "end" | "between" | "around"
  className?: string
}> = ({ children, align = "start", className = "" }) => {
  const alignClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
  }

  return <View className={`flex-col ${alignClasses[align]} ${className}`}>{children}</View>
}

// Spacer Component
export const Spacer: React.FC<{
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  direction?: "vertical" | "horizontal"
}> = ({ size = "md", direction = "vertical" }) => {
  const sizeClasses = {
    xs: direction === "vertical" ? "h-1" : "w-1",
    sm: direction === "vertical" ? "h-2" : "w-2",
    md: direction === "vertical" ? "h-4" : "w-4",
    lg: direction === "vertical" ? "h-6" : "w-6",
    xl: direction === "vertical" ? "h-8" : "w-8",
  }

  return <View className={sizeClasses[size]} />
}
