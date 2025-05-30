# Productivity Dawn Settings Screen

A comprehensive settings and profile management system for the Productivity Dawn app, providing users with full control over their experience.

## 🎯 Core Features

### Profile Management
- **User Information Display**: Name, email, gender, wake time, work start time
- **Profile Editing**: Comprehensive form with validation
- **Time Cross-Validation**: Ensures work time is after wake time
- **Gender Selection**: Inclusive options with "prefer not to say"

### Notification Controls
- **Daily Reminders**: Toggle on/off with timing control
- **Reminder Timing**: Slider for 30-180 minutes after wake time
- **Live Preview**: Shows actual reminder time based on wake time
- **Weekly Reports**: Toggle with day selection (Monday/Friday/Sunday)

### Subscription Management
- **Current Plan Display**: Shows active subscription with badge
- **Billing Information**: Next billing date with auto-renewal status
- **Upgrade Promotion**: Special offer for annual subscription
- **Subscription Actions**: Manage subscription and restore purchases

### Support Resources
- **App Rating**: Link to rate the app in the store
- **Contact Support**: Email link to support team
- **Legal Documents**: Privacy policy and terms of service
- **Account Actions**: Logout with confirmation dialog

## 🎨 Visual Design

### Layout Structure
\`\`\`
SafeAreaView
├── Header
├── ScrollView
│   ├── ProfileCard
│   ├── NotificationSection
│   ├── SubscriptionCard
│   ├── SupportLinks
│   └── LogoutButton
└── ProfileEditModal (when active)
\`\`\`

### Card-Based Design
- **Consistent Spacing**: 16px margins, 24px padding
- **Rounded Corners**: 16px border radius
- **Shadow Effects**: Subtle elevation for depth
- **White Backgrounds**: Clean, minimal aesthetic

### Color System
- **Primary Blue**: #007AFF for interactive elements
- **Danger Red**: #FF3B30 for logout and destructive actions
- **Premium Gold**: Yellow accents for subscription features
- **Neutral Grays**: Various shades for text and backgrounds

## 🔧 Technical Implementation

### Profile Editing
\`\`\`typescript
// Time validation logic
const validateTimes = (wakeTime: TimeValue, workStartTime: TimeValue): boolean => {
  const wakeMinutes = wakeTime.hour * 60 + wakeTime.minute
  const workMinutes = workStartTime.hour * 60 + workStartTime.minute
  return workMinutes > wakeMinutes
}

// Change detection
useEffect(() => {
  const changed =
    localProfile.name !== profile.name ||
    localProfile.gender !== profile.gender ||
    localProfile.wakeTime.hour !== profile.wakeTime.hour ||
    localProfile.wakeTime.minute !== profile.wakeTime.minute ||
    localProfile.workStartTime.hour !== profile.workStartTime.hour ||
    localProfile.workStartTime.minute !== profile.workStartTime.minute

  setHasChanges(changed)
}, [localProfile, profile])
\`\`\`

### Notification Settings
\`\`\`typescript
// Calculate reminder time based on wake time and offset
const calculateReminderTime = (wakeTime: TimeValue, offsetMinutes: number): TimeValue => {
  const wakeMinutes = wakeTime.hour * 60 + wakeTime.minute
  const reminderMinutes = wakeMinutes + offsetMinutes

  const hour = Math.floor(reminderMinutes / 60) % 24
  const minute = reminderMinutes % 60

  return { hour, minute }
}
\`\`\`

### Time Formatting
\`\`\`typescript
// Format time for display
const formatTime = (time: TimeValue): string => {
  const hours = time.hour
  const minutes = time.minute
  const period = hours >= 12 ? "PM" : "AM"
  const displayHours = hours % 12 === 0 ? 12 : hours % 12
  const displayMinutes = minutes.toString().padStart(2, "0")

  return `${displayHours}:${displayMinutes} ${period}`
}
\`\`\`

## 📱 Interactive Features

### Profile Edit Modal
- **Form Validation**: Real-time validation with error messages
- **Save Button State**: Disabled until changes are made
- **Cancel Confirmation**: Prevents accidental data loss
- **Loading States**: Visual feedback during save operations

### Time Pickers
- **Platform-Specific**: Native time pickers for iOS and Android
- **Error Handling**: Clear validation messages
- **Formatted Display**: 12-hour time format with AM/PM

### Notification Controls
- **Interactive Slider**: Smooth control for reminder timing
- **Live Preview**: Real-time calculation of actual reminder time
- **Toggle Switches**: Smooth animations for on/off states
- **Day Selection**: Interactive buttons for weekly report day

### Logout Flow
- **Confirmation Dialog**: Prevents accidental logout
- **Clear Feedback**: Visual indication of logout process
- **Error Handling**: Graceful handling of logout failures

## 🔒 Data Management

### Firebase Integration
\`\`\`typescript
// Update user profile
async updateUserProfile(userId: string, profile: Partial<UserProfile>): Promise<boolean> {
  try {
    const profileRef = doc(db, "userProfiles", userId)
    await updateDoc(profileRef, {
      ...profile,
      updatedAt: new Date(),
    })
    return true
  } catch (error) {
    console.error("Error updating user profile:", error)
    return false
  }
}
\`\`\`

### Data Structure
\`\`\`typescript
interface UserProfile {
  id: string
  name: string
  email: string
  gender: "male" | "female" | "non_binary" | "prefer_not_to_say"
  wakeTime: TimeValue
  workStartTime: TimeValue
  createdAt: Date
  updatedAt: Date
}

interface NotificationSettings {
  dailyRemindersEnabled: boolean
  reminderOffset: number // minutes after wake time
  weeklyReportsEnabled: boolean
  weeklyReportDay: "monday" | "friday" | "sunday"
}

interface SubscriptionInfo {
  plan: "free" | "weekly" | "monthly" | "annual" | "lifetime"
  status: "active" | "expired" | "trial"
  expiresAt: Date | null
  trialEndsAt: Date | null
  renewsAutomatically: boolean
}
\`\`\`

## 🚀 Usage

\`\`\`tsx
import { SettingsScreen } from './settings/SettingsScreen'

const App = () => {
  const handleLogout = () => {
    // Handle logout logic
    console.log("User logged out")
  }

  return (
    <SettingsScreen
      userId="user123"
      onLogout={handleLogout}
    />
  )
}
\`\`\`

## 🔄 State Management

The settings screen manages multiple state layers:

1. **User Profile**: Personal information and preferences
2. **Notification Settings**: Reminder and report preferences
3. **Subscription Info**: Current plan and billing details
4. **UI State**: Modal visibility, loading states, form validation

### Error Handling
- **Loading States**: Clear indication during data fetching
- **Validation Errors**: Inline form validation with error messages
- **API Errors**: Graceful error handling with retry options
- **Offline Support**: Consideration for offline state

This comprehensive settings system provides users with full control over their Productivity Dawn experience while maintaining a clean, intuitive interface and robust data management.
