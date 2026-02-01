import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TechShop - Demo Store',
  description: 'A modern e-commerce demo built with Next.js',
  // Meta theme color matches page background (Web Interface Guideline: meta-theme-color)
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'
  ),
}

export const viewport: Viewport = {
  // Allow users to zoom (Web Interface Guideline: no user-scalable=no)
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Skip link for keyboard navigation (Web Interface Guideline: skip-link) */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
