"use client"

import { useState } from "react"
import { WelcomeScreen } from "../screens/WelcomeScreen"
import { SignInScreen } from "../screens/SignInScreen"
import { EmailRegistrationScreen } from "../screens/EmailRegistrationScreen"
import { EmailVerificationScreen } from "../screens/EmailVerificationScreen"
import { TasksScreen } from "../tasks/TasksScreen"
import { AnalyticsScreen } from "../analytics/AnalyticsScreen"

// Mock user data
const mockUser = {
  id: "user123",
  name: "Alex",
  email: "alex@example.com",
  wakeTime: { hour: 7, minute: 0 },
}

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<string>("welcome")
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [verificationEmail, setVerificationEmail] = useState<string>("")
  const [resendCooldown, setResendCooldown] = useState<number>(0)
  const [verificationSent, setVerificationSent] = useState<boolean>(false)

  // Mock authentication functions
  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setCurrentScreen("tasks")
    } catch (err) {
      setError("Google sign in failed")
    } finally {
      setLoading(false)
    }
  }

  const handleEmailSignUp = async (data: { email: string; password: string; name: string }) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setVerificationEmail(data.email)
      setCurrentScreen("verification")
    } catch (err) {
      setError("Registration failed")
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (data: { email: string; password: string; rememberMe: boolean }) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setCurrentScreen("tasks")
    } catch (err) {
      setError("Sign in failed")
    } finally {
      setLoading(false)
    }
  }

  const handleResendEmail = async () => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setVerificationSent(true)
      setResendCooldown(60)
      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err) {
      setError("Failed to resend verification email")
    } finally {
      setLoading(false)
    }
  }

  // Render the current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return (
          <WelcomeScreen
            onGoogleSignIn={handleGoogleSignIn}
            onEmailSignUp={() => setCurrentScreen("register")}
            onSignIn={() => setCurrentScreen("signin")}
            loading={loading}
          />
        )
      case "signin":
        return (
          <SignInScreen
            onSubmit={handleSignIn}
            onSignUp={() => setCurrentScreen("register")}
            onForgotPassword={() => console.log("Forgot password")}
            onBack={() => setCurrentScreen("welcome")}
            onGoogleSignIn={handleGoogleSignIn}
            loading={loading}
            error={error}
          />
        )
      case "register":
        return (
          <EmailRegistrationScreen
            onSubmit={handleEmailSignUp}
            onSignIn={() => setCurrentScreen("signin")}
            onBack={() => setCurrentScreen("welcome")}
            loading={loading}
            error={error}
          />
        )
      case "verification":
        return (
          <EmailVerificationScreen
            email={verificationEmail}
            onResendEmail={handleResendEmail}
            onChangeEmail={() => setCurrentScreen("register")}
            onContinue={() => setCurrentScreen("tasks")}
            resendLoading={loading}
            resendCooldown={resendCooldown}
            verificationSent={verificationSent}
          />
        )
      case "tasks":
        return <TasksScreen userId={mockUser.id} userName={mockUser.name} wakeTime={mockUser.wakeTime} />
      case "analytics":
        return <AnalyticsScreen userId={mockUser.id} userName={mockUser.name} />
      default:
        return <div>Screen not found</div>
    }
  }

  // Navigation bar for demo purposes
  const renderNavBar = () => {
    if (["tasks", "analytics"].includes(currentScreen)) {
      return (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 flex justify-around py-2">
          <button
            className={`px-4 py-2 ${currentScreen === "tasks" ? "text-blue-500" : "text-gray-500"}`}
            onClick={() => setCurrentScreen("tasks")}
          >
            Tasks
          </button>
          <button
            className={`px-4 py-2 ${currentScreen === "analytics" ? "text-blue-500" : "text-gray-500"}`}
            onClick={() => setCurrentScreen("analytics")}
          >
            Analytics
          </button>
          <button className="px-4 py-2 text-gray-500" onClick={() => setCurrentScreen("welcome")}>
            Logout
          </button>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-full relative">
      {renderScreen()}
      {renderNavBar()}
    </div>
  )
}
