"use client"

import type React from "react"
import { useState } from "react"

// Web-compatible version of the paywall for Next.js preview
export const WebPaywallDemo: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handlePurchase = async (planType: "annual" | "weekly") => {
    setIsLoading(true)
    // Simulate purchase process
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 2000)
  }

  const features = [
    "Complete habit tracking",
    "Detailed progress analytics",
    "Smart reminder notifications",
    "Personalized insights",
    "Weekly progress reports",
  ]

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-xl">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Premium!</h2>
          <p className="text-gray-600 mb-6">Your subscription is now active. Enjoy all premium features!</p>
          <button
            onClick={() => setShowSuccess(false)}
            className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Premium Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span className="mr-2">👑</span>
            PREMIUM
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Unlock Your Full Morning Potential</h1>
          <p className="text-gray-600">Transform your mornings with advanced tracking and insights</p>
        </div>

        {/* Features List */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What you'll get:</h3>
          {features.map((feature, index) => (
            <div key={index} className="flex items-center mb-3">
              <span className="text-green-500 mr-3 text-lg">✓</span>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        {/* Annual Plan - MOST POPULAR */}
        <div className="bg-blue-50 border-2 border-blue-500 rounded-2xl p-6 mb-4 relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <div className="bg-blue-500 px-4 py-1 rounded-full">
              <span className="text-white font-bold text-sm">🔥 MOST POPULAR</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mt-2">Annual Plan</h3>
          <div className="text-2xl font-bold text-gray-900">$24.99/year</div>
          <div className="text-gray-600">Just $2.08/month</div>
          <div className="text-green-600 font-semibold">Save 52% vs weekly</div>

          <button
            onClick={() => handlePurchase("annual")}
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-4 rounded-xl font-bold mt-4 hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              "Choose Annual"
            )}
          </button>
        </div>

        {/* Weekly Plan */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900">Weekly Plan</h3>
          <div className="text-2xl font-bold text-gray-900">$3.99/week</div>
          <div className="text-green-600 font-semibold">7-day free trial</div>

          <button
            onClick={() => handlePurchase("weekly")}
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-4 rounded-xl font-bold mt-4 hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              "Start Free Trial"
            )}
          </button>
        </div>

        {/* Legal Links */}
        <div className="text-center">
          <button className="text-blue-500 font-medium mb-4 hover:underline">Restore Purchase</button>
          <div className="flex justify-center space-x-4">
            <button className="text-gray-500 text-sm hover:underline">Terms</button>
            <button className="text-gray-500 text-sm hover:underline">Privacy</button>
          </div>
          <p className="text-xs text-gray-400 mt-4 leading-relaxed">
            Subscriptions auto-renew unless cancelled. Cancel anytime in your account settings. Free trial automatically
            converts to paid subscription.
          </p>
        </div>
      </div>
    </div>
  )
}
