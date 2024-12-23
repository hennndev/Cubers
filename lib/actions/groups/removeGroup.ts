"use server"
import { prisma } from "@/lib/config/prisma"

export const removeGroup = async (groupId: number) => {
    try {   
        await prisma.group.delete({
            where: {
                id: groupId
            }
        })
        return {
            message: "Group has removed"
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
} 