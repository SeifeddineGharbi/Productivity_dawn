"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, TextInput, Modal } from "../../utils/react-native-web"

interface UserProfile {
  name: string
  email: string
  wakeTime: { hour: number; minute: number }
  joinDate: string
}

interface ProfileEditModalProps {
  profile: UserProfile
  isVisible: boolean
  onClose: () => void
  onSave: (profile: UserProfile) => Promise<boolean>
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ profile, isVisible, onClose, onSave }) => {
  const [editedProfile, setEditedProfile] = useState(profile)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const success = await onSave(editedProfile)
      if (success) {
        onClose()
      }
    } catch (error) {
      console.error("Failed to save profile:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Modal visible={isVisible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 bg-black/50 items-center justify-center p-4">
        <View className="bg-white rounded-xl p-6 w-full max-w-sm">
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-xl font-bold text-gray-900">Edit Profile</Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-gray-500 text-xl">×</Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-4 mb-6">
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">Name</Text>
              <TextInput
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={editedProfile.name}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, name: text })}
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">Wake Time</Text>
              <View className="flex-row space-x-2">
                <TextInput
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-center"
                  value={editedProfile.wakeTime.hour.toString().padStart(2, "0")}
                  onChangeText={(text) => {
                    const hour = Number.parseInt(text) || 0
                    setEditedProfile({
                      ...editedProfile,
                      wakeTime: { ...editedProfile.wakeTime, hour: Math.max(0, Math.min(23, hour)) },
                    })
                  }}
                  placeholder="HH"
                />
                <Text className="py-2">:</Text>
                <TextInput
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-center"
                  value={editedProfile.wakeTime.minute.toString().padStart(2, "0")}
                  onChangeText={(text) => {
                    const minute = Number.parseInt(text) || 0
                    setEditedProfile({
                      ...editedProfile,
                      wakeTime: { ...editedProfile.wakeTime, minute: Math.max(0, Math.min(59, minute)) },
                    })
                  }}
                  placeholder="MM"
                />
              </View>
            </View>
          </View>

          <View className="flex-row space-x-3">
            <TouchableOpacity onPress={onClose} className="flex-1 py-3 border border-gray-300 rounded-lg">
              <Text className="text-gray-700 font-medium text-center">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} className="flex-1 py-3 bg-blue-500 rounded-lg" disabled={isSaving}>
              <Text className="text-white font-medium text-center">{isSaving ? "Saving..." : "Save"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
