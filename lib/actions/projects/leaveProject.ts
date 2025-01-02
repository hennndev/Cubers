"use server"
import { prisma } from "@/lib/config/prisma"
import { revalidatePath } from "next/cache"

export const leaveProject = async (projectMemberId: number) => {
    try {
        if(!projectMemberId) {
            throw new Error("Something went wrong")
        }
        await prisma.projectMember.delete({
            where: {
                id: projectMemberId
            }
        })
        revalidatePath("/dashboard/projects")
    } catch (error: any) {
        throw new Error(error.message)
    }
}