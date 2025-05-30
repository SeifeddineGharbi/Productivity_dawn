// Design tokens for the app
export const designTokens = {
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
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    xxl: "3rem", // 48px
  },
  borderRadius: {
    sm: "0.25rem", // 4px
    md: "0.5rem", // 8px
    lg: "0.75rem", // 12px
    xl: "1rem", // 16px
    xxl: "1.5rem", // 24px
    full: "9999px",
  },
  fontSizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    md: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    xxl: "1.5rem", // 24px
    xxxl: "2rem", // 32px
  },
  fontWeights: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
}

// Export individual token categories for easier imports
export const colors = designTokens.colors
export const spacing = designTokens.spacing
export const borderRadius = designTokens.borderRadius
export const fontSizes = designTokens.fontSizes
export const fontWeights = designTokens.fontWeights
export const shadows = designTokens.shadows
