
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
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
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isManaging, setIsManaging] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (status === 'authenticated') {
      fetchDashboardData()
    }
  }, [status, router])

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

  const { subscription, usage } = dashboardData
  const isPro = subscription.tier === 'PRO'

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-24 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-4 py-2 text-sm font-medium text-blue-700">
              <Settings className="w-4 h-4" />
              <span>Account Dashboard</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">{session.user.name}</span>
            </h1>
            <p className="text-lg text-gray-600">
              Manage your subscription and track your Matalino AI usage
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Subscription Status */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-white shadow-lg border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-gray-900">
                    {isPro ? (
                      <Crown className="w-5 h-5 text-yellow-500" />
                    ) : (
                      <User className="w-5 h-5 text-gray-500" />
                    )}
                    <span>Subscription</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold ${
                      isPro 
                        ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {isPro && <Crown className="w-4 h-4" />}
                      <span>{subscription.tier} Plan</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {isPro ? '$15/month' : 'Free forever'}
                    </p>
                  </div>
                  
                  {isPro && subscription.currentPeriodEnd && (
                    <div className="text-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mx-auto mb-1" />
                      <p>Renews {new Date(subscription.currentPeriodEnd).toLocaleDateString()}</p>
                      {subscription.cancelAtPeriodEnd && (
                        <p className="text-red-600 mt-1">Cancels at period end</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Usage Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white shadow-lg border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-gray-900">
                    <MessageSquare className="w-5 h-5 text-blue-500" />
                    <span>Usage</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <UsageProgress 
                    currentUsage={usage.currentUsage}
                    limit={usage.limit}
                    tier={subscription.tier}
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-white shadow-lg border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-gray-900">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {!isPro ? (
                    <StripeCheckoutButton className="w-full h-10 text-sm">
                      <Crown className="mr-2 h-4 w-4" />
                      Upgrade to Pro
                    </StripeCheckoutButton>
                  ) : (
                    <Button
                      onClick={handleManageSubscription}
                      disabled={isManaging}
                      variant="outline"
                      className="w-full h-10 text-sm"
                    >
                      {isManaging ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <ExternalLink className="mr-2 h-4 w-4" />
                      )}
                      Manage Subscription
                    </Button>
                  )}
                  
                  <Button
                    onClick={() => router.push('/#chatbot')}
                    className="w-full h-10 text-sm bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Start Chatting
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Usage Warning */}
          {usage.percentageUsed >= 80 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className={`border-2 ${
                usage.percentageUsed >= 95 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-yellow-300 bg-yellow-50'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-semibold ${
                        usage.percentageUsed >= 95 ? 'text-red-800' : 'text-yellow-800'
                      }`}>
                        {usage.percentageUsed >= 95 
                          ? 'Usage Limit Nearly Reached!' 
                          : 'High Usage Alert'
                        }
                      </h3>
                      <p className={`text-sm mt-1 ${
                        usage.percentageUsed >= 95 ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        You've used {usage.percentageUsed}% of your monthly message limit. 
                        {!isPro && ' Upgrade to Pro for 20x more messages!'}
                      </p>
                    </div>
                    {!isPro && (
                      <StripeCheckoutButton className="ml-4">
                        Upgrade Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </StripeCheckoutButton>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Feature Comparison */}
          {!isPro && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-200">
                <CardContent className="p-8 text-center">
                  <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Unlock Pro Features
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Get 20x more messages, advanced AI features, and priority support
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">500</div>
                      <div className="text-sm text-gray-600">Messages/month</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">Advanced</div>
                      <div className="text-sm text-gray-600">AI Features</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">Priority</div>
                      <div className="text-sm text-gray-600">Support</div>
                    </div>
                  </div>
                  <StripeCheckoutButton className="px-8">
                    Upgrade to Pro - $15/month
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </StripeCheckoutButton>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
