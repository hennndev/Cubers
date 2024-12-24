"use server"
import { prisma } from "@/lib/config/prisma"
import * as zod from "zod"
import { GroupSchema } from "@/schemas/group"
import { RoleGroup } from "@prisma/client"
import { revalidatePath } from "next/cache"

type EditGroupRequest = Omit<zod.infer<typeof GroupSchema>, "members" | "tags"> & {
    tags: string[]
    members: string[]
}

export const editGroup = async (ownerId: string, groupId: number, data: EditGroupRequest) => {
    try {
        if(!groupId || !ownerId) {
            throw new Error("Something went wrong")
        }
        const group = await prisma.group.findUnique({ 
            where: {
                id: groupId
            },
            select: {
                groupOwnerId: true,
                groupOwner: true,
                members: {
                    select: {
                        username: true
                    }
                }
            }
        })
        if(!group) {
            throw new Error("Group not found")
        }
        if(ownerId !== group.groupOwnerId) {
            throw new Error("You have not access to change this group")
        }
        await prisma.$transaction(async(tx) => {
            await tx.group.update({
                where: {
                    id: groupId
                },
                data: {
                    name: data.name,
                    level: data.level,
                    description: data.description,
                    tags: data.tags,
                }
            })
            const newMembers = data.members
            const currentMembers = group.members.map(member => member.username)
            // Member yang ditambahkan apabila currentMembers belum ada username baru dari newMembers
            const membersToAdd = newMembers.filter(member => !currentMembers.includes(member))
            // Apabila newMembers tidak ada username yang sudah pernah ditambahkan sebelumnya. Jadi konsep disini yaitu melakukan replace ulang
            const membersToRemoved = currentMembers.filter(member => !newMembers.includes(member))

            if(membersToAdd.length > 0) {
                const groupMemberData = membersToAdd.map((member) => ({
                    username: member,
                    roleGroup: RoleGroup.Member,
                    groupId
                }))
                await tx.groupMember.createMany({
                    data: groupMemberData,
                    skipDuplicates: true
                })
            }
            if(membersToRemoved.length > 0) {
                await tx.groupMember.deleteMany({
                    where: {
                        groupId,
                        username: {
                            in: membersToRemoved,
                            not: group.groupOwner.username
                        }
                    }
                })
            }
        })
        revalidatePath("/dashboard/groups")
    } catch (error: any) {
        throw new Error(error.message)
    }
}