
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Check, Crown, MessageSquare, Zap, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import StripeCheckoutButton from './stripe-checkout-button'

export default function PricingSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { data: session } = useSession()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 border-t-4 border-blue-600 shadow-lg">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-16"
        >
          <div className="flex items-center justify-center space-x-2 text-blue-600">
            <Crown className="w-6 h-6" />
            <span className="text-sm font-semibold uppercase tracking-wide">Simple Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Business Journey</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Start free and upgrade when you're ready to unlock the full power of Matalino AI
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="relative h-full border-2 border-gray-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-8">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-4">
                  <MessageSquare className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Free</h3>
                <div className="text-4xl font-bold text-gray-900 mt-2">
                  $0<span className="text-lg font-normal text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 mt-2">Perfect to get started</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">25 messages per month</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Basic AI responses</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Standard support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Basic business guidance</span>
                  </li>
                </ul>
                <div className="pt-4">
                  {session ? (
                    <Button
                      onClick={() => scrollToSection('chatbot')}
                      className="w-full h-12 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-white font-semibold"
                      variant="outline"
                    >
                      Start Chatting
                    </Button>
                  ) : (
                    <Link href="/auth/signup">
                      <Button
                        className="w-full h-12 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-white font-semibold"
                        variant="outline"
                      >
                        Get Started Free
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pro Tier */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="relative h-full border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-green-50 shadow-xl hover:shadow-2xl transition-all duration-300">
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              </div>
              
              <CardHeader className="text-center pb-8 pt-8">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl flex items-center justify-center mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Pro</h3>
                <div className="text-4xl font-bold text-gray-900 mt-2">
                  $15<span className="text-lg font-normal text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 mt-2">For serious entrepreneurs</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">500 messages per month</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Full Matalino AI access</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Priority support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Advanced business tools</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Detailed strategy insights</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Faster response times</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <StripeCheckoutButton />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600">
            Have questions? <Link href="#chatbot" className="text-blue-600 hover:text-blue-700 font-semibold">Ask Matalino AI</Link> for personalized guidance
          </p>
        </motion.div>
      </div>
    </section>
  )
}
