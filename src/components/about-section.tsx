
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart, Globe, Star, Compass } from 'lucide-react'
import Image from 'next/image'

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-16"
        >
          <div className="flex items-center justify-center space-x-2 text-indigo-600">
            <Heart className="w-6 h-6" />
            <span className="text-sm font-semibold uppercase tracking-wide">Our Story</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            The Meaning Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Matalino</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Filipino Heritage</h3>
                  <p className="text-gray-600 leading-relaxed">
                    "Matalino" means "intelligent" or "smart" in Filipino, reflecting our founder's proud Filipino heritage and the cultural values of wisdom, resilience, and community support that drive our mission.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Global Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our mission extends far beyond borders. We're committed to helping people worldwide achieve financial freedom and business success, regardless of their background or starting point.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Guiding Principles</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We believe that intelligence combined with the right guidance can transform lives. Matalino AI embodies the Filipino spirit of "bayanihan" - working together to lift each other up.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-indigo-200">
              <blockquote className="text-lg italic text-gray-700 mb-4">
                "Every successful entrepreneur started with a dream and the courage to pursue it. Matalino AI is here to provide the wisdom and guidance to turn those dreams into reality."
              </blockquote>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Matalino AI Team</p>
                  <p className="text-sm text-gray-600">Empowering Global Entrepreneurs</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative aspect-square bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl overflow-hidden">
              <Image
                src="https://thumbs.dreamstime.com/b/portrait-young-smiling-cheerful-entrepreneur-businessman-bright-modern-office-working-laptop-computer-examining-charts-240622218.jpg"
                alt="Filipino entrepreneur representing Matalino AI's heritage and mission"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Star className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
          </motion.div>
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-indigo-200"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h3>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're dedicated to democratizing access to high-quality business mentorship. Through Matalino AI, we're breaking down barriers and making expert guidance available to anyone with the ambition to build something meaningful.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
