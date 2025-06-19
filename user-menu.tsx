
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import { User, Settings, LogOut, Crown, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function UserMenu() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  if (!session) return null

  const isProUser = session.user.subscription?.tier === 'PRO'

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="hidden md:block text-sm font-medium text-gray-700">
          {session.user.name?.split(' ')[0]}
        </span>
        {isProUser && (
          <Crown className="w-4 h-4 text-yellow-500" />
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
            >
              {/* User Info */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{session.user.name}</p>
                    <p className="text-sm text-gray-600">{session.user.email}</p>
                    <div className="flex items-center mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        isProUser 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {isProUser ? 'PRO' : 'FREE'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                
                <Link
                  href="/pricing"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Crown className="w-4 h-4" />
                  <span>{isProUser ? 'Manage Subscription' : 'Upgrade to Pro'}</span>
                </Link>

                <div className="border-t border-gray-200 my-2"></div>
                
                <button
                  onClick={() => {
                    setIsOpen(false)
                    signOut({ callbackUrl: '/' })
                  }}
                  className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
