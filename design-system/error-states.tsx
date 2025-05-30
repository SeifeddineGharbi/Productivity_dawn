import type React from "react"
import { View } from "react-native"
import { H3, Body } from "./typography"
import { Button } from "./buttons"

interface ErrorStateProps {
  title?: string
  message?: string
  actionText?: string
  onAction?: () => void
  icon?: React.ReactNode
  className?: string
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message = "Please try again later.",
  actionText = "Try Again",
  onAction,
  icon,
  className = "",
}) => (
  <View className={`items-center justify-center p-6 ${className}`}>
    {icon && <View className="mb-4">{icon}</View>}

    <H3 className="text-center mb-2">{title}</H3>
    <Body className="text-gray-600 text-center mb-6">{message}</Body>

    {onAction && (
      <Button onPress={onAction} variant="primary">
        {actionText}
      </Button>
    )}
  </View>
)

// Network Error
export const NetworkError: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => (
  <ErrorState
    title="No Internet Connection"
    message="Please check your network connection and try again."
    actionText="Try Again"
    onAction={onRetry}
    icon={
      <View className="w-16 h-16 bg-gray-100 rounded-full items-center justify-center">
        <Body className="text-2xl">📶</Body>
      </View>
    }
  />
)

// Authentication Error
export const AuthError: React.FC<{ onSignIn?: () => void }> = ({ onSignIn }) => (
  <ErrorState
    title="Session Expired"
    message="Your session has expired. Please sign in again."
    actionText="Sign In Again"
    onAction={onSignIn}
    icon={
      <View className="w-16 h-16 bg-red-100 rounded-full items-center justify-center">
        <Body className="text-2xl">🔒</Body>
      </View>
    }
  />
)

// Payment Error
export const PaymentError: React.FC<{
  onRetry?: () => void
  errorMessage?: string
}> = ({ onRetry, errorMessage = "Payment method declined. Please try a different card." }) => (
  <ErrorState
    title="Payment Failed"
    message={errorMessage}
    actionText="Try Again"
    onAction={onRetry}
    icon={
      <View className="w-16 h-16 bg-red-100 rounded-full items-center justify-center">
        <Body className="text-2xl">💳</Body>
      </View>
    }
  />
)

// Empty State
export const EmptyState: React.FC<{
  title: string
  message: string
  actionText?: string
  onAction?: () => void
  icon?: React.ReactNode
}> = ({ title, message, actionText, onAction, icon }) => (
  <View className="items-center justify-center p-8">
    {icon && <View className="mb-4">{icon}</View>}

    <H3 className="text-center mb-2">{title}</H3>
    <Body className="text-gray-600 text-center mb-6">{message}</Body>

    {actionText && onAction && (
      <Button onPress={onAction} variant="primary">
        {actionText}
      </Button>
    )}
  </View>
)
