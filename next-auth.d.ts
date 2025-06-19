
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      subscription?: {
        tier: string
        status: string
      }
    } & DefaultSession['user']
  }
  
  interface User {
    id: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
  }
}
