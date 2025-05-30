import PushNotification from "react-native-push-notification"
import { Platform } from "react-native"

class NotificationService {
  constructor() {
    this.configure()
  }

  configure() {
    PushNotification.configure({
      onRegister: (token) => {
        console.log("TOKEN:", token)
      },

      onNotification: (notification) => {
        console.log("NOTIFICATION:", notification)
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: Platform.OS === "ios",
    })
  }

  // Schedule morning reminder (90 minutes after wake time)
  scheduleMorningReminder(wakeTime: { hour: number; minute: number }, userId: string) {
    // Cancel existing notifications
    PushNotification.cancelAllLocalNotifications()

    // Calculate reminder time (90 minutes after wake time)
    const reminderTime = new Date()
    reminderTime.setHours(wakeTime.hour, wakeTime.minute + 90, 0, 0)

    // If the time has passed today, schedule for tomorrow
    if (reminderTime <= new Date()) {
      reminderTime.setDate(reminderTime.getDate() + 1)
    }

    PushNotification.localNotificationSchedule({
      id: "morning_reminder",
      title: "🌅 Morning Routine Time!",
      message: "Ready to conquer your day? Complete your 4 morning tasks now!",
      date: reminderTime,
      repeatType: "day", // Repeat daily
      userInfo: {
        type: "morning_reminder",
        userId,
      },
    })

    console.log(`Morning reminder scheduled for ${reminderTime.toLocaleTimeString()}`)
  }

  // Request notification permissions
  async requestPermissions(): Promise<boolean> {
    return new Promise((resolve) => {
      PushNotification.requestPermissions().then((permissions) => {
        resolve(permissions.alert && permissions.badge && permissions.sound)
      })
    })
  }

  // Cancel all notifications
  cancelAllNotifications() {
    PushNotification.cancelAllLocalNotifications()
  }
}

export const notificationService = new NotificationService()
