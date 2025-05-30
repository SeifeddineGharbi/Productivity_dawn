import type React from "react"
import { Text } from "../utils/react-native-web"

// Typography Components with NativeWind classes
interface TypographyProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  className?: string
}

// Heading Components
export const H1: React.FC<TypographyProps> = ({ children, className = "", ...props }) => (
  <Text className={`text-3xl font-bold text-gray-900 ${className}`} {...props}>
    {children}
  </Text>
)

export const H2: React.FC<TypographyProps> = ({ children, className = "", ...props }) => (
  <Text className={`text-2xl font-bold text-gray-900 ${className}`} {...props}>
    {children}
  </Text>
)

export const H3: React.FC<TypographyProps> = ({ children, className = "", ...props }) => (
  <Text className={`text-xl font-semibold text-gray-900 ${className}`} {...props}>
    {children}
  </Text>
)

// Body Text Components
export const BodyLarge: React.FC<TypographyProps> = ({ children, className = "", ...props }) => (
  <Text className={`text-lg font-normal text-gray-900 ${className}`} {...props}>
    {children}
  </Text>
)

export const Body: React.FC<TypographyProps> = ({ children, className = "", ...props }) => (
  <Text className={`text-base font-normal text-gray-900 ${className}`} {...props}>
    {children}
  </Text>
)

export const BodySmall: React.FC<TypographyProps> = ({ children, className = "", ...props }) => (
  <Text className={`text-sm font-normal text-gray-600 ${className}`} {...props}>
    {children}
  </Text>
)

// Caption and Label Components
export const Caption: React.FC<TypographyProps> = ({ children, className = "", ...props }) => (
  <Text className={`text-xs font-normal text-gray-500 ${className}`} {...props}>
    {children}
  </Text>
)

export const Label: React.FC<TypographyProps> = ({ children, className = "", ...props }) => (
  <Text className={`text-sm font-medium text-gray-700 ${className}`} {...props}>
    {children}
  </Text>
)

// Special Typography for App
export const WelcomeText: React.FC<TypographyProps> = ({ children, className = "", ...props }) => (
  <Text className={`text-2xl font-bold text-gray-900 text-center ${className}`} {...props}>
    {children}
  </Text>
)

export const ScoreText: React.FC<TypographyProps> = ({ children, className = "", ...props }) => (
  <Text className={`text-4xl font-bold text-primary-500 text-center ${className}`} {...props}>
    {children}
  </Text>
)

export const MotivationalText: React.FC<TypographyProps> = ({ children, className = "", ...props }) => (
  <Text className={`text-lg font-semibold text-gray-800 text-center ${className}`} {...props}>
    {children}
  </Text>
)
