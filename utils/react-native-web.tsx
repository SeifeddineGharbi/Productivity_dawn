"use client"

import React, { forwardRef, useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

// View component (equivalent to React Native's View)
export const View = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col", className)}
        style={{
          boxSizing: "border-box",
          position: "relative",
          ...style,
        }}
        {...props}
      />
    )
  },
)
View.displayName = "View"

// Text component (equivalent to React Native's Text)
export const Text = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, style, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("text-base text-foreground", className)}
        style={{
          display: "inline",
          ...style,
        }}
        {...props}
      />
    )
  },
)
Text.displayName = "Text"

// TouchableOpacity component (equivalent to React Native's TouchableOpacity)
export const TouchableOpacity = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { activeOpacity?: number }
>(({ className, style, activeOpacity = 0.2, onMouseDown, onMouseUp, ...props }, ref) => {
  const [isPressed, setIsPressed] = useState(false)

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsPressed(true)
    onMouseDown?.(e)
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsPressed(false)
    onMouseUp?.(e)
  }

  return (
    <button
      ref={ref}
      className={cn("cursor-pointer transition-opacity", className)}
      style={{
        opacity: isPressed ? activeOpacity : 1,
        outline: "none",
        backgroundColor: "transparent",
        border: "none",
        padding: 0,
        ...style,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsPressed(false)}
      {...props}
    />
  )
})
TouchableOpacity.displayName = "TouchableOpacity"

// Image component (equivalent to React Native's Image)
export const Image = forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & { source?: { uri: string } }
>(({ className, style, source, src, ...props }, ref) => {
  return (
    <img
      ref={ref}
      src={source?.uri || src}
      className={cn("max-w-full", className)}
      style={{
        objectFit: "contain",
        ...style,
      }}
      {...props}
    />
  )
})
Image.displayName = "Image"

// ScrollView component (equivalent to React Native's ScrollView)
export const ScrollView = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    horizontal?: boolean
    showsHorizontalScrollIndicator?: boolean
    showsVerticalScrollIndicator?: boolean
  }
>(
  (
    {
      className,
      style,
      horizontal,
      showsHorizontalScrollIndicator = true,
      showsVerticalScrollIndicator = true,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("overflow-auto", className)}
        style={{
          display: "flex",
          flexDirection: horizontal ? "row" : "column",
          overflowX: horizontal ? (showsHorizontalScrollIndicator ? "auto" : "hidden") : "hidden",
          overflowY: !horizontal ? (showsVerticalScrollIndicator ? "auto" : "hidden") : "hidden",
          WebkitOverflowScrolling: "touch",
          ...style,
        }}
        {...props}
      />
    )
  },
)
ScrollView.displayName = "ScrollView"

// FlatList component (equivalent to React Native's FlatList)
export function FlatList<T>({
  data,
  renderItem,
  keyExtractor,
  horizontal,
  showsHorizontalScrollIndicator,
  showsVerticalScrollIndicator,
  contentContainerStyle,
  style,
  className,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
  ...props
}: {
  data: T[]
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactNode
  keyExtractor?: (item: T, index: number) => string
  horizontal?: boolean
  showsHorizontalScrollIndicator?: boolean
  showsVerticalScrollIndicator?: boolean
  contentContainerStyle?: React.CSSProperties
  style?: React.CSSProperties
  className?: string
  ListHeaderComponent?: React.ReactNode
  ListFooterComponent?: React.ReactNode
  ListEmptyComponent?: React.ReactNode
}) {
  return (
    <ScrollView
      horizontal={horizontal}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      className={className}
      style={style}
    >
      <div style={contentContainerStyle}>
        {ListHeaderComponent}
        {data.length === 0 && ListEmptyComponent}
        {data.map((item, index) => (
          <React.Fragment key={keyExtractor ? keyExtractor(item, index) : index}>
            {renderItem({ item, index })}
          </React.Fragment>
        ))}
        {ListFooterComponent}
      </div>
    </ScrollView>
  )
}

// SafeAreaView component (equivalent to React Native's SafeAreaView)
export const SafeAreaView = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("min-h-screen", className)}
        style={{
          paddingTop: "env(safe-area-inset-top)",
          paddingRight: "env(safe-area-inset-right)",
          paddingBottom: "env(safe-area-inset-bottom)",
          paddingLeft: "env(safe-area-inset-left)",
          ...style,
        }}
        {...props}
      />
    )
  },
)
SafeAreaView.displayName = "SafeAreaView"

// ActivityIndicator component (equivalent to React Native's ActivityIndicator)
export const ActivityIndicator = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { size?: "small" | "large"; color?: string }
>(({ className, style, size = "small", color = "#999", ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex items-center justify-center", className)} style={style} {...props}>
      <div
        className="animate-spin rounded-full border-t-2 border-b-2"
        style={{
          width: size === "small" ? 20 : 36,
          height: size === "small" ? 20 : 36,
          borderColor: color,
        }}
      />
    </div>
  )
})
ActivityIndicator.displayName = "ActivityIndicator"

// TextInput component (equivalent to React Native's TextInput)
export const TextInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    onChangeText?: (text: string) => void
    placeholderTextColor?: string
  }
>(({ className, style, onChangeText, placeholderTextColor, onChange, ...props }, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onChangeText?.(e.target.value)
  }

  return (
    <input
      ref={ref}
      className={cn("px-3 py-2 border rounded", className)}
      style={{
        outline: "none",
        ...style,
      }}
      onChange={handleChange}
      {...props}
    />
  )
})
TextInput.displayName = "TextInput"

// Switch component (equivalent to React Native's Switch)
export const Switch = forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
    value?: boolean
    onValueChange?: (value: boolean) => void
    trackColor?: { false: string; true: string }
    thumbColor?: string
  }
>(({ className, style, value, onValueChange, onChange, trackColor, thumbColor, ...props }, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onValueChange?.(e.target.checked)
  }

  return (
    <div className={cn("relative inline-block", className)} style={style}>
      <input ref={ref} type="checkbox" className="sr-only" checked={value} onChange={handleChange} {...props} />
      <div
        className={`w-10 h-6 rounded-full transition-colors ${value ? "bg-primary" : "bg-gray-300"}`}
        style={{
          backgroundColor: value ? trackColor?.true : trackColor?.false,
        }}
      >
        <div
          className="absolute left-0.5 top-0.5 w-5 h-5 rounded-full transition-transform transform"
          style={{
            transform: value ? "translateX(16px)" : "translateX(0)",
            backgroundColor: thumbColor || "white",
          }}
        />
      </div>
    </div>
  )
})
Switch.displayName = "Switch"

// Modal component (equivalent to React Native's Modal)
export const Modal = ({
  visible,
  onRequestClose,
  animationType = "none",
  transparent = false,
  children,
}: {
  visible: boolean
  onRequestClose?: () => void
  animationType?: "none" | "slide" | "fade"
  transparent?: boolean
  children: React.ReactNode
}) => {
  const [animation, setAnimation] = useState<string>("")
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (animationType === "fade") {
      setAnimation("animate-fade")
    } else if (animationType === "slide") {
      setAnimation("animate-slide")
    }
  }, [animationType])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onRequestClose) {
        onRequestClose()
      }
    }

    if (visible) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [visible, onRequestClose])

  if (!visible) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        transparent ? "bg-transparent" : "bg-black/50",
        animation,
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget && onRequestClose) {
          onRequestClose()
        }
      }}
    >
      <div ref={modalRef} className="relative">
        {children}
      </div>
    </div>
  )
}

// StatusBar component (equivalent to React Native's StatusBar)
export const StatusBar = ({
  barStyle,
  backgroundColor,
  hidden,
}: {
  barStyle?: "default" | "light-content" | "dark-content"
  backgroundColor?: string
  hidden?: boolean
}) => {
  useEffect(() => {
    // Apply meta theme-color for mobile browsers
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta && backgroundColor) {
      meta.setAttribute("content", backgroundColor)
    }

    // Apply status bar style using CSS variables
    if (barStyle) {
      document.documentElement.style.setProperty("--status-bar-style", barStyle === "light-content" ? "white" : "black")
    }

    return () => {
      // Reset on unmount
      if (meta) {
        meta.setAttribute("content", "#ffffff")
      }
      document.documentElement.style.removeProperty("--status-bar-style")
    }
  }, [barStyle, backgroundColor])

  // This component doesn't render anything visible
  return null
}

// Platform utility (equivalent to React Native's Platform)
export const Platform = {
  OS: "web",
  select: (obj: { ios?: any; android?: any; web?: any; default?: any }) => {
    return obj.web || obj.default
  },
}

// Dimensions utility (equivalent to React Native's Dimensions)
export const Dimensions = {
  get: (dimension: "window" | "screen") => {
    if (typeof window !== "undefined") {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
        scale: window.devicePixelRatio || 1,
        fontScale: 1,
      }
    }
    return {
      width: 0,
      height: 0,
      scale: 1,
      fontScale: 1,
    }
  },
}

// Animated (basic implementation of React Native's Animated)
export const Animated = {
  View: forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { style?: any }>(
    ({ style, ...props }, ref) => {
      return <View ref={ref} style={style} {...props} />
    },
  ),
  Text: forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement> & { style?: any }>(
    ({ style, ...props }, ref) => {
      return <Text ref={ref} style={style} {...props} />
    },
  ),
  createValue: (initialValue: number) => {
    return { _value: initialValue, setValue: (value: number) => {} }
  },
  timing: (value: any, config: any) => {
    return {
      start: (callback?: () => void) => {
        if (callback) callback()
      },
    }
  },
}
Animated.View.displayName = "Animated.View"
Animated.Text.displayName = "Animated.Text"

// KeyboardAvoidingView (equivalent to React Native's KeyboardAvoidingView)
export const KeyboardAvoidingView = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { behavior?: "height" | "position" | "padding" }
>(({ behavior, ...props }, ref) => {
  return <View ref={ref} {...props} />
})
KeyboardAvoidingView.displayName = "KeyboardAvoidingView"

// Alert (equivalent to React Native's Alert)
export const Alert = {
  alert: (title: string, message?: string, buttons?: Array<{ text: string; onPress?: () => void }>) => {
    if (typeof window !== "undefined") {
      window.alert(`${title}${message ? "\n\n" + message : ""}`)
      if (buttons && buttons.length > 0 && buttons[0].onPress) {
        buttons[0].onPress()
      }
    }
  },
}
