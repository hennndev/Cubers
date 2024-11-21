import NextAuth from 'next-auth'
import { authOptions } from '@/lib/config/authOptions'

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}