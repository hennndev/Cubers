"use server"
import { prisma } from "@/lib/config/prisma"
import { GroupLevel, RoleGroup } from "@prisma/client"
import { revalidatePath } from "next/cache"

type GroupRequestDataTypes = {
    name: string
    level: GroupLevel
    description: string
    tags: string[]
    members: string[]
}

export const createGroup = async (userId: string, data: GroupRequestDataTypes) => {
    try {
        if(!userId) {
            throw new Error("Something went wrong")
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
            ...data.members.map((id) => ({
                userId: id,
                roleGroup: RoleGroup.MEMBER,
                groupId: group.id,
            })),
            {
                userId: userId,
                roleGroup: RoleGroup.OWNER,
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