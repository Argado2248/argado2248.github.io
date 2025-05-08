import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Swedish News Fact Checker',
  description: 'A platform for reviewing and fact-checking Swedish news articles',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  )
} 