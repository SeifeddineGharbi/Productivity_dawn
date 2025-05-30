"use client"

import { useState } from "react"
import { WebPaywallDemo } from "../paywall/WebPaywallDemo"
import { WebAuthDemo } from "../auth/WebAuthDemo"
import { WebOnboardingDemo } from "../onboarding/WebOnboardingDemo"
import { WebTasksDemo } from "../tasks/WebTasksDemo"
import { WebAnalyticsDemo } from "../analytics/WebAnalyticsDemo"
import { WebSettingsDemo } from "../settings/WebSettingsDemo"

type Screen = "paywall" | "auth" | "onboarding" | "tasks" | "analytics" | "settings"

const screens = [
  { id: "paywall" as const, name: "💳 Paywall", description: "Premium subscription flow" },
  { id: "auth" as const, name: "🔐 Authentication", description: "Login & registration" },
  { id: "onboarding" as const, name: "👋 Onboarding", description: "User setup flow" },
  { id: "tasks" as const, name: "✅ Tasks", description: "Main productivity screen" },
  { id: "analytics" as const, name: "📊 Analytics", description: "Progress tracking" },
  { id: "settings" as const, name: "⚙️ Settings", description: "Profile & preferences" },
]

export const AppPreview = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("paywall")

  const renderScreen = () => {
    switch (currentScreen) {
      case "paywall":
        return <WebPaywallDemo />
      case "auth":
        return <WebAuthDemo />
      case "onboarding":
        return <WebOnboardingDemo />
      case "tasks":
        return <WebTasksDemo />
      case "analytics":
        return <WebAnalyticsDemo />
      case "settings":
        return <WebSettingsDemo />
      default:
        return <WebPaywallDemo />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Productivity Dawn</h1>
              <p className="text-gray-600">App Preview - All Screens</p>
            </div>
            <div className="text-sm text-gray-500">
              Current: <span className="font-semibold">{screens.find((s) => s.id === currentScreen)?.name}</span>
            </div>
          </div>

          {/* Screen Navigation */}
          <div className="flex flex-wrap gap-2">
            {screens.map((screen) => (
              <button
                key={screen.id}
                onClick={() => setCurrentScreen(screen.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentScreen === screen.id ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {screen.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Screen Content */}
      <div className="relative">{renderScreen()}</div>

      {/* Screen Info Footer */}
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 max-w-xs">
        <div className="text-sm">
          <div className="font-semibold text-gray-900">{screens.find((s) => s.id === currentScreen)?.name}</div>
          <div className="text-gray-600">{screens.find((s) => s.id === currentScreen)?.description}</div>
        </div>
      </div>
    </div>
  )
}
