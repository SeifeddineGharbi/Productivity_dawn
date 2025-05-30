// Firebase data structure types
export interface OnboardingData {
  id: string
  userId: string
  completed: boolean
  currentStep: number
  startedAt: Date
  completedAt?: Date
  answers: {
    [key: string]: Answer
  }
}

export type Answer = string | number | { hour: number; minute: number } | null

export interface OnboardingQuestion {
  id: string
  type: "multiple-choice" | "text-input" | "time-picker"
  question: string
  emoji: string
  required: boolean
  options?: {
    id: string
    text: string
    emoji: string
  }[]
  analyticsEventName: string
  validationRules?: {
    type: "required" | "time-after" | "min-length"
    message: string
    value?: any
    dependsOn?: string
  }[]
}

// Time picker types
export interface TimeValue {
  hour: number
  minute: number
}

// Component props
export interface OnboardingContainerProps {
  userId: string
  onComplete: () => void
  onSkip?: () => void
}

export interface QuestionTemplateProps {
  question: OnboardingQuestion
  value: Answer
  onChange: (value: Answer) => void
  error?: string
  isLoading?: boolean
}

export interface MultipleChoiceProps {
  options: OnboardingQuestion["options"]
  value: string | null
  onChange: (value: string) => void
  disabled?: boolean
}

export interface TextInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  error?: string
}

export interface TimePickerProps {
  value: TimeValue
  onChange: (value: TimeValue) => void
  disabled?: boolean
}

export interface ProgressAnimationProps {
  userName: string
  onContinue: () => void
}
