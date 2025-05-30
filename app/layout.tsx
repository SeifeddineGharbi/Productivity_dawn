import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Productivity Dawn",
  description: "Morning mastery app",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-md mx-auto h-screen bg-gray-50 overflow-hidden">{children}</div>
      </body>
    </html>
  )
}
