
'use client'

import { motion } from 'framer-motion'
import { Progress } from '@/components/ui/progress'
import { MessageSquare, Crown } from 'lucide-react'

interface UsageProgressProps {
  currentUsage: number
  limit: number
  tier: 'FREE' | 'PRO'
}

export default function UsageProgress({ currentUsage, limit, tier }: UsageProgressProps) {
  const percentage = Math.round((currentUsage / limit) * 100)
  const remaining = Math.max(0, limit - currentUsage)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {tier === 'PRO' ? (
            <Crown className="w-5 h-5 text-yellow-500" />
          ) : (
            <MessageSquare className="w-5 h-5 text-gray-500" />
          )}
          <span className="font-semibold text-gray-900">
            Messages This Month
          </span>
        </div>
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
          tier === 'PRO' 
            ? 'bg-yellow-100 text-yellow-800' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {tier}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>{currentUsage} of {limit} used</span>
          <span>{remaining} remaining</span>
        </div>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.5 }}
        >
          <Progress 
            value={percentage} 
            className="h-3"
          />
        </motion.div>
        
        <div className="text-center">
          <span className={`text-sm font-medium ${
            percentage >= 90 
              ? 'text-red-600' 
              : percentage >= 70 
              ? 'text-yellow-600' 
              : 'text-green-600'
          }`}>
            {percentage}% used
          </span>
        </div>
      </div>
    </div>
  )
}
