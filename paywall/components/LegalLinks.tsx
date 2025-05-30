import type React from "react"
import { View, Text, TouchableOpacity, Linking, ActivityIndicator } from "react-native"
import { paywallAnalytics } from "../analytics-service"

interface LegalLinksProps {
  onRestorePurchases: () => void
  isRestoring: boolean
}

export const LegalLinks: React.FC<LegalLinksProps> = ({ onRestorePurchases, isRestoring }) => {
  const openTerms = () => {
    paywallAnalytics.trackLegalLinkTap("terms")
    Linking.openURL("https://productivitydawn.com/terms")
  }

  const openPrivacy = () => {
    paywallAnalytics.trackLegalLinkTap("privacy")
    Linking.openURL("https://productivitydawn.com/privacy")
  }

  return (
    <View className="items-center">
      {/* Restore Purchases */}
      <TouchableOpacity
        className="py-3 active:opacity-70"
        onPress={onRestorePurchases}
        disabled={isRestoring}
        activeOpacity={0.7}
      >
        {isRestoring ? (
          <View className="flex-row items-center">
            <ActivityIndicator size="small" color="#007AFF" className="mr-2" />
            <Text className="text-blue-500 font-medium">Restoring...</Text>
          </View>
        ) : (
          <Text className="text-blue-500 font-medium">Restore Purchase</Text>
        )}
      </TouchableOpacity>

      {/* Legal Links */}
      <View className="flex-row mt-4 space-x-6">
        <TouchableOpacity onPress={openTerms} activeOpacity={0.7}>
          <Text className="text-gray-500 text-sm underline">Terms of Service</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={openPrivacy} activeOpacity={0.7}>
          <Text className="text-gray-500 text-sm underline">Privacy Policy</Text>
        </TouchableOpacity>
      </View>

      {/* Disclaimer */}
      <Text className="text-gray-400 text-xs text-center mt-4 px-4 leading-relaxed">
        Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period.
      </Text>
    </View>
  )
}
