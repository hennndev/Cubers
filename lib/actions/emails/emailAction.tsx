"use server"

import jwt from "jsonwebtoken"
import { render } from "@react-email/render"
import { transporter } from "@/lib/config/nodemailer"
import EmailWelcome from "@/app/components/emailsHtml/emailWelcome"
import EmailVerification from "@/app/components/emailsHtml/emailVerification"


const createToken = (email: string, secret: string, maxAge: number) => {
    return jwt.sign({email}, secret, {expiresIn: maxAge})
}

const linkVerified = (path: string) => {
    return `${process.env.NODE_ENV !== "production" ? "http://localhost:3000" : process.env.NEXT_APP_ADDRESS}${path}`
}

export const receiveEmailWelcome = async (email: string) => {
    const emailHtml = await render(<EmailWelcome/>, {pretty: true})
    await transporter.sendMail({
        from: "Cubers <hendrapermanadev@gmail.com>",
        to: email,
        subject: "Welcome to Cubers",
        html: emailHtml
    })
}

export const receiveEmailVerification = async (email: string, username?: string) => {
    // Buat token untuk verifikasi email user
    const token = createToken(email, process.env.EMAIL_VERIFICATION_SECRET as string, 60 * 10)
    // html yang akan di render di message email
    // user harus klik button untuk verifikasi email, nanti akan redirect ke halaman bahwa verifikasi email berhasil
    const emailHtml = await render(<EmailVerification username={username} linkVerified={linkVerified(`/email-verification?token=${token}`)}/>, {pretty: true})
    // kirim email ke email tujuan
    await transporter.sendMail({
        from: "Cubers <hendrapermanadev@gmail.com>",
        to: email,
        subject: "Verified your email",
        html: emailHtml
    })
}