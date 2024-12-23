"use server"
import * as zod from "zod"
import { prisma } from "@/lib/config/prisma"
import { revalidatePath } from "next/cache"
import { GroupSchema } from "@/schemas/group"
import { RoleGroup } from "@prisma/client"

type CreateGroupRequest = Omit<zod.infer<typeof GroupSchema>, "members" | "tags"> & {
    tags: string[]
    members: string[]
}

export const createGroup = async (userId: string, data: CreateGroupRequest) => {
    try {
        if(!userId) {
            throw new Error("Something went wrong")
        }
        const checkUserOwner = await prisma.user.findUnique({
            where: {id: userId},
            select: {username: true}
        })
        if(!checkUserOwner) {
            throw new Error("User owner is not valid/not found")
        }
        const group = await prisma.group.create({
            data: {
                name: data.name,
                level: data.level,
                description: data.description,
                tags: data.tags,
                groupOwnerId: userId,
            }
        })
        const groupMemberData = [
            ...data.members.map((member) => ({
                username: member,
                roleGroup: RoleGroup.Member,
                groupId: group.id,
            })),
            {
                username: checkUserOwner?.username as string,
                roleGroup: RoleGroup.Owner,
                groupId: group.id
            }
        ]
        await prisma.groupMember.createMany({
            data: groupMemberData,
            skipDuplicates: true
        })
        revalidatePath("/dashboard/groups")
    } catch (error: any) {
        throw new Error(error.message)
    }
}