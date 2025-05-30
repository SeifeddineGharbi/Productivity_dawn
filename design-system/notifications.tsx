"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { View, TouchableOpacity } from "react-native"
import { Body, BodySmall } from "./typography"

interface NotificationProps {
  type: "success" | "error" | "warning" | "info"
  title?: string
  message: string
  duration?: number
  onDismiss?: () => void
  action?: {
    text: string
    onPress: () => void
  }
}

export const Notification: React.FC<NotificationProps> = ({
  type,
  title,
  message,
  duration = 5000,
  onDismiss,
  action,
}) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false)
        onDismiss?.()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration, onDismiss])

  if (!visible) return null

  const getNotificationClasses = (type: string) => {
    const classes = {
      success: "bg-green-50 border-green-200",
      error: "bg-red-50 border-red-200",
      warning: "bg-yellow-50 border-yellow-200",
      info: "bg-blue-50 border-blue-200",
    }
    return classes[type]
  }

  const getIconColor = (type: string) => {
    const colors = {
      success: "text-green-600",
      error: "text-red-600",
      warning: "text-yellow-600",
      info: "text-blue-600",
    }
    return colors[type]
  }

  const getIcon = (type: string) => {
    const icons = {
      success: "✓",
      error: "✕",
      warning: "⚠",
      info: "ℹ",
    }
    return icons[type]
  }

  return (
    <View
      className={`
      p-4 rounded-xl border flex-row items-start space-x-3 mb-2
      ${getNotificationClasses(type)}
    `}
    >
      <Body className={`${getIconColor(type)} font-bold`}>{getIcon(type)}</Body>

      <View className="flex-1">
        {title && <Body className="font-semibold mb-1">{title}</Body>}
        <BodySmall className="text-gray-700">{message}</BodySmall>
      </View>

      <View className="flex-row space-x-2">
        {action && (
          <TouchableOpacity onPress={action.onPress}>
            <BodySmall className="text-primary-500 font-medium">{action.text}</BodySmall>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => {
            setVisible(false)
            onDismiss?.()
          }}
        >
          <BodySmall className="text-gray-500">✕</BodySmall>
        </TouchableOpacity>
      </View>
    </View>
  )
}

// Toast Notification (appears at top)
export const Toast: React.FC<NotificationProps> = (props) => (
  <View className="absolute top-12 left-4 right-4 z-50">
    <Notification {...props} />
  </View>
)

// Banner Notification (inline)
export const Banner: React.FC<NotificationProps> = (props) => <Notification {...props} />

// Offline Indicator
export const OfflineIndicator: React.FC<{ visible: boolean }> = ({ visible }) => {
  if (!visible) return null

  return (
    <View className="bg-gray-800 p-2">
      <BodySmall className="text-white text-center">No internet connection</BodySmall>
    </View>
  )
}

// Sync Status Indicator
export const SyncStatus: React.FC<{
  status: "syncing" | "synced" | "error"
  className?: string
}> = ({ status, className = "" }) => {
  const getStatusConfig = (status: string) => {
    const configs = {
      syncing: { text: "Syncing...", color: "text-blue-600", icon: "⟳" },
      synced: { text: "Synced", color: "text-green-600", icon: "✓" },
      error: { text: "Sync failed", color: "text-red-600", icon: "⚠" },
    }
    return configs[status]
  }

  const config = getStatusConfig(status)

  return (
    <View className={`flex-row items-center space-x-1 ${className}`}>
      <BodySmall className={config.color}>{config.icon}</BodySmall>
      <BodySmall className={config.color}>{config.text}</BodySmall>
    </View>
  )
}
