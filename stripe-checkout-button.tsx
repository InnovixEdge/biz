
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Crown, Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface StripeCheckoutButtonProps {
  className?: string
  children?: React.ReactNode
}

export default function StripeCheckoutButton({ className, children }: StripeCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  const handleCheckout = async () => {
    if (!session) {
      router.push('/auth/signin')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const { url } = await response.json()

      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading}
      className={className || "w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 font-semibold shadow-lg hover:shadow-xl transition-all"}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        children || (
          <>
            <Crown className="mr-2 h-4 w-4" />
            Upgrade to Pro
          </>
        )
      )}
    </Button>
  )
}
