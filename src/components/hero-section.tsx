
'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-4 py-2 text-sm font-medium text-blue-700"
          >
            <Sparkles className="w-4 h-4" />
            <span>Powered by Advanced AI Technology</span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Matalino AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your Ultimate Business Mentor
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            Transform your financial future with intelligent guidance on building profitable and scalable ventures. 
            Get expert advice on business strategies, passive income methods, and proven frameworks that work.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12"
          >
            <div className="flex items-center space-x-2 text-gray-600">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="font-semibold">Expert Business Strategies</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">24/7 AI Guidance</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <ArrowRight className="w-5 h-5 text-green-600" />
              <span className="font-semibold">Proven Frameworks</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Button
              onClick={() => scrollToSection('chatbot')}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={() => scrollToSection('pricing')}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              View Pricing
            </Button>
            <Button
              onClick={() => scrollToSection('features')}
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 text-lg font-semibold"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
