import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import type { ProfileCardProps } from "../types"
import { settingsService } from "../settings-service"

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onEdit }) => {
  const formatGender = (gender: string): string => {
    switch (gender) {
      case "male":
        return "Male"
      case "female":
        return "Female"
      case "non_binary":
        return "Non-binary"
      default:
        return "Prefer not to say"
    }
  }

  return (
    <View className="bg-white rounded-2xl p-6 mx-4 mb-4 shadow-md">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-semibold text-gray-900">Profile</Text>
        <TouchableOpacity
          className="py-2 px-4 rounded-lg bg-blue-50 active:bg-blue-100"
          onPress={onEdit}
          activeOpacity={0.7}
        >
          <Text className="text-blue-600 font-medium">Edit</Text>
        </TouchableOpacity>
      </View>

      <View className="space-y-4">
        {/* Name */}
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Name</Text>
          <Text className="text-gray-900 font-medium">{profile.name}</Text>
        </View>

        {/* Email */}
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Email</Text>
          <Text className="text-gray-900 font-medium">{profile.email}</Text>
        </View>

        {/* Gender */}
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Gender</Text>
          <Text className="text-gray-900 font-medium">{formatGender(profile.gender)}</Text>
        </View>

        {/* Wake Time */}
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Wake Time</Text>
          <Text className="text-gray-900 font-medium">{settingsService.formatTime(profile.wakeTime)}</Text>
        </View>

        {/* Work Start Time */}
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Work Start Time</Text>
          <Text className="text-gray-900 font-medium">{settingsService.formatTime(profile.workStartTime)}</Text>
        </View>
      </View>
    </View>
  )
}
