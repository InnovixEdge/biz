
'use client'

import { useState } from 'react'
import { Menu, X, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AuthButtons from './auth-buttons'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">Matalino AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('chatbot')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Chat Now
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Features
            </button>
            <Link
              href="/pricing"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Pricing
            </Link>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              About
            </button>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:block">
            <AuthButtons />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 mt-4">
              <button
                onClick={() => scrollToSection('chatbot')}
                className="text-left text-gray-600 hover:text-blue-600 transition-colors"
              >
                Chat Now
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-left text-gray-600 hover:text-blue-600 transition-colors"
              >
                Features
              </button>
              <Link
                href="/pricing"
                onClick={() => setIsMenuOpen(false)}
                className="text-left text-gray-600 hover:text-blue-600 transition-colors"
              >
                Pricing
              </Link>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left text-gray-600 hover:text-blue-600 transition-colors"
              >
                About
              </button>
              <div className="pt-4">
                <AuthButtons />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
