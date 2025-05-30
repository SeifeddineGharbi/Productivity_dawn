import type React from "react"
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native"
import type { PricingPlan } from "../types"

interface PricingCardProps {
  plan: PricingPlan
  onPress: () => void
  isLoading: boolean
  disabled: boolean
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, onPress, isLoading, disabled }) => {
  const isPopular = plan.isPopular

  return (
    <View
      className={`
      rounded-2xl p-6 mb-4 relative
      ${isPopular ? "bg-blue-50 border-2 border-blue-500" : "bg-white border border-gray-200"}
    `}
    >
      {/* Popular Badge */}
      {isPopular && (
        <View className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <View className="bg-blue-500 px-4 py-1 rounded-full">
            <Text className="text-white font-bold text-sm">🔥 MOST POPULAR</Text>
          </View>
        </View>
      )}

      {/* Plan Details */}
      <View className={isPopular ? "mt-2" : ""}>
        <Text className="text-xl font-bold text-gray-900">{plan.title}</Text>
        <Text className="text-2xl font-bold text-gray-900 mt-1">{plan.price}</Text>

        {plan.period && <Text className="text-base text-gray-600">{plan.period}</Text>}

        {plan.savings && <Text className="text-green-600 font-semibold mt-1">{plan.savings}</Text>}

        {plan.trial && <Text className="text-green-600 font-semibold mt-1">{plan.trial}</Text>}
      </View>

      {/* CTA Button */}
      <TouchableOpacity
        className={`
          rounded-xl py-4 mt-4 items-center justify-center
          ${disabled || isLoading ? "bg-gray-300" : "bg-blue-500 active:bg-blue-600"}
        `}
        onPress={onPress}
        disabled={disabled || isLoading}
        activeOpacity={disabled || isLoading ? 1 : 0.8}
      >
        {isLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text
            className={`
            font-bold text-center
            ${disabled ? "text-gray-500" : "text-white"}
          `}
          >
            {plan.ctaText}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  )
}
