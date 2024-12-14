import bcrypt from 'bcryptjs'
import { prisma } from './prisma'
import { NextAuthOptions } from 'next-auth'
import { LoginSchema } from '@/schemas/auth'
import GoogleProvider from 'next-auth/providers/google'
import Credentials from "next-auth/providers/credentials"
import { receiveEmailWelcome } from '../actions/emails/emailAction'

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
        Credentials({
            name: 'credentials',
            //@ts-ignore
            async authorize(credentials) {
                const fields = LoginSchema.parse(credentials)
                const user = await prisma.user.findUnique({
                    where: {
                        email: fields.email
                    },
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        username: true,
                        password: true,
                        emailVerified: true
                    }
                })
                if(!user) {
                    throw new Error("Email not found")
                }
                if(user && !user.password) {
                    throw new Error("This account already registered using google")
                }
                if(user && user.password) {
                    const checkPassword = await bcrypt.compare(fields.password, user.password)
                    if(!checkPassword) {
                        throw new Error("Password incorrect")
                    }
                    const { password, ...userData } = user
                    return userData
                }
            } 
        })
    ],
    events: {
        async linkAccount({user, account}) {
            if(account.provider === "google") {
                await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        emailVerified: true
                    }
                })
                receiveEmailWelcome(user.email as string)
            }
        }
    },
    callbacks: {
        async signIn({account, profile, user}) {
            return true
        },
        //@ts-ignore
        async jwt({token}) {
            return token
        },
        async session({session}) {
            return session
        },
    },
    pages: {
        signIn: '/login'
    }
}