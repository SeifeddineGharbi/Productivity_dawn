"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface MobileContainerProps {
  children: React.ReactNode
  className?: string
  width?: number
  height?: number
  showStatusBar?: boolean
  statusBarColor?: string
  showNotch?: boolean
  showHomeIndicator?: boolean
}

export function MobileContainer({
  children,
  className,
  width = 375,
  height = 812,
  showStatusBar = true,
  statusBarColor = "#000000",
  showNotch = true,
  showHomeIndicator = true,
}: MobileContainerProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div
        className={cn(
          "relative bg-white overflow-hidden shadow-2xl rounded-[40px] border-8 border-gray-900",
          className,
        )}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          maxWidth: "100vw",
          maxHeight: "100vh",
        }}
      >
        {showStatusBar && (
          <div
            className="absolute top-0 left-0 right-0 h-6 z-50 flex items-center justify-between px-6"
            style={{ backgroundColor: statusBarColor }}
          >
            <div className="text-white text-xs">9:41</div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-2 bg-white rounded-sm"></div>
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        )}

        {showNotch && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl z-50"></div>
        )}

        <div
          className="h-full overflow-y-auto"
          style={{
            paddingTop: showStatusBar ? "24px" : "0",
            paddingBottom: showHomeIndicator ? "24px" : "0",
          }}
        >
          {children}
        </div>

        {showHomeIndicator && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-900 rounded-full z-50"></div>
        )}
      </div>
    </div>
  )
}
