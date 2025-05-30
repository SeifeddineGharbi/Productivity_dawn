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
  const LinkItem = ({ title, onPress }: { title: string; onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} className="py-3 border-b border-gray-100 last:border-b-0">
      <View className="flex-row items-center justify-between">
        <Text className="text-base text-gray-900">{title}</Text>
        <Text className="text-gray-400">→</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View className="mx-4 my-4 p-6 bg-white rounded-xl shadow-sm">
      <Text className="text-xl font-bold text-gray-900 mb-4">Support & Legal</Text>

      <View>
        <LinkItem title="Rate App" onPress={onRateApp} />
        <LinkItem title="Contact Support" onPress={onContactSupport} />
        <LinkItem title="Privacy Policy" onPress={onPrivacyPolicy} />
        <LinkItem title="Terms of Service" onPress={onTermsOfService} />
      </View>
    </View>
  )
}
