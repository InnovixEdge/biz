
import { NextRequest, NextResponse } from 'next/server'
import { getAuthSession } from '@/lib/auth'
import { getCurrentMonthUsage, getUserSubscriptionInfo, checkUsageLimit } from '@/lib/usage-tracker'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const session = await getAuthSession()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const subscriptionInfo = await getUserSubscriptionInfo(session.user.id)
    const usageInfo = await checkUsageLimit(session.user.id, subscriptionInfo.tier as 'FREE' | 'PRO')

    return NextResponse.json({
      subscription: subscriptionInfo,
      usage: usageInfo
    })
  } catch (error) {
    console.error('Error getting usage:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
