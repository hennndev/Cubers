"use server"
import { prisma } from "@/lib/config/prisma"

export const getProjects = async (userId: string, keyword: string) => {
    try {
        if(!userId) {
            throw new Error("Something went wrong")
        }
        const projects = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                projectsMember: {
                    select: {
                        id: true,
                        roleProjectControl: true,
                        project: {
                            include: {
                                members: true,
                            },
                        }
                    },
                    where: {
                        project: {
                            OR: [
                                {
                                    name: {
                                        contains: keyword,
                                        mode: 'insensitive'
                                    }                                    
                                },
                                {
                                    projectOwner: {
                                        OR: [
                                            {
                                                username: {
                                                    contains: keyword,
                                                    mode: 'insensitive'
                                                },
                                            },
                                            {
                                                email: {
                                                    contains: keyword,
                                                    mode: 'insensitive'
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    tags: {
                                        hasSome: [keyword]
                                    }
                                }
                            ]
                        }
                    }
                }
            },
        })
        console.log(projects)
        return {
            data: projects
        }
    } catch (error: any) {
        throw new Error(error.message)        
    }
}