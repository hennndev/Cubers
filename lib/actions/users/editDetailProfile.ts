"use server"
import * as zod from "zod"
import { prisma } from "@/lib/config/prisma"
import { ProfileSchema } from "@/schemas/profile"
import { revalidatePath } from "next/cache"

export const editDetailProfile = async (data: zod.infer<typeof ProfileSchema>) => {
  try {
    await prisma.user.update({
      where: {
        email: data.email
      },
      data: {
        name: data.name,
        status: data.status
      }
    })
    revalidatePath(`/dashboard/profile/${data.username}`)
  } catch (error) {
    console.log(error)    
  }
}