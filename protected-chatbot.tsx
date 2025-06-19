
'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  Crown, 
  Lock, 
  Loader2,
  ArrowRight,
  AlertTriangle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import StripeCheckoutButton from './stripe-checkout-button'

interface UsageData {
  subscription: {
    tier: 'FREE' | 'PRO'
    status: string
  }
  usage: {
    currentUsage: number
    limit: number
    remaining: number
    canUse: boolean
    percentageUsed: number
  }
}

interface ProtectedChatbotProps {
  onMessageSend?: () => void
}

export default function ProtectedChatbot({ onMessageSend }: ProtectedChatbotProps) {
  const { data: session, status } = useSession()
  const [usageData, setUsageData] = useState<UsageData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false)

  useEffect(() => {
    if (session) {
      fetchUsageData()
    }
  }, [session])

  const fetchUsageData = async () => {
    if (!session) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/usage')
      const data = await response.json()
      setUsageData(data)
      
      // Show upgrade prompt if usage is high
      if (data.usage.percentageUsed >= 80 && data.subscription.tier === 'FREE') {
        setShowUpgradePrompt(true)
      }
    } catch (error) {
      console.error('Error fetching usage data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChatInteraction = async () => {
    if (!session || !usageData) return

    // Track usage for authenticated users
    try {
      const response = await fetch('/api/track-usage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'chat_message' })
      })

      const result = await response.json()
      
      if (response.status === 429) {
        // Usage limit exceeded
        setUsageData(result)
        setShowUpgradePrompt(true)
        return false
      }

      // Update usage data
      setUsageData(result)
      onMessageSend?.()
      return true
    } catch (error) {
      console.error('Error tracking usage:', error)
      return true // Allow usage if tracking fails
    }
  }

  // For unauthenticated users, show sign-up prompt
  if (status === 'unauthenticated') {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl flex items-center justify-center mx-auto">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Start Your Free Account
            </h3>
            <p className="text-gray-600">
              Sign up to get 25 free messages per month with Matalino AI
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/auth/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 w-full">
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="outline" className="w-full">
                Already have an account? Sign in
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  // Loading state
  if (status === 'loading' || isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
        <p className="text-gray-600 mt-4">Loading your chat session...</p>
      </div>
    )
  }

  // Usage limit exceeded
  if (usageData && !usageData.usage.canUse) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-red-200 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-red-600" />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Monthly Limit Reached
            </h3>
            <p className="text-gray-600">
              You've used all {usageData.usage.limit} messages for this month.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
            <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Upgrade to Pro</h4>
            <p className="text-sm text-gray-600 mb-4">
              Get 500 messages per month, advanced AI features, and priority support
            </p>
            <StripeCheckoutButton>
              Upgrade Now - $15/month
            </StripeCheckoutButton>
          </div>
        </motion.div>
      </div>
    )
  }

  // Normal chatbot with usage tracking
  return (
    <div className="space-y-4">
      {/* Usage indicator for authenticated users */}
      {usageData && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${
                usageData.usage.percentageUsed >= 90 
                  ? 'bg-red-500' 
                  : usageData.usage.percentageUsed >= 70 
                  ? 'bg-yellow-500' 
                  : 'bg-green-500'
              }`} />
              <span className="text-sm font-medium text-gray-700">
                {usageData.usage.remaining} messages remaining this month
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              {usageData.subscription.tier === 'PRO' && (
                <Crown className="w-4 h-4 text-yellow-500" />
              )}
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                usageData.subscription.tier === 'PRO' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {usageData.subscription.tier}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Upgrade prompt overlay */}
      <AnimatePresence>
        {showUpgradePrompt && usageData?.subscription.tier === 'FREE' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 text-white relative"
          >
            <button
              onClick={() => setShowUpgradePrompt(false)}
              className="absolute top-2 right-2 text-white/80 hover:text-white text-xl"
            >
              ×
            </button>
            
            <div className="flex items-center space-x-4">
              <AlertTriangle className="w-8 h-8 text-yellow-300" />
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Running Low on Messages!</h4>
                <p className="text-sm text-white/90">
                  You've used {usageData.usage.percentageUsed}% of your monthly limit. Upgrade to Pro for 20x more messages!
                </p>
              </div>
              <StripeCheckoutButton className="bg-white text-blue-600 hover:bg-gray-100">
                Upgrade
              </StripeCheckoutButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot iframe with tracking */}
      <div className="bg-white rounded-xl shadow-2xl p-2 border border-gray-200">
        <div className="rounded-lg overflow-hidden">
          <iframe
            src="https://apps.abacus.ai/chatllm/?appId=61cb34b2a&hideTopBar=2"
            width="100%"
            height="800"
            style={{ border: 'none', minHeight: '800px' }}
            title="Matalino AI Business Mentor"
            className="w-full"
            onLoad={() => {
              // Set up message listener for iframe communication
              const handleMessage = (event: MessageEvent) => {
                if (event.data?.type === 'chatbot_message_sent') {
                  handleChatInteraction()
                }
              }
              window.addEventListener('message', handleMessage)
              return () => window.removeEventListener('message', handleMessage)
            }}
          />
        </div>
      </div>
    </div>
  )
}
