'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import StripeCheckoutButton from '@/components/stripe-checkout-button'
import { useUser } from '@/hooks/useUser' // Adjust to your user hook or context
import { Crown } from 'lucide-react' // Assuming you use lucide icons

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const refreshSession = searchParams.get('refreshSession')
  const sessionId = searchParams.get('session_id')
  const { user, refreshUser } = useUser() // Your user state and refresh function
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (success === 'true' && refreshSession === 'true' && sessionId) {
      const refreshSubscription = async () => {
        try {
          // Optionally verify session with Stripe here if you want (not required if webhook trusted)
          // Just refresh subscription status from your DB
          const res = await fetch('/api/stripe/refresh-subscription', {
            method: 'POST',
          })

          if (!res.ok) {
            throw new Error('Failed to refresh subscription')
          }

          const data = await res.json()

          setMessage('Your account has been upgraded to Pro!')

          // Refresh user session/profile to update UI
          await refreshUser()
        } catch (error) {
          setMessage('Failed to verify upgrade. Please contact support.')
        }
      }

      refreshSubscription()
    }
  }, [success, refreshSession, sessionId, refreshUser])

  return (
    <div>
      {message && <p className="mb-4 text-green-600">{message}</p>}

      {/* Your existing dashboard content */}

      {user?.tier !== 'PRO' && (
        <StripeCheckoutButton className="w-full h-10 text-sm" userId={user.id}>
          <Crown className="mr-2 h-4 w-4" />
          Upgrade to Pro
        </StripeCheckoutButton>
      )}

      {user?.tier === 'PRO' && <p>You are on the Pro plan. Thank you!</p>}
    </div>
  )
}
