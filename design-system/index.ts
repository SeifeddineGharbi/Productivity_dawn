// Main export file for the design system
export * from "./tokens"
export * from "./typography"
export * from "./buttons"
export * from "./inputs"
export * from "./cards"
export * from "./loading-states"
export * from "./error-states"
export * from "./progress-indicators"
export * from "./layout"
export * from "./notifications"
export * from "./firebase-components"
export * from "./revenuecat-components"

// Utility functions
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(" ")
}

// Theme configuration for NativeWind
export const theme = {
  extend: {
    colors: {
      primary: {
        50: "#eff6ff",
        500: "#007AFF",
        600: "#0066CC",
        700: "#0052A3",
      },
      success: "#34C759",
      warning: "#FF9500",
      error: "#FF3B30",
      background: "#F8F9FA",
      task: {
        water: "#007AFF",
        noSocial: "#FF3B30",
        sunlight: "#FFCC00",
        elephant: "#34C759",
      },
    },
    fontFamily: {
      "sf-pro": ["SF Pro Display", "system-ui", "sans-serif"],
      "sf-text": ["SF Pro Text", "system-ui", "sans-serif"],
    },
  },
}

// Animation utilities
export const animations = {
  fadeIn: "animate-fade-in",
  slideUp: "animate-slide-up",
  scale: "animate-scale",
  bounce: "animate-bounce",
}

// Responsive breakpoints
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}
