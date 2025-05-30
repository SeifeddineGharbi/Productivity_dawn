"use client"

import { useState } from "react"

export const WebAuthDemo = () => {
  const [currentStep, setCurrentStep] = useState<"welcome" | "signin" | "register" | "verification">("welcome")
  const [email, setEmail] = useState("")

  const renderWelcome = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-xl">
        <div className="text-6xl mb-6">🌅</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Productivity Dawn</h1>
        <p className="text-gray-600 mb-8">Transform your mornings, transform your life</p>

        <div className="space-y-4">
          <button
            onClick={() => setCurrentStep("register")}
            className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
          >
            Get Started
          </button>
          <button
            onClick={() => setCurrentStep("signin")}
            className="w-full border border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            I already have an account
          </button>
        </div>
      </div>
    </div>
  )

  const renderSignIn = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl">
        <button onClick={() => setCurrentStep("welcome")} className="text-gray-500 mb-6 hover:text-gray-700">
          ← Back
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome back</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors">
            Sign In
          </button>

          <button className="w-full text-blue-500 font-medium hover:underline">Forgot password?</button>
        </div>
      </div>
    </div>
  )

  const renderRegister = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl">
        <button onClick={() => setCurrentStep("welcome")} className="text-gray-500 mb-6 hover:text-gray-700">
          ← Back
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create your account</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={() => setCurrentStep("verification")}
            className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
          >
            Create Account
          </button>

          <p className="text-xs text-gray-500 text-center">
            By creating an account, you agree to our Terms and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )

  const renderVerification = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-xl">
        <div className="text-6xl mb-6">📧</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Check your email</h2>
        <p className="text-gray-600 mb-6">
          We sent a verification link to
          <br />
          <span className="font-semibold">{email}</span>
        </p>

        <button className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors mb-4">
          Open Email App
        </button>

        <button className="text-blue-500 font-medium hover:underline">Resend verification email</button>
      </div>
    </div>
  )

  switch (currentStep) {
    case "welcome":
      return renderWelcome()
    case "signin":
      return renderSignIn()
    case "register":
      return renderRegister()
    case "verification":
      return renderVerification()
    default:
      return renderWelcome()
  }
}
