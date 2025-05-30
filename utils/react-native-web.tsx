"use client"

import type React from "react"
import { forwardRef, useState, useEffect, useRef } from "react"

// Basic component mappings
export const View = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", style, ...props }, ref) => {
    return <div ref={ref} className={`flex ${className}`} style={style} {...props} />
  },
)

export const Text = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className = "", style, ...props }, ref) => {
    return <span ref={ref} className={`inline-block ${className}`} style={style} {...props} />
  },
)

export const ScrollView = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    horizontal?: boolean
    showsHorizontalScrollIndicator?: boolean
    showsVerticalScrollIndicator?: boolean
    contentContainerClassName?: string
  }
>(
  (
    {
      className = "",
      horizontal,
      showsHorizontalScrollIndicator,
      showsVerticalScrollIndicator,
      contentContainerClassName = "",
      style,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`overflow-auto ${horizontal ? "flex flex-row" : "flex flex-col"} ${className}`}
        style={{
          ...style,
          overflowX: horizontal ? (showsHorizontalScrollIndicator ? "auto" : "hidden") : "hidden",
          overflowY: !horizontal ? (showsVerticalScrollIndicator ? "auto" : "hidden") : "hidden",
        }}
        {...props}
      >
        <div className={`${horizontal ? "flex flex-row" : "flex flex-col"} ${contentContainerClassName}`}>
          {children}
        </div>
      </div>
    )
  },
)

export const TouchableOpacity = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { activeOpacity?: number }
>(({ className = "", activeOpacity = 0.2, disabled, onPress, style, ...props }, ref) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <button
      ref={ref}
      className={`cursor-pointer bg-transparent border-none p-0 m-0 ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      style={{
        ...style,
        opacity: isActive ? activeOpacity : 1,
        transition: "opacity 0.2s",
        WebkitTapHighlightColor: "transparent",
      }}
      disabled={disabled}
      onClick={(e) => onPress && onPress(e)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => setIsActive(false)}
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => setIsActive(false)}
      {...props}
    />
  )
})

export const TextInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    placeholderTextColor?: string
    secureTextEntry?: boolean
    autoCapitalize?: "none" | "sentences" | "words" | "characters"
    autoCorrect?: boolean
    onChangeText?: (text: string) => void
    onFocus?: () => void
    onBlur?: () => void
    editable?: boolean
  }
>(
  (
    {
      className = "",
      placeholderTextColor,
      secureTextEntry,
      autoCapitalize,
      autoCorrect,
      onChangeText,
      style,
      onFocus,
      onBlur,
      editable = true,
      ...props
    },
    ref,
  ) => {
    const inputType = secureTextEntry ? "password" : "text"

    return (
      <input
        ref={ref}
        type={inputType}
        className={`outline-none ${className}`}
        style={{
          ...style,
          textTransform:
            autoCapitalize === "characters" ? "uppercase" : autoCapitalize === "words" ? "capitalize" : "none",
        }}
        onChange={(e) => onChangeText && onChangeText(e.target.value)}
        onFocus={() => onFocus && onFocus()}
        onBlur={() => onBlur && onBlur()}
        disabled={!editable}
        spellCheck={autoCorrect}
        {...props}
      />
    )
  },
)

export const SafeAreaView = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${className}`}
        style={{
          ...style,
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
        }}
        {...props}
      />
    )
  },
)

export const ActivityIndicator = forwardRef<HTMLDivElement, { size?: "small" | "large"; color?: string }>(
  ({ size = "small", color = "#000", ...props }, ref) => {
    const sizeValue = size === "small" ? "16px" : "32px"

    return (
      <div ref={ref} className="flex items-center justify-center" {...props}>
        <div
          className="animate-spin rounded-full border-t-2 border-b-2 border-transparent"
          style={{
            width: sizeValue,
            height: sizeValue,
            borderTopColor: color,
            borderBottomColor: color,
          }}
        />
      </div>
    )
  },
)

// Animation components
export const Animated = {
  View: forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { style?: any }>(
    ({ className = "", style = {}, ...props }, ref) => {
      return <div ref={ref} className={`${className}`} style={style} {...props} />
    },
  ),
  Text: forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement> & { style?: any }>(
    ({ className = "", style = {}, ...props }, ref) => {
      return <span ref={ref} className={`inline-block ${className}`} style={style} {...props} />
    },
  ),
  createAnimatedComponent: (Component: any) => Component,
  timing: (value: any, config: any) => ({
    start: (callback?: () => void) => {
      if (callback) callback()
    },
  }),
  spring: (value: any, config: any) => ({
    start: (callback?: () => void) => {
      if (callback) callback()
    },
  }),
  Value: class {
    constructor(initialValue: number) {
      this.value = initialValue
    }
    value: number
    interpolate({ inputRange, outputRange }: { inputRange: number[]; outputRange: any[] }) {
      return {
        toString: () => {
          const index = inputRange.findIndex((input) => input >= this.value)
          if (index === -1) return outputRange[outputRange.length - 1]
          if (index === 0) return outputRange[0]

          const prevInput = inputRange[index - 1]
          const nextInput = inputRange[index]
          const prevOutput = outputRange[index - 1]
          const nextOutput = outputRange[index]

          const progress = (this.value - prevInput) / (nextInput - prevInput)

          if (typeof prevOutput === "string" && typeof nextOutput === "string") {
            if (prevOutput.startsWith("#") && nextOutput.startsWith("#")) {
              // Color interpolation
              return prevOutput
            }
            return prevOutput
          }

          return prevOutput + progress * (nextOutput - prevOutput)
        },
      }
    }
  },
  parallel: (animations: any[]) => ({
    start: (callback?: () => void) => {
      if (callback) callback()
    },
  }),
}

// Alert implementation
export const Alert = {
  alert: (
    title: string,
    message?: string,
    buttons?: Array<{ text: string; onPress?: () => void; style?: "default" | "cancel" | "destructive" }>,
    options?: { cancelable?: boolean },
  ) => {
    window.alert(`${title}\n\n${message || ""}`)
  },
}

// Platform implementation
export const Platform = {
  OS: "web",
  select: (obj: { ios?: any; android?: any; web?: any }) => obj.web || obj.ios || obj.android,
}

// Dimensions implementation
export const Dimensions = {
  get: (dimension: "window" | "screen") => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      scale: window.devicePixelRatio || 1,
      fontScale: 1,
    }
  },
  addEventListener: (event: string, handler: () => void) => {
    window.addEventListener("resize", handler)
    return {
      remove: () => window.removeEventListener("resize", handler),
    }
  },
}

// StatusBar implementation (no-op for web)
export const StatusBar = {
  setBarStyle: () => {},
  setHidden: () => {},
  currentHeight: 0,
}

// AsyncStorage implementation
export const AsyncStorage = {
  getItem: async (key: string) => {
    return localStorage.getItem(key)
  },
  setItem: async (key: string, value: string) => {
    localStorage.setItem(key, value)
    return null
  },
  removeItem: async (key: string) => {
    localStorage.removeItem(key)
    return null
  },
  clear: async () => {
    localStorage.clear()
    return null
  },
  getAllKeys: async () => {
    return Object.keys(localStorage)
  },
  multiGet: async (keys: string[]) => {
    return keys.map((key) => [key, localStorage.getItem(key)])
  },
  multiSet: async (keyValuePairs: string[][]) => {
    keyValuePairs.forEach(([key, value]) => {
      if (typeof value === "string") {
        localStorage.setItem(key, value)
      }
    })
    return null
  },
  multiRemove: async (keys: string[]) => {
    keys.forEach((key) => localStorage.removeItem(key))
    return null
  },
}

// Modal implementation
export const Modal = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    visible?: boolean
    animationType?: "none" | "slide" | "fade"
    transparent?: boolean
    onRequestClose?: () => void
  }
>(
  (
    {
      className = "",
      visible = false,
      animationType = "none",
      transparent = false,
      onRequestClose,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const [isModalVisible, setIsModalVisible] = useState(visible)
    const escapeListener = useRef<() => void | null>(null)

    useEffect(() => {
      setIsModalVisible(visible)
    }, [visible])

    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && onRequestClose) {
          onRequestClose()
        }
      }

      if (isModalVisible) {
        document.addEventListener("keydown", handleEscape)
        escapeListener.current = () => document.removeEventListener("keydown", handleEscape)
      }

      return () => {
        escapeListener.current && escapeListener.current()
      }
    }, [onRequestClose, isModalVisible])

    if (!isModalVisible) return null

    let animation = ""
    if (animationType === "fade") animation = "animate-fade-in"
    if (animationType === "slide") animation = "animate-slide-up"

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={(e) => {
          if (e.target === e.currentTarget && onRequestClose) {
            onRequestClose()
          }
        }}
      >
        <div
          ref={ref}
          className={`${transparent ? "bg-transparent" : "bg-white"} ${animation} ${className}`}
          style={style}
          {...props}
        >
          {children}
        </div>
      </div>
    )
  },
)

// DateTimePicker mock (would need a real implementation with a date picker library)
export const DateTimePicker = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    value: Date
    mode?: "date" | "time" | "datetime"
    display?: "default" | "spinner" | "calendar" | "clock"
    onChange?: (event: any, date?: Date) => void
  }
>(({ value, mode = "date", onChange, ...props }, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const newDate = new Date(e.target.value)
      onChange(e, newDate)
    }
  }

  const inputType = mode === "date" ? "date" : mode === "time" ? "time" : "datetime-local"

  const formatValue = () => {
    if (!value) return ""

    if (mode === "date") {
      return value.toISOString().split("T")[0]
    } else if (mode === "time") {
      return value.toTimeString().split(" ")[0].substring(0, 5)
    } else {
      return value.toISOString().substring(0, 16)
    }
  }

  return (
    <input
      ref={ref}
      type={inputType}
      value={formatValue()}
      onChange={handleChange}
      className="p-2 border rounded"
      {...props}
    />
  )
})

// Export all components
export { View as RNView, Text as RNText, ScrollView as RNScrollView, TouchableOpacity as RNTouchableOpacity }
