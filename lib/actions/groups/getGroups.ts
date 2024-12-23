"use server"
import { prisma } from "@/lib/config/prisma"

export const getGroups = async (userId: string) => {
    try {
        if(!userId) {
            throw new Error("Something went wrong")
        }
        const groups = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                groupsMember: {
                    select: {
                        roleGroup: true,
                        group: {
                            include: {
                                members: true
                            }
                        }
                    }
                }
            }
        })
        return {
            data: groups
        }
    } catch (error: any) {
        throw new Error(error.message)        
    }
}