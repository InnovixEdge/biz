
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MessageCircle, Zap, Brain } from 'lucide-react'
import ProtectedChatbot from './protected-chatbot'

export default function ChatbotSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="chatbot" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="px-4 py-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-12"
        >
          <div className="flex items-center justify-center space-x-2 text-blue-600">
            <MessageCircle className="w-6 h-6" />
            <span className="text-sm font-semibold uppercase tracking-wide">AI Business Mentor</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Chat with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Matalino AI</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get instant access to expert business guidance. Ask questions, explore strategies, and receive personalized advice to build your profitable venture.
          </p>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
        >
          <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-4 py-2 text-sm font-medium text-blue-700">
            <Zap className="w-4 h-4" />
            <span>Instant Responses</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-green-200 rounded-full px-4 py-2 text-sm font-medium text-green-700">
            <Brain className="w-4 h-4" />
            <span>Expert Knowledge</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-full px-4 py-2 text-sm font-medium text-purple-700">
            <MessageCircle className="w-4 h-4" />
            <span>24/7 Available</span>
          </div>
        </motion.div>

        {/* Protected Chatbot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ProtectedChatbot />
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600 text-sm">
            Start your conversation above and discover how Matalino AI can transform your business journey
          </p>
        </motion.div>
      </div>
    </section>
  )
}
