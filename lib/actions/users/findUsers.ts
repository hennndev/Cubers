"use server"
import { prisma } from "@/lib/config/prisma"

export const findUsers = async (keyword: string) => {
    if(!keyword) return {data: []}
    const users = await prisma.user.findMany({
        where: {
            OR: [
                {
                    username: {
                        contains: keyword,
                        mode: "insensitive"
                    }
                },
                {
                    email: {
                        contains: keyword,
                        mode: "insensitive"
                    }
                }
            ]
        },
        select: {
            id: true,
            username: true,
            email: true,
        }
    })
    return {
        data: users
    }
}