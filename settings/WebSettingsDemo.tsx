"use client"

import { useState } from "react"

export const WebSettingsDemo = () => {
  const [notifications, setNotifications] = useState({
    morning: true,
    reminders: true,
    weekly: false,
  })

  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    wakeTime: "07:00",
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings ⚙️</h1>
          <p className="text-gray-600">Manage your preferences</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{profile.name}</h3>
              <p className="text-gray-600">{profile.email}</p>
            </div>
          </div>
          <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">
            Edit Profile
          </button>
        </div>

        {/* Subscription Card */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Premium Plan</h3>
            <span className="text-2xl">👑</span>
          </div>
          <p className="text-blue-100 mb-4">Annual subscription • Renews Dec 15, 2024</p>
          <button className="bg-white bg-opacity-20 text-white py-2 px-4 rounded-lg font-medium hover:bg-opacity-30 transition-colors">
            Manage Subscription
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Notifications</h3>
          <div className="space-y-4">
            {[
              { key: "morning", label: "Morning reminders", description: "Daily routine notifications" },
              { key: "reminders", label: "Task reminders", description: "Individual task alerts" },
              { key: "weekly", label: "Weekly reports", description: "Progress summaries" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{item.label}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </div>
                <button
                  onClick={() =>
                    setNotifications({
                      ...notifications,
                      [item.key]: !notifications[item.key as keyof typeof notifications],
                    })
                  }
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications[item.key as keyof typeof notifications] ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications[item.key as keyof typeof notifications] ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Wake up time</span>
              <input
                type="time"
                value={profile.wakeTime}
                onChange={(e) => setProfile({ ...profile, wakeTime: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Theme</span>
              <select className="px-3 py-2 border border-gray-300 rounded-lg">
                <option>Light</option>
                <option>Dark</option>
                <option>Auto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Support Links */}
        <div className="bg-white rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
          <div className="space-y-3">
            {["Help Center", "Contact Support", "Privacy Policy", "Terms of Service", "Rate the App"].map(
              (item, index) => (
                <button
                  key={index}
                  className="w-full text-left py-3 text-gray-700 hover:text-blue-500 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  {item}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Sign Out */}
        <button className="w-full mt-6 bg-red-500 text-white py-4 rounded-xl font-semibold hover:bg-red-600 transition-colors">
          Sign Out
        </button>
      </div>
    </div>
  )
}
