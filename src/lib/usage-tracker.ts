
import { prisma } from '@/lib/db'

export interface UsageLimits {
  FREE: number
  PRO: number
}

export const USAGE_LIMITS: UsageLimits = {
  FREE: 25,   // 25 messages per month
  PRO: 500    // 500 messages per month
}

export async function trackUsage(userId: string, action: string, details?: any) {
  try {
    await prisma.usageLog.create({
      data: {
        userId,
        action,
        details: details || {}
      }
    })
  } catch (error) {
    console.error('Error tracking usage:', error)
  }
}

export async function getCurrentMonthUsage(userId: string, action: string = 'chat_message') {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)

  try {
    const usage = await prisma.usageLog.count({
      where: {
        userId,
        action,
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth
        }
      }
    })

    return usage
  } catch (error) {
    console.error('Error getting usage:', error)
    return 0
  }
}

export async function checkUsageLimit(userId: string, tier: 'FREE' | 'PRO', action: string = 'chat_message') {
  const currentUsage = await getCurrentMonthUsage(userId, action)
  const limit = USAGE_LIMITS[tier]
  
  return {
    currentUsage,
    limit,
    remaining: Math.max(0, limit - currentUsage),
    canUse: currentUsage < limit,
    percentageUsed: Math.round((currentUsage / limit) * 100)
  }
}

export async function getUserSubscriptionInfo(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        subscription: true
      }
    })

    return {
      tier: user?.subscription?.tier || 'FREE',
      status: user?.subscription?.status || 'ACTIVE',
      currentPeriodEnd: user?.subscription?.currentPeriodEnd,
      cancelAtPeriodEnd: user?.subscription?.cancelAtPeriodEnd || false
    }
  } catch (error) {
    console.error('Error getting subscription info:', error)
    return {
      tier: 'FREE' as const,
      status: 'ACTIVE' as const,
      currentPeriodEnd: null,
      cancelAtPeriodEnd: false
    }
  }
}
