"use server"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/config/prisma"
import { receiveEmailWelcome } from "../emails/emailAction"

export const verifiedEmail = async (token: string) => {
    try {
        // verify token, apakah valid atau tidak, apakah expired atau tidak
        const decoded: any = jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET as string)
        if(decoded?.email) {
            // kemudian update user berdasarkan email, dengan mengubah status emailVerified menjadi true
            await prisma.user.update({
                where: {
                    email: decoded?.email
                },
                data: {
                    emailVerified: true
                }
            }).then(() => {
                // Jika sudah diupdate, tambahkan callback untuk memanggil function untuk memberikan email welcome ke user baru
                receiveEmailWelcome(decoded?.email)
            })
        }
    } catch (error: any) {
        // Jika invalid atau expired atau error, throw error message
        if(error.name === "TokenExpiredError") {
            throw new Error("Token has expired")
        } else {
            throw new Error("Token invalid")
        }
    }
}