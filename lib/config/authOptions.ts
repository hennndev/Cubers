import bcrypt from 'bcryptjs'
import { prisma } from './prisma'
import { v4 as uuid } from 'uuid'
import { createToken } from '../utils'
import { NextAuthOptions } from 'next-auth'
import { LoginSchema } from '@/schemas/auth'
import GoogleProvider from 'next-auth/providers/google'
import Credentials from "next-auth/providers/credentials"
import { receiveEmailVerification, receiveEmailWelcome } from '../actions/emails/emailAction'

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
                        emailVerified: true,
                        profileImage: true,
                        loginMethod: true
                    }
                })
                if(!user) {
                    throw new Error("Email not found")
                }
                if(user)
                if(user && user.loginMethod === "GOOGLE") {
                    throw new Error("This account already registered using google")
                }
                if(user && user.password) {
                    const checkPassword = await bcrypt.compare(fields.password, user.password)
                    if(!checkPassword) {
                        throw new Error("Password incorrect")
                    }
                    const { password, ...userData } = user

                    if(!userData.emailVerified) {
                        console.log(user)
                        // token untuk akses halaman verified your email
                        const token = createToken(user.email, process.env.LOGIN_REDIRECT_EMAIL_VERIFICATION_SECRET as string, 60 * 5)
                        // kemudian mengirimkan verifikasi email ke email tujuan
                        await receiveEmailVerification(user.email, user.username)
                        throw new Error(JSON.stringify({
                            error: "Email not verified",
                            token
                        }))
                    }
                    return userData
                }
                return true
            } 
        })
    ],
    callbacks: {
        async signIn({account, profile, user}) {
            if(account?.provider === "google") {
                const checkExistEmail = await prisma.user.findUnique({
                    where: {
                        email: profile?.email
                    }
                })
                if(!checkExistEmail) {
                    await prisma.user.create({
                        data: {
                            id: uuid(),
                            name: profile?.name as string,
                            username: profile?.name?.slice(0, 10) as string,
                            email: profile?.email as string,
                            emailVerified: true,
                            profileImage: profile?.image as string,
                            loginMethod: "GOOGLE"
                        }
                    })
                    receiveEmailWelcome(user.email as string)
                }
            }
            return true
        },
        //@ts-ignore
        async jwt({token, account, profile, trigger, session, user}) {
            if(account?.provider === "google") {
                const existUser = await prisma.user.findUnique({
                    where: {
                        email: profile?.email
                    },
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        username: true,
                        password: true,
                        emailVerified: true,
                        profileImage: true
                    }
                })
                if(existUser) {
                    token.id = existUser.id
                    token.name = existUser.name
                    token.username = existUser.username
                    token.image = existUser.profileImage
                    token.email = existUser.email
                }
                if(trigger === "update" && (session.image === null || session.image)) {
                    token.picture = session?.image
                }
            }
            return {...user, ...token}
        },
        async session({session, token, newSession, trigger}: {session: any, token: any, newSession: any, trigger: any}) {
            session.user.id = token.id
            session.user.name = token.name
            session.user.username = token.username
            session.user.image = token.picture
            if(trigger === "update" && newSession.image) {
                session.user.image = newSession.image
            }
            return session
        },
    },
    pages: {
        signIn: '/login'
    }
}