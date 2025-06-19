
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Target, 
  TrendingUp, 
  Lightbulb, 
  PieChart, 
  Users, 
  Rocket,
  DollarSign,
  BarChart3,
  Zap
} from 'lucide-react'

export default function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      icon: Target,
      title: 'Strategic Planning',
      description: 'Get comprehensive business strategies tailored to your industry and goals.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: DollarSign,
      title: 'Passive Income Guidance',
      description: 'Discover proven methods to build sustainable passive income streams.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: TrendingUp,
      title: 'Growth Optimization',
      description: 'Learn how to scale your business efficiently and maximize profitability.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Lightbulb,
      title: 'Innovation Insights',
      description: 'Stay ahead with cutting-edge business ideas and market opportunities.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: PieChart,
      title: 'Financial Analysis',
      description: 'Master financial planning, budgeting, and investment strategies.',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Users,
      title: 'Market Research',
      description: 'Understand your target audience and competitive landscape.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Rocket,
      title: 'Startup Guidance',
      description: 'Step-by-step processes for launching and establishing your venture.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: BarChart3,
      title: 'Performance Metrics',
      description: 'Track and measure your business success with key performance indicators.',
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: Zap,
      title: 'Quick Solutions',
      description: 'Get instant answers to complex business challenges and decisions.',
      color: 'from-cyan-500 to-cyan-600'
    }
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-16"
        >
          <div className="flex items-center justify-center space-x-2 text-blue-600">
            <Zap className="w-6 h-6" />
            <span className="text-sm font-semibold uppercase tracking-wide">Powerful Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Succeed</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Matalino AI combines advanced artificial intelligence with proven business expertise to provide comprehensive guidance for entrepreneurs at every stage.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pricing Teaser & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          {/* Pricing Teaser */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 mb-8 border border-blue-200">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Start Free, Scale When Ready
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">Free</div>
                  <div className="text-gray-600">25 messages/month</div>
                </div>
                <div className="hidden md:block w-px h-12 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">$15/month</div>
                  <div className="text-gray-600">500 messages + Pro features</div>
                </div>
              </div>
              <button
                onClick={() => {
                  const element = document.getElementById('pricing')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-green-700 shadow-lg hover:shadow-xl transition-all mr-4"
              >
                View Full Pricing
              </button>
            </div>
          </div>

          {/* Main CTA */}
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-6">
              Ready to unlock your business potential?
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('chatbot')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all"
            >
              Start Your Journey Today
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
