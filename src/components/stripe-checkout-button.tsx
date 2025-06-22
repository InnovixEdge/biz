import React from 'react'

interface StripeCheckoutButtonProps {
  children: React.ReactNode
  className?: string
  userId: string
}

const StripeCheckoutButton: React.FC<StripeCheckoutButtonProps> = ({ children, className, userId }) => {
  const handleClick = async () => {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })

    const data = await res.json()

    if (data.url) {
      window.location.href = data.url
    } else {
      alert('Failed to start checkout')
    }
  }

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  )
}

export default StripeCheckoutButton
