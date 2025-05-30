import type React from "react"
import { View, Text, TouchableOpacity } from "../../utils/react-native-web"

interface SupportLinksProps {
  onRateApp: () => void
  onContactSupport: () => void
  onPrivacyPolicy: () => void
  onTermsOfService: () => void
}

export const SupportLinks: React.FC<SupportLinksProps> = ({
  onRateApp,
  onContactSupport,
  onPrivacyPolicy,
  onTermsOfService,
}) => {
  const links = [
    { title: "Rate App", onPress: onRateApp },
    { title: "Contact Support", onPress: onContactSupport },
    { title: "Privacy Policy", onPress: onPrivacyPolicy },
    { title: "Terms of Service", onPress: onTermsOfService },
  ]

  return (
    <View className="mx-4 mb-6">
      <View className="bg-white rounded-2xl p-6 shadow-sm">
        <Text className="text-lg font-semibold text-gray-900 mb-4">Support</Text>

        <View className="space-y-3">
          {links.map((link, index) => (
            <TouchableOpacity key={index} onPress={link.onPress} className="py-2">
              <Text className="text-blue-600 font-medium">{link.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  )
}
