import './globals.css'
import React from 'react'

export const metadata = { title: 'UBC Timetable' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  )
}
