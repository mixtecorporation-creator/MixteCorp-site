import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'

export const metadata: Metadata = {
  title: 'Mixte — Creative Technology Studio',
  description: 'Mixte Corporation is a creative technology studio crafting innovative applications and digital solutions that push boundaries and redefine possibilities.',
  keywords: ['technology', 'apps', 'mobile development', 'software', 'innovation'],
  authors: [{ name: 'Mixte Corporation' }],
  openGraph: {
    title: 'Mixte — Creative Technology Studio',
    description: 'Creative technology studio crafting innovative applications and digital solutions.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mixte — Creative Technology Studio',
    description: 'Creative technology studio crafting innovative applications and digital solutions.',
  },
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body><ThemeProvider><AuthProvider>{children}</AuthProvider></ThemeProvider></body>
    </html>
  )
}