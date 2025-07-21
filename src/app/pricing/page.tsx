
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Check, Crown, MessageSquare, Zap, Sparkles, ArrowRight, X } from 'lucide-react'
import CreditTooltip from '@/components/credit-tooltip'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import StripeCheckoutButton from '@/components/stripe-checkout-button'

export default function PricingPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { data: session } = useSession()

  const features = [
    {
      feature: "Monthly Messages",
      feature: "Monthly AI Credits",
      free: "25 credits",
      pro: "500 credits"
    },
    {
      feature: "Equivalent Messages",
      free: "25 messages",
      pro: "500 messages"
    },
    {
      feature: "AI Model Access",
      free: "Basic AI",
      pro: "Full Matalino AI"
    },
    {
      feature: "Response Speed",
      free: "Standard",
      pro: "Priority (Faster)"
    },
    {
      feature: "Support Level",
      free: "Standard email",
      pro: "Priority support"
    },
    {
      feature: "Business Strategy Insights",
      free: "Basic guidance",
      pro: "Detailed strategies"
    },
    {
      feature: "Advanced Tools",