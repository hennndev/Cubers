"use server"
import { prisma } from "@/lib/config/prisma"
import { revalidatePath } from "next/cache"

export const removeFriend = async (userId: string, friendId: string) => {
  try {
    if (!userId || !friendId) {
      throw new Error("Something went wrong")
    }
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        friends: {
          disconnect: {
            id: friendId
          }
        }
      }
    })
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        friendOf: {
          disconnect: {
            id: userId
          }
        }
      }
    })
    revalidatePath("/dashboard/friends")
    return {
      message: "Friend has removed"
    }
  } catch (error: any) {
    console.log(error)
    throw new Error(error.message)
  }
}