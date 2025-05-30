"use client"

import type React from "react"
import { useState } from "react"
import { View, TouchableOpacity } from "react-native"
import { Button, SecondaryButton } from "./buttons"
import { Input, PasswordInput } from "./inputs"
import { Card } from "./cards"
import { H2, Body, BodySmall } from "./typography"

// Firebase Auth Components
interface AuthFormProps {
  onSubmit: (data: any) => Promise<void>
  loading?: boolean
  error?: string
}

export const SignInForm: React.FC<AuthFormProps> = ({ onSubmit, loading, error }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = () => {
    onSubmit({ email, password, rememberMe })
  }

  return (
    <Card padding="large">
      <H2 className="text-center mb-6">Welcome Back</H2>

      <Input
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Enter your email"
      />

      <PasswordInput label="Password" value={password} onChangeText={setPassword} placeholder="Enter your password" />

      <TouchableOpacity className="flex-row items-center mb-4" onPress={() => setRememberMe(!rememberMe)}>
        <View
          className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${
            rememberMe ? "bg-primary-500 border-primary-500" : "border-gray-300"
          }`}
        >
          {rememberMe && <BodySmall className="text-white">✓</BodySmall>}
        </View>
        <Body>Remember me</Body>
      </TouchableOpacity>

      {error && <BodySmall className="text-red-500 mb-4 text-center">{error}</BodySmall>}

      <Button onPress={handleSubmit} loading={loading} disabled={!email || !password} fullWidth className="mb-4">
        Sign In
      </Button>

      <TouchableOpacity>
        <BodySmall className="text-primary-500 text-center">Forgot password?</BodySmall>
      </TouchableOpacity>
    </Card>
  )
}

export const SignUpForm: React.FC<
  AuthFormProps & {
    onGoogleSignIn?: () => void
  }
> = ({ onSubmit, onGoogleSignIn, loading, error }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)

  const validatePassword = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    setPasswordStrength(strength)
  }

  const handleSubmit = () => {
    if (password !== confirmPassword) return
    onSubmit({ email, password })
  }

  const isValid = email && password && confirmPassword && password === confirmPassword && passwordStrength >= 3

  return (
    <Card padding="large">
      <H2 className="text-center mb-6">Create Your Account</H2>

      <Input
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Enter your email"
      />

      <PasswordInput
        label="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text)
          validatePassword(text)
        }}
        placeholder="Create a password"
        showStrength
        strength={passwordStrength}
      />

      <PasswordInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm your password"
        error={confirmPassword && password !== confirmPassword ? "Passwords must match" : undefined}
      />

      {error && <BodySmall className="text-red-500 mb-4 text-center">{error}</BodySmall>}

      <Button onPress={handleSubmit} loading={loading} disabled={!isValid} fullWidth className="mb-4">
        Create Account
      </Button>

      {onGoogleSignIn && (
        <>
          <View className="flex-row items-center my-4">
            <View className="flex-1 h-px bg-gray-300" />
            <BodySmall className="mx-4 text-gray-500">or</BodySmall>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          <SecondaryButton onPress={onGoogleSignIn} fullWidth>
            Continue with Google
          </SecondaryButton>
        </>
      )}
    </Card>
  )
}

// Firebase Connection Status
export const FirebaseStatus: React.FC<{
  connected: boolean
  className?: string
}> = ({ connected, className = "" }) => (
  <View className={`flex-row items-center space-x-2 ${className}`}>
    <View className={`w-2 h-2 rounded-full ${connected ? "bg-green-500" : "bg-red-500"}`} />
    <BodySmall className={connected ? "text-green-600" : "text-red-600"}>
      {connected ? "Connected" : "Disconnected"}
    </BodySmall>
  </View>
)

// Data Sync Component
export const DataSync: React.FC<{
  onSync: () => Promise<void>
  lastSyncTime?: Date
}> = ({ onSync, lastSyncTime }) => {
  const [syncing, setSyncing] = useState(false)

  const handleSync = async () => {
    setSyncing(true)
    try {
      await onSync()
    } finally {
      setSyncing(false)
    }
  }

  return (
    <View className="p-4 bg-gray-50 rounded-xl">
      <View className="flex-row items-center justify-between mb-2">
        <Body className="font-medium">Data Sync</Body>
        <TouchableOpacity onPress={handleSync} disabled={syncing}>
          <BodySmall className="text-primary-500">{syncing ? "Syncing..." : "Sync Now"}</BodySmall>
        </TouchableOpacity>
      </View>

      {lastSyncTime && (
        <BodySmall className="text-gray-600">Last synced: {lastSyncTime.toLocaleTimeString()}</BodySmall>
      )}
    </View>
  )
}
