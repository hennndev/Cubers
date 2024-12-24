"use server"
import { prisma } from "@/lib/config/prisma"

export const getGroup = async (groupId: number) => {
    try {
        if(!groupId) {
            throw new Error("Something went wrong")
        }
        const group = await prisma.group.findUnique({
            where: {
                id: groupId
            },
            select: {
                id: true,
                name: true,
                level: true,
                tags: true,
                description: true,
                members: true,
                groupOwner: {
                    select: {
                        id: true
                    }
                }
            }
        })
        console.log(group)
        return {
            data: group
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}