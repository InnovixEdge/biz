
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  BookOpen, 
  TrendingUp, 
  Users, 
  Target, 
  Lightbulb, 
  Award,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

export default function BenefitsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const userTypes = [
    {
      icon: BookOpen,
      title: 'Aspiring Entrepreneurs',
      subtitle: 'Starting Your Journey',
      benefits: [
        'Learn fundamental business principles',
        'Discover your niche and target market',
        'Create a solid business plan',
        'Understand legal and financial basics'
      ],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: TrendingUp,
      title: 'Growing Businesses',
      subtitle: 'Scaling Your Success',
      benefits: [
        'Optimize operations and processes',
        'Expand into new markets',
        'Build effective marketing strategies',
        'Manage growth challenges'
      ],
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Users,
      title: 'Experienced Entrepreneurs',
      subtitle: 'Maximizing Potential',
      benefits: [
        'Advanced strategic planning',
        'Investment and exit strategies',
        'Portfolio diversification',
        'Mentoring and leadership skills'
      ],
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50'
    }
  ]

  const universalBenefits = [
    {
      icon: Target,
      title: 'Personalized Guidance',
      description: 'Get advice tailored to your specific industry, goals, and challenges.'
    },
    {
      icon: Lightbulb,
      title: 'Innovative Solutions',
      description: 'Discover creative approaches to common business problems.'
    },
    {
      icon: Award,
      title: 'Proven Frameworks',
      description: 'Access battle-tested strategies used by successful entrepreneurs.'
    }
  ]

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-16"
        >
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <Award className="w-6 h-6" />
            <span className="text-sm font-semibold uppercase tracking-wide">Benefits For Everyone</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Perfect for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Every Stage</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Whether you're just starting out or looking to scale your existing business, Matalino AI provides the guidance you need to succeed.
          </p>
        </motion.div>

        {/* User Types */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {userTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className={`${type.bgColor} rounded-3xl p-8 h-full border border-gray-200 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2`}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${type.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <type.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{type.title}</h3>
                <p className="text-gray-600 mb-6">{type.subtitle}</p>
                
                <ul className="space-y-3">
                  {type.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Universal Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Universal Benefits</h3>
            <p className="text-lg text-gray-600">
              No matter where you are in your entrepreneurial journey, you'll gain:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {universalBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-12 text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of entrepreneurs who trust Matalino AI for their business success.
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('chatbot')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all inline-flex items-center space-x-2"
          >
            <span>Start Your Journey Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
