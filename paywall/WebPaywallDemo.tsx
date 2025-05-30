"use client"

import type React from "react"
import { useState } from "react"

// Web-compatible version matching our exact React Native paywall design
export const WebPaywallDemo: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handlePurchase = async (planType: "annual" | "weekly") => {
    setIsLoading(true)
    // Simulate RevenueCat purchase process
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 4000)
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-gray-100">
          <div className="text-7xl mb-6 animate-bounce">🎉</div>
          <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            <span className="mr-2">👑</span>
            PREMIUM ACTIVATED
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Welcome to Premium!</h2>
          <p className="text-gray-600 mb-2">Your subscription is now active.</p>
          <p className="text-sm text-blue-600 font-semibold mb-6">7-day free trial • Cancel anytime</p>
          <button
            onClick={() => setShowSuccess(false)}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Start Your Journey 🌅
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Premium Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
            <span className="mr-2 text-lg">👑</span>
            PREMIUM
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
            Unlock Your Full
            <br />
            Morning Potential
          </h1>
          <p className="text-gray-600 text-lg">
            Transform your mornings with advanced tracking and personalized insights
          </p>
        </div>

        {/* Features List */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">What you'll get:</h3>
          {features.map((feature, index) => (
            <div key={index} className="flex items-center mb-4">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <span className="text-gray-800 text-lg font-medium">{feature}</span>
            </div>
          ))}
        </div>

        {/* Annual Plan - MOST POPULAR */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border-3 border-blue-500 rounded-3xl p-6 mb-4 relative shadow-xl">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2 rounded-full shadow-lg">
              <span className="text-white font-bold text-sm">🔥 MOST POPULAR</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Annual Plan</h3>
            <div className="flex items-baseline mb-2">
              <span className="text-4xl font-bold text-gray-900">$24.99</span>
              <span className="text-lg text-gray-600 ml-2">/year</span>
            </div>
            <div className="bg-green-100 border border-green-300 rounded-xl px-4 py-2 mb-3 inline-block">
              <span className="text-green-800 font-bold text-sm">Save 52% vs weekly</span>
            </div>
            <p className="text-gray-700 font-semibold mb-4">Just $2.08/month</p>

            <button
              onClick={() => handlePurchase("annual")}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Processing...
                </div>
              ) : (
                "Choose Annual Plan"
              )}
            </button>
          </div>
        </div>

        {/* Weekly Plan */}
        <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 mb-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Weekly Plan</h3>
          <div className="flex items-baseline mb-2">
            <span className="text-4xl font-bold text-gray-900">$3.99</span>
            <span className="text-lg text-gray-600 ml-2">/week</span>
          </div>
          <div className="bg-blue-100 border border-blue-300 rounded-xl px-4 py-2 mb-4 inline-block">
            <span className="text-blue-800 font-bold text-sm">7-day free trial</span>
          </div>

          <button
            onClick={() => handlePurchase("weekly")}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Processing...
              </div>
            ) : (
              "Start Free Trial"
            )}
          </button>
        </div>

        {/* Legal Links */}
        <div className="text-center">
          <button className="text-blue-600 font-semibold text-lg mb-6 hover:underline">Restore Purchase</button>
          <div className="flex justify-center space-x-8 mb-6">
            <button className="text-gray-500 font-medium hover:underline">Terms of Service</button>
            <button className="text-gray-500 font-medium hover:underline">Privacy Policy</button>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
            Subscriptions auto-renew unless cancelled 24 hours before the end of the current period. You can cancel
            anytime in your account settings. Free trial automatically converts to paid subscription unless cancelled.
          </p>
        </div>
      </div>
    </div>
  )
}
