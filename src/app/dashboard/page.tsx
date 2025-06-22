'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSession, signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  User, 
  Crown, 
  MessageSquare, 
  Calendar, 
  Settings, 
  TrendingUp,
  Loader2,
  ArrowRight,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Header from '@/components/header'
import Footer from '@/components/footer'
import UsageProgress from '@/components/usage-progress'
import StripeCheckoutButton from '@/components/stripe-checkout-button'

interface DashboardData {
  subscription: {
    tier: 'FREE' | 'PRO'
    status: string
    currentPeriodEnd: string | null
    cancelAtPeriodEnd: boolean
  }
  usage: {
    currentUsage: number
    limit: number
    remaining: number
    canUse: boolean
    percentageUsed: number
  }
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isManaging, setIsManaging] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (status === 'authenticated') {
      const refresh = searchParams.get('refreshSession')
      const success = searchParams.get('success')

      if (refresh === 'true') {
        signIn('credentials', { redirect: false })
      }

      fetchDashboardData()

      // If checkout success, refresh data and clean URL
      if (success === 'true') {
        fetchDashboardData()
        const newUrl = window.location.pathname // remove query string
        window.history.replaceState({}, '', newUrl)
      }
    }
  }, [status, router, searchParams])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/usage')
      const data = await response.json()
      setDashboardData(data)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleManageSubscription = async () => {
    if (!dashboardData || dashboardData.subscription.tier === 'FREE') return

    setIsManaging(true)
    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
      })
      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsManaging(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!session || !dashboardData) {
    return null
  }

  // Your JSX continues as-is below...
