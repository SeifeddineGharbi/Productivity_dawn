import type React from "react"
import { View } from "../utils/react-native-web"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: "default" | "elevated" | "outlined"
  padding?: "none" | "small" | "medium" | "large"
  className?: string
}

const getCardClasses = (variant: string, padding: string) => {
  const baseClasses = "rounded-2xl"

  const variantClasses = {
    default: "bg-white",
    elevated: "bg-white shadow-md",
    outlined: "bg-white border border-gray-200",
  }

  const paddingClasses = {
    none: "",
    small: "p-3",
    medium: "p-4",
    large: "p-6",
  }

  return `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]}`
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "elevated",
  padding = "medium",
  className = "",
  ...props
}) => (
  <View className={`${getCardClasses(variant, padding)} ${className}`} {...props}>
    {children}
  </View>
)

// Specialized Cards for App
export const TaskCard: React.FC<{
  children: React.ReactNode
  completed?: boolean
  className?: string
}> = ({ children, completed = false, className = "" }) => (
  <Card
    variant="elevated"
    className={`
      ${completed ? "bg-green-50 border border-green-200" : "bg-white"}
      ${className}
    `}
  >
    {children}
  </Card>
)

export const WeeklyProgressCard: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = "" }) => (
  <Card variant="elevated" padding="large" className={className}>
    {children}
  </Card>
)

export const OnboardingCard: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = "" }) => (
  <Card variant="elevated" padding="large" className={`mx-4 ${className}`}>
    {children}
  </Card>
)

export const PaywallCard: React.FC<{
  children: React.ReactNode
  featured?: boolean
  className?: string
}> = ({ children, featured = false, className = "" }) => (
  <Card
    variant="elevated"
    padding="large"
    className={`
      ${featured ? "border-2 border-primary-500 bg-primary-50" : "border border-gray-200"}
      ${className}
    `}
  >
    {children}
  </Card>
)
