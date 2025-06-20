
import { NextRequest, NextResponse } from 'next/server'
import { getAuthSession } from '@/lib/auth'
import { trackUsage, checkUsageLimit, getUserSubscriptionInfo } from '@/lib/usage-tracker'

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { action, details } = await req.json()

    // Get user's subscription info
    const subscriptionInfo = await getUserSubscriptionInfo(session.user.id)
    
    // Check if user can perform this action
    const usageCheck = await checkUsageLimit(session.user.id, subscriptionInfo.tier as 'FREE' | 'PRO', action)
    
    if (!usageCheck.canUse) {
      return NextResponse.json(
        { 
          error: 'Usage limit exceeded',
          usage: usageCheck,
          subscription: subscriptionInfo
        },
        { status: 429 }
      )
    }

    // Track the usage
    await trackUsage(session.user.id, action, details)

    // Return updated usage info
    const updatedUsage = await checkUsageLimit(session.user.id, subscriptionInfo.tier as 'FREE' | 'PRO', action)

    return NextResponse.json({
      success: true,
      usage: updatedUsage,
      subscription: subscriptionInfo
    })
  } catch (error) {
    console.error('Error tracking usage:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
