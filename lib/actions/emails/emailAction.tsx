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
    return `${process.env.NODE_ENV === "production" ? "http://localhost" : process.env.NEXT_APP_ADDRESS}${path}`
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

export const receiveEmailVerification = async (email: string) => {
    const token = createToken(email, "email-verification-secret", 60 * 10)
    const emailHtml = await render(<EmailVerification linkVerified={linkVerified(`?email-verification?email=${email}&token=${token}`)}/>, {pretty: true})
    await transporter.sendMail({
        from: "Cubers <hendrapermanadev@gmail.com>",
        to: email,
        subject: "Verified your email",
        html: emailHtml
    })
}