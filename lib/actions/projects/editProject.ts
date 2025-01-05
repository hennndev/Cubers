"use server"
import { prisma } from "@/lib/config/prisma"
import * as zod from "zod"
import { GroupSchema } from "@/schemas/group"
import { RoleGroup } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { ProjectSchema } from "@/schemas/project"

type EditProjectRequest = Omit<zod.infer<typeof ProjectSchema>, "members" | "tags"> & {
    tags: string[]
    members: string[]
}

export const editProject = async (ownerId: string, projectId: number, data: EditProjectRequest) => {
    try {
        if(!projectId || !ownerId) {
            throw new Error("Something went wrong")
        }
        const project = await prisma.project.findUnique({ 
            where: {
                id: projectId
            },
            select: {
                projectOwnerId: true,
                projectOwner: true,
                members: {
                    select: {
                        username: true
                    }
                }
            }
        })
        if(!project) {
            throw new Error("Project not found")
        }
        if(ownerId !== project.projectOwnerId) {
            throw new Error("You have not access to change this project")
        }
        await prisma.$transaction(async(tx) => {
            await tx.project.update({
                where: {
                    id: projectId
                },
                data: {
                    name: data.name,
                    level: data.level,
                    description: data.description,
                    tags: data.tags,
                }
            })
            const newMembers = data.members
            const currentMembers = project.members.map(member => member.username)
            // Member yang ditambahkan apabila currentMembers belum ada username baru dari newMembers
            const membersToAdd = newMembers.filter(member => !currentMembers.includes(member))
            // Apabila newMembers tidak ada username yang sudah pernah ditambahkan sebelumnya. Jadi konsep disini yaitu melakukan replace ulang
            const membersToRemoved = currentMembers.filter(member => !newMembers.includes(member))

            if(membersToAdd.length > 0) {
                const projectMemberData = membersToAdd.map((member) => ({
                    username: member,
                    roleGroup: RoleGroup.Member,
                    projectId
                }))
                await tx.projectMember.createMany({
                    data: projectMemberData,
                    skipDuplicates: true
                })
            }
            if(membersToRemoved.length > 0) {
                await tx.projectMember.deleteMany({
                    where: {
                        projectId,
                        username: {
                            in: membersToRemoved,
                            not: project.projectOwner.username
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