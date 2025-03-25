"use server"
import * as zod from "zod"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/config/prisma"
import { ProfilePersonalInformationsSchema } from "@/schemas/profile"


export const editProfilePersonalInformation = async (username: string, data: zod.infer<typeof ProfilePersonalInformationsSchema>) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: username
      },
    })
    // If not existed, throwing new error
    if(!user) {
      throw new Error("User not exist")
    }

    await prisma.user.update({
      where: {
        username
      },
      data: {
        bio: data.bio,
        country: data.country,
        city: data.city,
        whatsappNumber: data.whatsappNumber,
        address: data.address
      }
    })
    revalidatePath(`/dashboard/profile/${username}`)
  } catch (error: any) {
    console.log(error)
    throw new Error(error.message)
  }
}