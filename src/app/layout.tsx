import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Matalino AI Business Mentor',
  description: 'Your AI-powered business guidance platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}