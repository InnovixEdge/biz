
'use client'

import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import UserMenu from './user-menu'
import { Loader2 } from 'lucide-react'

export default function AuthButtons() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="flex items-center">
        <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
      </div>
    )
  }

  if (session) {
    return <UserMenu />
  }

  return (
    <div className="flex items-center space-x-4">
      <Link href="/auth/signin">
        <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
          Sign In
        </Button>
      </Link>
      <Link href="/auth/signup">
        <Button className="bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700">
          Get Started
        </Button>
      </Link>
    </div>
  )
}
