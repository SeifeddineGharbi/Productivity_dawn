"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView, ActivityIndicator } from "react-native"
import type { ProfileEditModalProps, UserProfile } from "../types"
import { settingsService } from "../settings-service"
import { TimePicker } from "./TimePicker"
import { GenderPicker } from "./GenderPicker"

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ profile, isVisible, onClose, onSave }) => {
  const [localProfile, setLocalProfile] = useState<UserProfile>({ ...profile })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  // Reset local state when profile changes
  useEffect(() => {
    setLocalProfile({ ...profile })
    setErrors({})
    setHasChanges(false)
  }, [profile, isVisible])

  // Check for changes
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

  const handleNameChange = (name: string) => {
    setLocalProfile((prev) => ({ ...prev, name }))
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: "" }))
    }
  }

  const handleGenderChange = (gender: UserProfile["gender"]) => {
    setLocalProfile((prev) => ({ ...prev, gender }))
  }

  const handleWakeTimeChange = (wakeTime: UserProfile["wakeTime"]) => {
    setLocalProfile((prev) => ({ ...prev, wakeTime }))
    validateTimes(wakeTime, localProfile.workStartTime)
  }

  const handleWorkStartTimeChange = (workStartTime: UserProfile["workStartTime"]) => {
    setLocalProfile((prev) => ({ ...prev, workStartTime }))
    validateTimes(localProfile.wakeTime, workStartTime)
  }

  const validateTimes = (wakeTime: UserProfile["wakeTime"], workStartTime: UserProfile["workStartTime"]) => {
    const isValid = settingsService.validateTimes(wakeTime, workStartTime)
    if (!isValid) {
      setErrors((prev) => ({
        ...prev,
        workStartTime: "Work start time must be after wake time",
      }))
    } else if (errors.workStartTime) {
      setErrors((prev) => ({ ...prev, workStartTime: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!localProfile.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!settingsService.validateTimes(localProfile.wakeTime, localProfile.workStartTime)) {
      newErrors.workStartTime = "Work start time must be after wake time"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm() || isSaving) return

    setIsSaving(true)
    try {
      await onSave(localProfile)
      onClose()
    } catch (error) {
      console.error("Error saving profile:", error)
      setErrors((prev) => ({
        ...prev,
        general: "Failed to save profile. Please try again.",
      }))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Modal visible={isVisible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="bg-white border-b border-gray-200 px-6 py-4">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              className="p-2 rounded-lg active:bg-gray-100"
              onPress={onClose}
              disabled={isSaving}
              activeOpacity={0.7}
            >
              <Text className="text-blue-600 font-semibold">Cancel</Text>
            </TouchableOpacity>

            <Text className="text-xl font-bold text-gray-900">Edit Profile</Text>

            <TouchableOpacity
              className={`p-2 rounded-lg ${hasChanges && !isSaving ? "active:bg-gray-100" : "opacity-50"}`}
              onPress={handleSave}
              disabled={!hasChanges || isSaving}
              activeOpacity={hasChanges && !isSaving ? 0.7 : 1}
            >
              {isSaving ? (
                <ActivityIndicator size="small" color="#007AFF" />
              ) : (
                <Text className={`font-semibold ${hasChanges ? "text-blue-600" : "text-gray-400"}`}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1 p-6">
          {/* General Error */}
          {errors.general && (
            <View className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <Text className="text-red-700">{errors.general}</Text>
            </View>
          )}

          {/* Name Input */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">Name</Text>
            <TextInput
              className={`
                px-4 py-4 rounded-xl border text-base
                ${errors.name ? "border-red-300 bg-red-50" : "border-gray-300 bg-white"}
              `}
              placeholder="Enter your name"
              placeholderTextColor="#9CA3AF"
              value={localProfile.name}
              onChangeText={handleNameChange}
              editable={!isSaving}
            />
            {errors.name && <Text className="text-red-600 text-sm mt-1">{errors.name}</Text>}
          </View>

          {/* Email (Read-only) */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">Email</Text>
            <TextInput
              className="px-4 py-4 rounded-xl border border-gray-300 bg-gray-100 text-base text-gray-600"
              value={localProfile.email}
              editable={false}
            />
            <Text className="text-gray-500 text-xs mt-1">Email cannot be changed</Text>
          </View>

          {/* Gender Picker */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">Gender</Text>
            <GenderPicker value={localProfile.gender} onChange={handleGenderChange} />
          </View>

          {/* Wake Time Picker */}
          <TimePicker label="Wake Time" value={localProfile.wakeTime} onChange={handleWakeTimeChange} />

          {/* Work Start Time Picker */}
          <TimePicker
            label="Work Start Time"
            value={localProfile.workStartTime}
            onChange={handleWorkStartTimeChange}
            error={errors.workStartTime}
          />
        </ScrollView>
      </View>
    </Modal>
  )
}
