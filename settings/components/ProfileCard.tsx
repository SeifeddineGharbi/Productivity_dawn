import type React from "react"
import { View, Text, TouchableOpacity } from "../../utils/react-native-web"

interface UserProfile {
  name: string
  email: string
  wakeTime: { hour: number; minute: number }
  joinDate: string
}

interface ProfileCardProps {
  profile: UserProfile
  onEdit: () => void
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onEdit }) => {
  const formatWakeTime = (time: { hour: number; minute: number }) => {
    const hour = time.hour.toString().padStart(2, "0")
    const minute = time.minute.toString().padStart(2, "0")
    return `${hour}:${minute}`
  }

  return (
    <View className="mx-4 my-4 p-6 bg-white rounded-xl shadow-sm">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl font-bold text-gray-900">Profile</Text>
        <TouchableOpacity onPress={onEdit} className="px-3 py-1 bg-blue-50 rounded-lg">
          <Text className="text-blue-600 font-medium">Edit</Text>
        </TouchableOpacity>
      </View>

      <View className="space-y-3">
        <View>
          <Text className="text-sm text-gray-600">Name</Text>
          <Text className="text-base text-gray-900">{profile.name}</Text>
        </View>

        <View>
          <Text className="text-sm text-gray-600">Email</Text>
          <Text className="text-base text-gray-900">{profile.email}</Text>
        </View>

        <View>
          <Text className="text-sm text-gray-600">Wake Time</Text>
          <Text className="text-base text-gray-900">{formatWakeTime(profile.wakeTime)}</Text>
        </View>

        <View>
          <Text className="text-sm text-gray-600">Member Since</Text>
          <Text className="text-base text-gray-900">{new Date(profile.joinDate).toLocaleDateString()}</Text>
        </View>
      </View>
    </View>
  )
}
