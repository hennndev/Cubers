"use server"
import { prisma } from "@/lib/config/prisma"
import { revalidatePath } from "next/cache"

export const addFriend = async (userId: string, friendId: string) => {
    try {
        if(!userId || !friendId) {
            throw new Error("Something went wrong")
        }
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                friends: {
                    connect: {
                        id: friendId
                    }
                }
            }
        })
        await prisma.user.update({
            where: {
                id: friendId
            },
            data: {
                friendOf: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
        revalidatePath("/dashboard/friends")
        return {
            message: "New friend has added"
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}