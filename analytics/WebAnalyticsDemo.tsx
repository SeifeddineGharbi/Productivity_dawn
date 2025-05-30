"use client"

import { useState } from "react"

export const WebAnalyticsDemo = () => {
  const [selectedWeek, setSelectedWeek] = useState("This Week")

  const weekData = [
    { day: "Mon", completed: 5, total: 5, percentage: 100 },
    { day: "Tue", completed: 4, total: 5, percentage: 80 },
    { day: "Wed", completed: 5, total: 5, percentage: 100 },
    { day: "Thu", completed: 3, total: 5, percentage: 60 },
    { day: "Fri", completed: 5, total: 5, percentage: 100 },
    { day: "Sat", completed: 4, total: 5, percentage: 80 },
    { day: "Sun", completed: 2, total: 5, percentage: 40 },
  ]

  const weeklyAverage = Math.round(weekData.reduce((acc, day) => acc + day.percentage, 0) / weekData.length)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics 📊</h1>
          <p className="text-gray-600">Track your progress and insights</p>
        </div>

        {/* Week Selector */}
        <div className="bg-white rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center">
            <button className="text-gray-400">←</button>
            <h3 className="font-semibold text-gray-900">{selectedWeek}</h3>
            <button className="text-gray-400">→</button>
          </div>
        </div>

        {/* Weekly Overview */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 mb-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Weekly Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold">{weeklyAverage}%</div>
              <div className="text-blue-100">Average completion</div>
            </div>
            <div>
              <div className="text-2xl font-bold">7</div>
              <div className="text-blue-100">Current streak</div>
            </div>
          </div>
        </div>

        {/* Progress Grid */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Daily Progress</h3>
          <div className="grid grid-cols-7 gap-2">
            {weekData.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-500 mb-2">{day.day}</div>
                <div
                  className={`w-8 h-8 rounded-lg mx-auto flex items-center justify-center text-xs font-semibold ${
                    day.percentage === 100
                      ? "bg-green-500 text-white"
                      : day.percentage >= 80
                        ? "bg-blue-500 text-white"
                        : day.percentage >= 60
                          ? "bg-yellow-500 text-white"
                          : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {day.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Breakdown */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Task Breakdown</h3>
          <div className="space-y-3">
            {[
              { name: "Meditation", completed: 6, total: 7, color: "bg-purple-500" },
              { name: "Exercise", completed: 5, total: 7, color: "bg-blue-500" },
              { name: "Reading", completed: 4, total: 7, color: "bg-green-500" },
              { name: "Water intake", completed: 7, total: 7, color: "bg-cyan-500" },
            ].map((task, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${task.color} mr-3`} />
                  <span className="text-gray-700">{task.name}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {task.completed}/{task.total}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-white rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">💡 Insights</h3>
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-800">🎉 Great job! You're on a 7-day streak. Keep it up!</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">📈 Your morning routine completion improved by 15% this week.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
