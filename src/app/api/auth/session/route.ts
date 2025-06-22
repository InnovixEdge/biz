import { NextRequest, NextResponse } from 'next/server'
import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const session = await getAuthSession()

    if (!session?.user?.id) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    // Fetch user info and subscription tier from DB
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        subscription: {
          select: {
            tier: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        tier: user.subscription?.tier || 'FREE',
      },
    })
  } catch (error) {
    console.error('Error fetching session user:', error)
    return NextResponse.json({ user: null }, { status: 500 })
  }
}
