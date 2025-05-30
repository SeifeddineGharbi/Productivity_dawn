"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator, Linking } from "react-native"
import type { SettingsScreenProps, UserProfile, NotificationSettings, SubscriptionInfo } from "./types"
import { settingsService } from "./settings-service"
import { ProfileCard } from "./components/ProfileCard"
import { NotificationSection } from "./components/NotificationSection"
import { SubscriptionCard } from "./components/SubscriptionCard"
import { SupportLinks } from "./components/SupportLinks"
import { ProfileEditModal } from "./components/ProfileEditModal"

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ userId, onLogout }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings | null>(null)
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showProfileEdit, setShowProfileEdit] = useState(false)

  // Load user data
  const loadUserData = useCallback(async () => {
    setIsLoading(true)
    try {
      // Load profile
      const userProfile = await settingsService.getUserProfile(userId)
      if (userProfile) {
        setProfile(userProfile)
      }

      // Load notification settings
      const notifications = await settingsService.getNotificationSettings(userId)
      setNotificationSettings(notifications)

      // Load subscription info
      const subscriptionInfo = await settingsService.getSubscriptionInfo(userId)
      setSubscription(subscriptionInfo)
    } catch (error) {
      console.error("Error loading user data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [userId])

  // Initialize data
  useEffect(() => {
    loadUserData()
  }, [loadUserData])

  // Handle profile edit
  const handleEditProfile = () => {
    setShowProfileEdit(true)
  }

  // Handle profile save
  const handleSaveProfile = async (updatedProfile: UserProfile) => {
    try {
      const success = await settingsService.updateUserProfile(userId, updatedProfile)
      if (success) {
        setProfile(updatedProfile)
      }
      return success
    } catch (error) {
      console.error("Error saving profile:", error)
      throw error
    }
  }

  // Handle notification settings update
  const handleUpdateNotifications = async (settings: NotificationSettings) => {
    try {
      const success = await settingsService.updateNotificationSettings(userId, settings)
      if (success) {
        setNotificationSettings(settings)
      }
      return success
    } catch (error) {
      console.error("Error updating notification settings:", error)
      throw error
    }
  }

  // Handle subscription management
  const handleManageSubscription = () => {
    // In a real app, this would open the subscription management page
    Linking.openURL("https://apps.apple.com/account/subscriptions")
  }

  // Handle subscription upgrade
  const handleUpgradeSubscription = () => {
    // In a real app, this would open the upgrade flow
    console.log("Open upgrade flow")
  }

  // Handle restore purchases
  const handleRestorePurchases = () => {
    // In a real app, this would restore purchases
    console.log("Restore purchases")
  }

  // Handle support links
  const handleRateApp = () => {
    Linking.openURL("https://apps.apple.com/app/id123456789")
  }

  const handleContactSupport = () => {
    Linking.openURL("mailto:support@productivitydawn.com")
  }

  const handlePrivacyPolicy = () => {
    Linking.openURL("https://productivitydawn.com/privacy")
  }

  const handleTermsOfService = () => {
    Linking.openURL("https://productivitydawn.com/terms")
  }

  // Handle logout
  const handleLogout = () => {
    settingsService.confirmLogout(onLogout)
  }

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#007AFF" />
        <Text className="mt-4 text-gray-600">Loading settings...</Text>
      </SafeAreaView>
    )
  }

  if (!profile || !notificationSettings || !subscription) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-red-600">Failed to load user data</Text>
        <TouchableOpacity
          className="mt-4 py-2 px-4 bg-blue-500 rounded-lg active:bg-blue-600"
          onPress={loadUserData}
          activeOpacity={0.8}
        >
          <Text className="text-white font-medium">Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 py-4">
        <Text className="text-2xl font-bold text-gray-900">Settings</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Profile Card */}
        <ProfileCard profile={profile} onEdit={handleEditProfile} />

        {/* Notification Settings */}
        <NotificationSection
          settings={notificationSettings}
          wakeTime={profile.wakeTime}
          onUpdate={handleUpdateNotifications}
        />

        {/* Subscription Card */}
        <SubscriptionCard
          subscription={subscription}
          onManage={handleManageSubscription}
          onUpgrade={handleUpgradeSubscription}
          onRestore={handleRestorePurchases}
        />

        {/* Support Links */}
        <SupportLinks
          onRateApp={handleRateApp}
          onContactSupport={handleContactSupport}
          onPrivacyPolicy={handlePrivacyPolicy}
          onTermsOfService={handleTermsOfService}
        />

        {/* Logout Button */}
        <View className="px-4 mb-6">
          <TouchableOpacity
            className="py-4 rounded-xl bg-red-500 active:bg-red-600"
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold text-center">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        profile={profile}
        isVisible={showProfileEdit}
        onClose={() => setShowProfileEdit(false)}
        onSave={handleSaveProfile}
      />
    </SafeAreaView>
  )
}
