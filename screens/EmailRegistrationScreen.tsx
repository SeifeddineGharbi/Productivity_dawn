"use client"

import React from "react"
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from "react-native"

interface PasswordRequirement {
  id: string
  text: string
  validator: (password: string) => boolean
}

interface EmailRegistrationScreenProps {
  onSubmit: (data: { email: string; password: string; name: string }) => Promise<void>
  onSignIn: () => void
  onBack: () => void
  loading?: boolean
  error?: string
}

const passwordRequirements: PasswordRequirement[] = [
  {
    id: "length",
    text: "At least 8 characters",
    validator: (password) => password.length >= 8,
  },
  {
    id: "uppercase",
    text: "One uppercase letter",
    validator: (password) => /[A-Z]/.test(password),
  },
  {
    id: "lowercase",
    text: "One lowercase letter",
    validator: (password) => /[a-z]/.test(password),
  },
  {
    id: "number",
    text: "One number",
    validator: (password) => /\d/.test(password),
  },
  {
    id: "special",
    text: "One special character",
    validator: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
]

export const EmailRegistrationScreen: React.FC<EmailRegistrationScreenProps> = ({
  onSubmit,
  onSignIn,
  onBack,
  loading = false,
  error,
}) => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [focusedField, setFocusedField] = React.useState<string | null>(null)
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

  // Validation states
  const passwordRequirementsMet = passwordRequirements.map((req) => ({
    ...req,
    met: req.validator(formData.password),
  }))

  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword
  const allRequirementsMet = passwordRequirementsMet.every((req) => req.met)
  const isFormValid = formData.name && formData.email && allRequirementsMet && passwordsMatch

  const handleSubmit = async () => {
    if (isFormValid && !loading) {
      await onSubmit({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
    }
  }

  const getInputBorderColor = (fieldName: string, hasError?: boolean) => {
    if (hasError) return "border-red-300 bg-red-50"
    if (focusedField === fieldName) return "border-blue-500 bg-white"
    return "border-gray-300 bg-white"
  }

  return (
    <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
      <View className="flex-1 px-6 py-8">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <TouchableOpacity
            className="p-2 rounded-lg active:bg-gray-200"
            onPress={onBack}
            disabled={loading}
            activeOpacity={0.7}
          >
            <Text className="text-blue-600 font-medium text-base">← Back</Text>
          </TouchableOpacity>

          <TouchableOpacity className="active:opacity-70" onPress={onSignIn} disabled={loading} activeOpacity={0.7}>
            <Text className="text-blue-600 font-medium text-base">Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</Text>
          <Text className="text-base text-gray-600">Join thousands who've transformed their mornings</Text>
        </View>

        {/* Form */}
        <View className="space-y-6">
          {/* Name Input */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">Full Name</Text>
            <TextInput
              className={`
                px-4 py-4 rounded-xl border text-base
                ${getInputBorderColor("name")}
              `}
              placeholder="Enter your full name"
              placeholderTextColor="#9CA3AF"
              value={formData.name}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, name: text }))}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              autoCapitalize="words"
              editable={!loading}
            />
          </View>

          {/* Email Input */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">Email Address</Text>
            <TextInput
              className={`
                px-4 py-4 rounded-xl border text-base
                ${getInputBorderColor("email")}
              `}
              placeholder="Enter your email address"
              placeholderTextColor="#9CA3AF"
              value={formData.email}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, email: text }))}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
          </View>

          {/* Password Input */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
            <View className="relative">
              <TextInput
                className={`
                  px-4 py-4 rounded-xl border text-base pr-12
                  ${getInputBorderColor("password")}
                `}
                placeholder="Create a strong password"
                placeholderTextColor="#9CA3AF"
                value={formData.password}
                onChangeText={(text) => setFormData((prev) => ({ ...prev, password: text }))}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
              <TouchableOpacity
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
              >
                <Text className="text-blue-600 font-medium text-sm">{showPassword ? "Hide" : "Show"}</Text>
              </TouchableOpacity>
            </View>

            {/* Password Requirements */}
            {formData.password.length > 0 && (
              <View className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                <Text className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</Text>
                <View className="space-y-1">
                  {passwordRequirementsMet.map((req) => (
                    <View key={req.id} className="flex-row items-center">
                      <Text className={`mr-2 text-sm ${req.met ? "text-green-600" : "text-gray-400"}`}>
                        {req.met ? "✓" : "○"}
                      </Text>
                      <Text className={`text-sm ${req.met ? "text-green-700" : "text-gray-600"}`}>{req.text}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Confirm Password Input */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">Confirm Password</Text>
            <View className="relative">
              <TextInput
                className={`
                  px-4 py-4 rounded-xl border text-base pr-12
                  ${getInputBorderColor("confirmPassword", formData.confirmPassword.length > 0 && !passwordsMatch)}
                `}
                placeholder="Confirm your password"
                placeholderTextColor="#9CA3AF"
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData((prev) => ({ ...prev, confirmPassword: text }))}
                onFocus={() => setFocusedField("confirmPassword")}
                onBlur={() => setFocusedField(null)}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
              <TouchableOpacity
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                activeOpacity={0.7}
              >
                <Text className="text-blue-600 font-medium text-sm">{showConfirmPassword ? "Hide" : "Show"}</Text>
              </TouchableOpacity>
            </View>

            {/* Password Match Indicator */}
            {formData.confirmPassword.length > 0 && (
              <View className="mt-2">
                <View className="flex-row items-center">
                  <Text className={`mr-2 text-sm ${passwordsMatch ? "text-green-600" : "text-red-600"}`}>
                    {passwordsMatch ? "✓" : "✗"}
                  </Text>
                  <Text className={`text-sm ${passwordsMatch ? "text-green-700" : "text-red-600"}`}>
                    {passwordsMatch ? "Passwords match" : "Passwords don't match"}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Error Message */}
        {error && (
          <View className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
            <Text className="text-red-700 text-sm text-center">{error}</Text>
          </View>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          className={`
            mt-8 py-4 px-6 rounded-xl flex-row items-center justify-center
            ${isFormValid && !loading ? "bg-blue-500 active:bg-blue-600" : "bg-gray-300"}
          `}
          onPress={handleSubmit}
          disabled={!isFormValid || loading}
          activeOpacity={isFormValid && !loading ? 0.8 : 1}
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text className={`font-semibold text-base ${isFormValid ? "text-white" : "text-gray-500"}`}>
              Create Account
            </Text>
          )}
        </TouchableOpacity>

        {/* Footer */}
        <View className="mt-6">
          <Text className="text-xs text-center text-gray-500 leading-relaxed">
            By creating an account, you agree to our <Text className="text-blue-600 underline">Terms of Service</Text>{" "}
            and <Text className="text-blue-600 underline">Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

// Usage Example
export const EmailRegistrationScreenExample: React.FC = () => {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string>("")

  const handleSubmit = async (data: { email: string; password: string; name: string }) => {
    setLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random error for demo
          if (Math.random() > 0.7) {
            reject(new Error("Email already exists"))
          } else {
            resolve(data)
          }
        }, 2000)
      })

      console.log("Registration successful:", data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <EmailRegistrationScreen
      onSubmit={handleSubmit}
      onSignIn={() => console.log("Navigate to Sign In")}
      onBack={() => console.log("Navigate Back")}
      loading={loading}
      error={error}
    />
  )
}
