"use server"
import { prisma } from "@/lib/config/prisma"

export const getGroups = async (userId: string, keyword: string) => {
    try {
        if(!userId) {
            throw new Error("Something went wrong")
        }
        // get user by id
        const groups = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            // lalu cari berdasarkan groupMember
            select: {
                groupsMember: {
                    select: {
                        id: true,
                        roleGroup: true,
                        group: {
                            include: {
                                members: true,
                            },
                        }
                    },
                    // dynamic filter by name/groupOwner/tags
                    where: {
                        group: {
                            OR: [
                                {
                                    name: {
                                        contains: keyword,
                                        mode: 'insensitive'
                                    }                                    
                                },
                                {
                                    groupOwner: {
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
                    },
                    orderBy: {
                        group: {
                            createdAt: "desc"
                        }
                    }
                }
            },
        })
        return {
            data: groups
        }
    } catch (error: any) {
        throw new Error(error.message)        
    }
}