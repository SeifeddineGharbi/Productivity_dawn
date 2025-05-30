"use client"

import { useState } from "react"

export const WebAuthDemo = () => {
  const [currentStep, setCurrentStep] = useState<"welcome" | "signin" | "register" | "verification">("welcome")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAuth = async () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      if (currentStep === "register") {
        setCurrentStep("verification")
      }
    }, 2000)
  }

  const renderWelcome = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-gray-100">
        <div className="text-8xl mb-8">🌅</div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent mb-4">
          Productivity Dawn
        </h1>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Transform your mornings,
          <br />
          transform your life
        </p>

        <div className="space-y-4">
          <button
            onClick={() => setCurrentStep("register")}
            className="w-full bg-gradient-to-r from-orange-500 to-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Get Started Free
          </button>
          <button
            onClick={() => setCurrentStep("signin")}
            className="w-full border-2 border-gray-300 text-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-colors"
          >
            I already have an account
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-6">Join thousands transforming their mornings</p>
      </div>
    </div>
  )

  const renderSignIn = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100">
        <button
          onClick={() => setCurrentStep("welcome")}
          className="text-gray-500 mb-6 hover:text-gray-700 flex items-center font-medium"
        >
          ← Back
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
          <p className="text-gray-600">Continue your morning transformation</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Password</label>
            <input
              type="password"
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleAuth}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </button>

          <button className="w-full text-blue-600 font-semibold hover:underline">Forgot your password?</button>
        </div>
      </div>
    </div>
  )

  const renderRegister = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100">
        <button
          onClick={() => setCurrentStep("welcome")}
          className="text-gray-500 mb-6 hover:text-gray-700 flex items-center font-medium"
        >
          ← Back
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
          <p className="text-gray-600">Start your morning transformation journey</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Create Password</label>
            <input
              type="password"
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleAuth}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Creating account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>

          <p className="text-xs text-gray-500 text-center leading-relaxed">
            By creating an account, you agree to our
            <br />
            <span className="text-blue-600 hover:underline cursor-pointer">Terms of Service</span> and{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  )

  const renderVerification = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-gray-100">
        <div className="text-8xl mb-8">📧</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Check your email</h2>
        <p className="text-gray-600 mb-2 text-lg">We sent a verification link to</p>
        <p className="font-bold text-gray-900 mb-8 text-lg">{email}</p>

        <div className="space-y-4">
          <button className="w-full bg-gradient-to-r from-orange-500 to-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            Open Email App
          </button>

          <button className="text-blue-600 font-semibold hover:underline">Resend verification email</button>
        </div>

        <p className="text-sm text-gray-500 mt-8">Didn't receive the email? Check your spam folder</p>
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
