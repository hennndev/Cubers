"use server"
import { prisma } from "@/lib/config/prisma"
import { revalidatePath } from "next/cache"

export const removeGroup = async (groupId: number) => {
    try {   
        await prisma.group.delete({
            where: {
                id: groupId
            }
        })
        revalidatePath("/dashboard/groups")
    } catch (error: any) {
        throw new Error(error.message)
    }
} 