import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import AuthProvider from '@/components/auth-provider'
import { Toaster } from 'sonner' // ✅ NEW

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Matalino AI - Your Ultimate Business Mentor',
  description: 'Transform your financial future with Matalino AI, the intelligent business mentor that provides expert guidance on building profitable and scalable ventures.',
  keywords: 'business mentor, AI chatbot, financial freedom, entrepreneurship, passive income, business strategy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster position="top-center" richColors /> {/* ✅ Add Toaster here */}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
