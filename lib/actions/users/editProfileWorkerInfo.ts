"use server"
import * as zod from "zod"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/config/prisma"
import { DetailWorkerSchema } from "@/schemas/profile"

export const editProfileWorkerInfo = async (username: string, id: number, data: zod.infer<typeof DetailWorkerSchema>) => {
  try {
    const workerInfo = await prisma.detailWorker.findFirst({
      where: {
        id
      }
    })
    if(!workerInfo) {
      throw new Error("Profile detail worker info is not exist")
    }
    await prisma.detailWorker.update({
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