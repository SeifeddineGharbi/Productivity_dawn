"use client"

import type React from "react"
import { SettingsScreen } from "./SettingsScreen"

export const SettingsScreenExample: React.FC = () => {
  // Mock user data
  const mockUserId = "user123"

  const handleLogout = () => {
    console.log("User logged out")
  }

  return <SettingsScreen userId={mockUserId} onLogout={handleLogout} />
}
