"use server"
import { prisma } from "@/lib/config/prisma"

export const getUser = async (username: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username
      },
      select: {
        name: true,
        username: true,
        email:true,
        status: true,
        profileImage: true,
        bio: true,
        country: true,
        city: true,
        whatsappNumber: true,
        address: true,
        detailStudent: true,
        detailWorker: true
      }
    })

    return {
      data: user
    }
  } catch (error) {
    console.log(error)
  }
}