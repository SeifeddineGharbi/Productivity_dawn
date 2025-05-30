export interface UserProfile {
  id: string
  name: string
  email: string
  gender: "male" | "female" | "non_binary" | "prefer_not_to_say"
  wakeTime: TimeValue
  workStartTime: TimeValue
  createdAt: Date
  updatedAt: Date
}

export interface TimeValue {
  hour: number
  minute: number
}

export interface NotificationSettings {
  dailyRemindersEnabled: boolean
  reminderOffset: number // minutes after wake time
  weeklyReportsEnabled: boolean
  weeklyReportDay: "monday" | "friday" | "sunday"
}

export interface SubscriptionInfo {
  plan: "free" | "weekly" | "monthly" | "annual" | "lifetime"
  status: "active" | "expired" | "trial"
  expiresAt: Date | null
  trialEndsAt: Date | null
  renewsAutomatically: boolean
}

export interface AppSettings {
  theme: "light" | "dark" | "system"
  hapticFeedback: boolean
  analyticsEnabled: boolean
}

export interface SettingsScreenProps {
  userId: string
  onLogout: () => void
}

export interface ProfileCardProps {
  profile: UserProfile
  onEdit: () => void
}

export interface NotificationSectionProps {
  settings: NotificationSettings
  wakeTime: TimeValue
  onUpdate: (settings: NotificationSettings) => Promise<void>
}

export interface SubscriptionCardProps {
  subscription: SubscriptionInfo
  onManage: () => void
  onUpgrade: () => void
  onRestore: () => void
}

export interface SupportLinksProps {
  onRateApp: () => void
  onContactSupport: () => void
  onPrivacyPolicy: () => void
  onTermsOfService: () => void
}

export interface ProfileEditModalProps {
  profile: UserProfile
  isVisible: boolean
  onClose: () => void
  onSave: (profile: UserProfile) => Promise<void>
}

export interface TimePickerProps {
  value: TimeValue
  onChange: (value: TimeValue) => void
  label: string
  error?: string
}

export interface GenderPickerProps {
  value: UserProfile["gender"]
  onChange: (value: UserProfile["gender"]) => void
}
