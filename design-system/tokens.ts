// Design Tokens - Core values for the design system
export const designTokens = {
  // Color Palette (iOS-inspired)
  colors: {
    primary: {
      50: "#eff6ff",
      500: "#007AFF", // iOS Blue
      600: "#0066CC",
      700: "#0052A3",
    },
    success: "#34C759", // iOS Green
    warning: "#FF9500", // iOS Orange
    error: "#FF3B30", // iOS Red
    background: "#F8F9FA", // Light Gray

    // Task-specific colors
    task: {
      water: "#007AFF", // Blue - represents hydration
      noSocial: "#FF3B30", // Red - represents restriction
      sunlight: "#FFCC00", // Yellow - represents sunshine
      elephant: "#34C759", // Green - represents growth
    },

    // Grayscale
    gray: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#111827",
    },

    white: "#FFFFFF",
    black: "#000000",
  },

  // Spacing (Tailwind standard)
  spacing: {
    xs: 4, // p-1
    sm: 8, // p-2
    md: 16, // p-4
    lg: 24, // p-6
    xl: 32, // p-8
    "2xl": 48, // p-12
  },

  // Border Radius
  borderRadius: {
    sm: 8, // rounded-lg
    md: 12, // rounded-xl
    lg: 16, // rounded-2xl
    xl: 20, // rounded-3xl
    full: 9999, // rounded-full
  },

  // Typography Scale
  fontSize: {
    xs: 12, // text-xs
    sm: 14, // text-sm
    base: 16, // text-base
    lg: 18, // text-lg
    xl: 20, // text-xl
    "2xl": 24, // text-2xl
    "3xl": 28, // text-3xl
    "4xl": 32, // text-4xl
  },

  // Font Weights
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },

  // Shadows (iOS-style)
  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
  },
} as const

// Animation constants
export const animations = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeInOut: "ease-in-out",
    easeOut: "ease-out",
    spring: "spring",
  },
} as const
