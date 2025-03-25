"use server"
import { prisma } from "@/lib/config/prisma"

export const getFriends = async (userId: string) => {
  try {
    if (!userId) {
      throw new Error("Something went wrong")
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        friends: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            profileImage: true
          }
        }
      }
    })
    if(!user) {
      throw new Error("User not exist")
    }
    return {
      data: user?.friends
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}