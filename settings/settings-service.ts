import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore"
import { signOut } from "firebase/auth"
import { Alert } from "react-native"
import type { UserProfile, NotificationSettings, SubscriptionInfo, AppSettings, TimeValue } from "./types"

// This would be imported from your Firebase setup
const db = {} as any
const auth = {} as any

class SettingsService {
  // Get user profile
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const profileRef = doc(db, "userProfiles", userId)
      const profileSnap = await getDoc(profileRef)

      if (profileSnap.exists()) {
        return profileSnap.data() as UserProfile
      }

      return null
    } catch (error) {
      console.error("Error getting user profile:", error)
      return null
    }
  }

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

  // Get notification settings
  async getNotificationSettings(userId: string): Promise<NotificationSettings> {
    try {
      const settingsRef = doc(db, "userSettings", userId)
      const settingsSnap = await getDoc(settingsRef)

      if (settingsSnap.exists()) {
        const data = settingsSnap.data()
        return data.notifications as NotificationSettings
      }

      // Default settings
      return {
        dailyRemindersEnabled: true,
        reminderOffset: 90, // 90 minutes after wake time
        weeklyReportsEnabled: true,
        weeklyReportDay: "monday",
      }
    } catch (error) {
      console.error("Error getting notification settings:", error)
      // Return defaults on error
      return {
        dailyRemindersEnabled: true,
        reminderOffset: 90,
        weeklyReportsEnabled: true,
        weeklyReportDay: "monday",
      }
    }
  }

  // Update notification settings
  async updateNotificationSettings(userId: string, settings: NotificationSettings): Promise<boolean> {
    try {
      const settingsRef = doc(db, "userSettings", userId)
      await setDoc(
        settingsRef,
        {
          notifications: settings,
          updatedAt: new Date(),
        },
        { merge: true },
      )
      return true
    } catch (error) {
      console.error("Error updating notification settings:", error)
      return false
    }
  }

  // Get subscription info
  async getSubscriptionInfo(userId: string): Promise<SubscriptionInfo> {
    try {
      const subscriptionRef = doc(db, "subscriptions", userId)
      const subscriptionSnap = await getDoc(subscriptionRef)

      if (subscriptionSnap.exists()) {
        return subscriptionSnap.data() as SubscriptionInfo
      }

      // Default to free plan
      return {
        plan: "free",
        status: "active",
        expiresAt: null,
        trialEndsAt: null,
        renewsAutomatically: false,
      }
    } catch (error) {
      console.error("Error getting subscription info:", error)
      // Return defaults on error
      return {
        plan: "free",
        status: "active",
        expiresAt: null,
        trialEndsAt: null,
        renewsAutomatically: false,
      }
    }
  }

  // Get app settings
  async getAppSettings(userId: string): Promise<AppSettings> {
    try {
      const settingsRef = doc(db, "userSettings", userId)
      const settingsSnap = await getDoc(settingsRef)

      if (settingsSnap.exists()) {
        const data = settingsSnap.data()
        return data.app as AppSettings
      }

      // Default settings
      return {
        theme: "system",
        hapticFeedback: true,
        analyticsEnabled: true,
      }
    } catch (error) {
      console.error("Error getting app settings:", error)
      // Return defaults on error
      return {
        theme: "system",
        hapticFeedback: true,
        analyticsEnabled: true,
      }
    }
  }

  // Update app settings
  async updateAppSettings(userId: string, settings: AppSettings): Promise<boolean> {
    try {
      const settingsRef = doc(db, "userSettings", userId)
      await setDoc(
        settingsRef,
        {
          app: settings,
          updatedAt: new Date(),
        },
        { merge: true },
      )
      return true
    } catch (error) {
      console.error("Error updating app settings:", error)
      return false
    }
  }

  // Validate time values (wake time must be before work start time)
  validateTimes(wakeTime: TimeValue, workStartTime: TimeValue): boolean {
    const wakeMinutes = wakeTime.hour * 60 + wakeTime.minute
    const workMinutes = workStartTime.hour * 60 + workStartTime.minute

    return workMinutes > wakeMinutes
  }

  // Format time for display
  formatTime(time: TimeValue): string {
    const hours = time.hour
    const minutes = time.minute
    const period = hours >= 12 ? "PM" : "AM"
    const displayHours = hours % 12 === 0 ? 12 : hours % 12
    const displayMinutes = minutes.toString().padStart(2, "0")

    return `${displayHours}:${displayMinutes} ${period}`
  }

  // Calculate reminder time based on wake time and offset
  calculateReminderTime(wakeTime: TimeValue, offsetMinutes: number): TimeValue {
    const wakeMinutes = wakeTime.hour * 60 + wakeTime.minute
    const reminderMinutes = wakeMinutes + offsetMinutes

    const hour = Math.floor(reminderMinutes / 60) % 24
    const minute = reminderMinutes % 60

    return { hour, minute }
  }

  // Format subscription plan name
  formatPlanName(plan: SubscriptionInfo["plan"]): string {
    switch (plan) {
      case "weekly":
        return "Weekly Premium"
      case "monthly":
        return "Monthly Premium"
      case "annual":
        return "Annual Premium"
      case "lifetime":
        return "Lifetime Premium"
      default:
        return "Free Plan"
    }
  }

  // Format next billing date
  formatNextBillingDate(subscription: SubscriptionInfo): string {
    if (!subscription.expiresAt) return "N/A"

    const expiresAt = new Date(subscription.expiresAt)
    return expiresAt.toLocaleDateString("en", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  // Log out user
  async logoutUser(): Promise<boolean> {
    try {
      await signOut(auth)
      return true
    } catch (error) {
      console.error("Error logging out:", error)
      return false
    }
  }

  // Confirm logout with alert
  confirmLogout(onConfirm: () => void): void {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log Out",
          style: "destructive",
          onPress: onConfirm,
        },
      ],
      { cancelable: true },
    )
  }
}

export const settingsService = new SettingsService()
