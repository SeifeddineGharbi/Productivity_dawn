import type React from "react"
import { TouchableOpacity, type TouchableOpacityProps, ActivityIndicator, View, Text } from "react-native"
import { Body } from "./typography"

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "ghost" | "danger"
  size?: "small" | "medium" | "large"
  loading?: boolean
  fullWidth?: boolean
  className?: string
}

const getButtonClasses = (variant: string, size: string, fullWidth: boolean, disabled: boolean) => {
  const baseClasses = "items-center justify-center rounded-xl"

  // Size classes
  const sizeClasses = {
    small: "py-2 px-4",
    medium: "py-3 px-6",
    large: "py-4 px-8",
  }

  // Variant classes
  const variantClasses = {
    primary: disabled ? "bg-gray-300" : "bg-primary-500 active:bg-primary-600 shadow-md",
    secondary: disabled
      ? "border-2 border-gray-300 bg-white"
      : "border-2 border-primary-500 bg-white active:bg-primary-50",
    ghost: disabled ? "bg-transparent" : "bg-transparent active:bg-gray-100",
    danger: disabled ? "bg-gray-300" : "bg-red-500 active:bg-red-600 shadow-md",
  }

  const widthClass = fullWidth ? "w-full" : ""

  return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass}`
}

const getTextClasses = (variant: string, disabled: boolean) => {
  const textClasses = {
    primary: disabled ? "text-gray-500" : "text-white font-semibold",
    secondary: disabled ? "text-gray-400" : "text-primary-500 font-semibold",
    ghost: disabled ? "text-gray-400" : "text-primary-500 font-medium",
    danger: disabled ? "text-gray-500" : "text-white font-semibold",
  }

  return textClasses[variant]
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  loading = false,
  fullWidth = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const isDisabled = disabled || loading

  return (
    <TouchableOpacity
      className={`${getButtonClasses(variant, size, fullWidth, isDisabled)} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" || variant === "danger" ? "white" : "#007AFF"} size="small" />
      ) : (
        <Body className={getTextClasses(variant, isDisabled)}>{children}</Body>
      )}
    </TouchableOpacity>
  )
}

// Specialized Buttons for App
export const PrimaryButton: React.FC<Omit<ButtonProps, "variant">> = (props) => <Button variant="primary" {...props} />

export const SecondaryButton: React.FC<Omit<ButtonProps, "variant">> = (props) => (
  <Button variant="secondary" {...props} />
)

export const GhostButton: React.FC<Omit<ButtonProps, "variant">> = (props) => <Button variant="ghost" {...props} />

// Task Completion Button
export const TaskButton: React.FC<{
  completed: boolean
  onPress: () => void
  children: React.ReactNode
  taskColor: string
}> = ({ completed, onPress, children, taskColor }) => (
  <TouchableOpacity
    className={`flex-row items-center p-4 rounded-xl mb-2 border ${
      completed ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
    } shadow-sm active:scale-95`}
    onPress={onPress}
  >
    <View
      className={`w-6 h-6 rounded-full mr-4 items-center justify-center ${
        completed ? "bg-green-500" : "border-2 border-gray-300"
      }`}
      style={{ backgroundColor: completed ? taskColor : "transparent" }}
    >
      {completed && <Text className="text-white text-xs font-bold">✓</Text>}
    </View>
    <Body className="flex-1">{children}</Body>
  </TouchableOpacity>
)
