"use server"
import * as zod from "zod"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/config/prisma"
import { DetailStudentSchema } from "@/schemas/profile"

export const editProfileStudentInfo = async (username: string, id: number, data: zod.infer<typeof DetailStudentSchema>) => {
  try {
    const studentInfo = await prisma.detailStudent.findFirst({
      where: {
        id
      }
    })
    if(!studentInfo) {
      throw new Error("Profile detail student info is not exist")
    }
    await prisma.detailStudent.update({
      where: {
        id
      },
      data: {
        ...data
      }
    })
    revalidatePath(`/dashboard/profile/${username}`)
  } catch (error: any) {
    console.log(error)
    throw new Error(error.message)
  }
}