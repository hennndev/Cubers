"use server"
import { prisma } from "@/lib/config/prisma"

export const checkEmailIsVerified = async (email: string): Promise<boolean> => {
    // mengidentifikasi apakah email tersebut sudah verified atau belum
    const userVerified = await prisma.user.findFirst({
        where: {
            email,
            emailVerified: true
        },
    })
    if(userVerified) {
        return true
    } else {
        return false
    }
}