"use server"
import { prisma } from "@/lib/config/prisma"
import { revalidatePath } from "next/cache"

export const leaveGroup = async (groupMemberId: number) => {
    try {
        if(!groupMemberId) {
            throw new Error("Something went wrong")
        }
        await prisma.groupMember.delete({
            where: {
                id: groupMemberId
            }
        })
        revalidatePath("/dashboard/groups")
    } catch (error: any) {
        throw new Error(error.message)
    }
}