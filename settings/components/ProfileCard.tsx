import type React from "react"
import { View, Text, TouchableOpacity } from "../../utils/react-native-web"

interface UserProfile {
  name: string
  email: string
  wakeTime: { hour: number; minute: number }
}

interface ProfileCardProps {
  profile: UserProfile
  onEdit: () => void
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onEdit }) => {
  const formatTime = (time: { hour: number; minute: number }) => {
    const hour = time.hour.toString().padStart(2, "0")
    const minute = time.minute.toString().padStart(2, "0")
    return `${hour}:${minute}`
  }

  return (
    <View className="mx-4 mb-6">
      <View className="bg-white rounded-2xl p-6 shadow-sm">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-semibold text-gray-900">Profile</Text>
          <TouchableOpacity onPress={onEdit}>
            <Text className="text-blue-600 font-medium">Edit</Text>
          </TouchableOpacity>
        </View>

        <View className="space-y-3">
          <View>
            <Text className="text-sm text-gray-600">Name</Text>
            <Text className="text-base text-gray-900 font-medium">{profile.name}</Text>
          </View>
          <View>
            <Text className="text-sm text-gray-600">Email</Text>
            <Text className="text-base text-gray-900">{profile.email}</Text>
          </View>
          <View>
            <Text className="text-sm text-gray-600">Wake Time</Text>
            <Text className="text-base text-gray-900 font-medium">{formatTime(profile.wakeTime)}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
