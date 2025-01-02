"use server"
import { prisma } from "@/lib/config/prisma"
import { revalidatePath } from "next/cache"

export const removeProject = async (projectId: number) => {
    try {
        if(!projectId) {
            throw new Error("Something went wrong")
        }
        await prisma.project.delete({
            where: {
                id: projectId
            }
        })
        revalidatePath("/dashboard/projects")
    } catch (error: any) {
        throw new Error(error.message)
    }
}