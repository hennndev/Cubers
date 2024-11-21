import NextAuth from "next-auth"
import { prisma } from "@/lib/config/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { authOptions } from "./lib/config/authOptions"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authOptions,
})