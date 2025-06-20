
import Stripe from 'stripe'

// Use a fallback key during build time to prevent build failures
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_fallback_key_for_build'

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-05-28.basil',
})

export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID || 'price_1234567890' // Will be set after creating product in Stripe
