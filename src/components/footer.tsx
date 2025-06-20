
'use client'

import { Brain, Heart, Globe, Mail } from 'lucide-react'

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">Matalino AI</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              Your intelligent business mentor, empowering entrepreneurs worldwide to achieve financial freedom and build successful ventures.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-400">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-sm">Made with love for entrepreneurs</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('chatbot')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Chat with AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('benefits')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Benefits
                </button>
              </li>
            </ul>
          </div>

          {/* Mission */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Mission</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Globe className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Global entrepreneur empowerment</span>
              </div>
              <div className="flex items-start space-x-2">
                <Brain className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">AI-powered business guidance</span>
              </div>
              <div className="flex items-start space-x-2">
                <Heart className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Filipino heritage and values</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Matalino AI. Empowering entrepreneurs worldwide.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-400">
                <span className="text-sm">🇵🇭</span>
                <span className="text-sm">Proudly Filipino</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
