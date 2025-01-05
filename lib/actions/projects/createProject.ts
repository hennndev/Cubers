"use server"
import * as zod from "zod"
import { prisma } from "@/lib/config/prisma"
import { ProjectSchema } from "@/schemas/project"
import { RoleProjectControl } from "@prisma/client"

type CreateProjectRequest = Omit<zod.infer<typeof ProjectSchema>, "members" | "tags"> & {
    members: string[],
    tags: string[]
}

export const createProject = async (userId: string,  data: CreateProjectRequest) => {
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
        const project = await prisma.project.create({
            data: {
                name: data.name,
                level: data.level,
                description: data.description,
                tags: data.tags,
                projectOwnerId: userId,
            }
        })

        const projectMembersData = [
            ...data.members.map((member) => ({
                username: member,
                projectId: project.id,
                roleProjectControl: RoleProjectControl.Member
            })),
            {
                username: checkUserOwner?.username as string,
                projectId: project.id,
                roleProjectControl: RoleProjectControl.Owner
            }
        ] 
        await prisma.projectMember.createMany({
            data: projectMembersData,
            skipDuplicates: true
        })
    } catch (error: any) {
        throw new Error(error.message)
    }
}