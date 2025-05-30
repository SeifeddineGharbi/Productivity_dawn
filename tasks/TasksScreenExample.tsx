"use client"

import type React from "react"
import { TasksScreen } from "./TasksScreen"

export const TasksScreenExample: React.FC = () => {
  // Mock user data
  const mockUserId = "user123"
  const mockUserName = "Alex"
  const mockWakeTime = { hour: 7, minute: 0 }

  return <TasksScreen userId={mockUserId} userName={mockUserName} wakeTime={mockWakeTime} />
}
