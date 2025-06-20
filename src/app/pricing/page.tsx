
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Check, Crown, MessageSquare, Zap, Sparkles, ArrowRight, X } from 'lucide-react'
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
      free: false,
      pro: true
    },
    {
      feature: "Custom Business Plans",
      free: false,
      pro: true
    },
    {
      feature: "Market Analysis",
      free: false,
      pro: true
    },
    {
      feature: "Financial Projections",
      free: false,
      pro: true
    },
    {
      feature: "Competitor Research",
      free: false,
      pro: true
    }
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-4 py-2 text-sm font-medium text-blue-700">
              <Crown className="w-4 h-4" />
              <span>Simple & Transparent Pricing</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Business Potential</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Choose the plan that fits your entrepreneurial journey. Start free and upgrade when you're ready to scale.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {/* Free Tier */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
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
                  <div className="pt-4">
                    {session ? (
                      <Link href="/#chatbot">
                        <Button
                          className="w-full h-12 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-white font-semibold"
                          variant="outline"
                        >
                          Start Chatting
                        </Button>
                      </Link>
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="relative h-full border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-green-50 shadow-xl hover:shadow-2xl transition-all duration-300">
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
                  <div className="pt-4">
                    <StripeCheckoutButton>
                      Upgrade to Pro
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </StripeCheckoutButton>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Feature Comparison Table */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6">
              <h3 className="text-2xl font-bold text-center">Feature Comparison</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-900">Features</th>
                    <th className="text-center p-4 font-semibold text-gray-900">Free</th>
                    <th className="text-center p-4 font-semibold text-gray-900">Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((item, index) => (
                    <tr key={item.feature} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-4 font-medium text-gray-900">{item.feature}</td>
                      <td className="p-4 text-center">
                        {typeof item.free === 'boolean' ? (
                          item.free ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-700">{item.free}</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {typeof item.pro === 'boolean' ? (
                          item.pro ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-700">{item.pro}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Questions?</h3>
            <p className="text-gray-600 mb-8">
              Chat with Matalino AI to get personalized guidance on which plan is right for you
            </p>
            <Link href="/#chatbot">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                Ask Matalino AI
                <MessageSquare className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
