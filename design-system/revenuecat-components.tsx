"use client"

import type React from "react"
import { useState } from "react"
import { View, TouchableOpacity } from "react-native"
import { Button } from "./buttons"
import { Card, PaywallCard } from "./cards"
import { H2, H3, Body, BodySmall } from "./typography"

interface SubscriptionPlan {
  id: string
  title: string
  price: string
  period: string
  savings?: string
  featured?: boolean
  trial?: string
}

interface PaywallProps {
  plans: SubscriptionPlan[]
  onPurchase: (planId: string) => Promise<void>
  onRestore: () => Promise<void>
  loading?: boolean
  error?: string
}

export const Paywall: React.FC<PaywallProps> = ({ plans, onPurchase, onRestore, loading, error }) => {
  const [selectedPlan, setSelectedPlan] = useState(plans.find((p) => p.featured)?.id || plans[0]?.id)
  const [purchasing, setPurchasing] = useState(false)

  const handlePurchase = async () => {
    if (!selectedPlan) return

    setPurchasing(true)
    try {
      await onPurchase(selectedPlan)
    } finally {
      setPurchasing(false)
    }
  }

  const selectedPlanData = plans.find((p) => p.id === selectedPlan)

  return (
    <View className="flex-1 bg-background p-4">
      <View className="items-center mb-8">
        <View className="bg-primary-500 px-4 py-2 rounded-full mb-4">
          <BodySmall className="text-white font-semibold">👑 PREMIUM</BodySmall>
        </View>

        <H2 className="text-center mb-2">Unlock Your Full</H2>
        <H2 className="text-center mb-4">Morning Potential</H2>

        <View className="space-y-2">
          <View className="flex-row items-center">
            <Body className="text-green-600 mr-2">✓</Body>
            <Body>Complete habit tracking</Body>
          </View>
          <View className="flex-row items-center">
            <Body className="text-green-600 mr-2">✓</Body>
            <Body>Detailed progress analytics</Body>
          </View>
          <View className="flex-row items-center">
            <Body className="text-green-600 mr-2">✓</Body>
            <Body>Smart reminder notifications</Body>
          </View>
          <View className="flex-row items-center">
            <Body className="text-green-600 mr-2">✓</Body>
            <Body>Personalized insights</Body>
          </View>
          <View className="flex-row items-center">
            <Body className="text-green-600 mr-2">✓</Body>
            <Body>Weekly progress reports</Body>
          </View>
        </View>
      </View>

      <View className="space-y-3 mb-6">
        {plans.map((plan) => (
          <TouchableOpacity key={plan.id} onPress={() => setSelectedPlan(plan.id)}>
            <PaywallCard featured={plan.featured}>
              {plan.featured && (
                <View className="bg-primary-500 px-3 py-1 rounded-full self-center mb-3">
                  <BodySmall className="text-white font-semibold">MOST POPULAR</BodySmall>
                </View>
              )}

              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <H3>{plan.title}</H3>
                  <Body className="text-gray-600">{plan.price}</Body>
                  {plan.savings && <BodySmall className="text-green-600 font-medium">{plan.savings}</BodySmall>}
                  {plan.trial && <BodySmall className="text-primary-500">{plan.trial}</BodySmall>}
                </View>

                <View
                  className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                    selectedPlan === plan.id ? "border-primary-500 bg-primary-500" : "border-gray-300"
                  }`}
                >
                  {selectedPlan === plan.id && <BodySmall className="text-white">✓</BodySmall>}
                </View>
              </View>
            </PaywallCard>
          </TouchableOpacity>
        ))}
      </View>

      {error && <BodySmall className="text-red-500 text-center mb-4">{error}</BodySmall>}

      <Button
        onPress={handlePurchase}
        loading={purchasing}
        disabled={!selectedPlan || loading}
        fullWidth
        className="mb-4"
      >
        {selectedPlanData?.trial ? "Start Free Trial" : "Subscribe Now"}
      </Button>

      <View className="flex-row items-center justify-center space-x-4">
        <TouchableOpacity onPress={onRestore}>
          <BodySmall className="text-primary-500">Restore Purchase</BodySmall>
        </TouchableOpacity>

        <BodySmall className="text-gray-400">|</BodySmall>

        <TouchableOpacity>
          <BodySmall className="text-gray-500">Terms</BodySmall>
        </TouchableOpacity>

        <BodySmall className="text-gray-400">|</BodySmall>

        <TouchableOpacity>
          <BodySmall className="text-gray-500">Privacy</BodySmall>
        </TouchableOpacity>
      </View>
    </View>
  )
}

// Subscription Status Component
export const SubscriptionStatus: React.FC<{
  isActive: boolean
  plan?: string
  expiresAt?: Date
  onManage?: () => void
}> = ({ isActive, plan, expiresAt, onManage }) => (
  <Card>
    <View className="flex-row items-center justify-between mb-2">
      <H3>Subscription</H3>
      <View className={`px-2 py-1 rounded ${isActive ? "bg-green-100" : "bg-red-100"}`}>
        <BodySmall className={isActive ? "text-green-800" : "text-red-800"}>
          {isActive ? "Active" : "Expired"}
        </BodySmall>
      </View>
    </View>

    {isActive && plan && <Body className="text-gray-600 mb-1">{plan}</Body>}

    {expiresAt && (
      <BodySmall className="text-gray-500 mb-4">
        {isActive ? "Renews" : "Expired"}: {expiresAt.toLocaleDateString()}
      </BodySmall>
    )}

    {onManage && (
      <Button variant="secondary" onPress={onManage}>
        Manage Subscription
      </Button>
    )}
  </Card>
)

// Purchase Success Component
export const PurchaseSuccess: React.FC<{
  plan: string
  trialEndDate?: Date
  onContinue: () => void
}> = ({ plan, trialEndDate, onContinue }) => (
  <View className="flex-1 items-center justify-center p-6">
    <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-6">
      <Body className="text-4xl">🎉</Body>
    </View>

    <H2 className="text-center mb-2">Welcome to Premium!</H2>

    <Body className="text-gray-600 text-center mb-4">
      {trialEndDate ? `Your 7-day free trial has started!` : `You now have access to all premium features.`}
    </Body>

    {trialEndDate && (
      <BodySmall className="text-gray-500 text-center mb-6">Trial ends: {trialEndDate.toLocaleDateString()}</BodySmall>
    )}

    <Button onPress={onContinue} fullWidth>
      Start Your Journey
    </Button>
  </View>
)
