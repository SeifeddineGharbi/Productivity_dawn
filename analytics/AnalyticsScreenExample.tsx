"use client"

import type React from "react"
import { AnalyticsScreen } from "./AnalyticsScreen"

export const AnalyticsScreenExample: React.FC = () => {
  // Mock user data
  const mockUserId = "user123"
  const mockUserName = "Alex"

  return <AnalyticsScreen userId={mockUserId} userName={mockUserName} />
}
