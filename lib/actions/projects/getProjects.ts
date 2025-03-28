"use server"
import { prisma } from "@/lib/config/prisma"

export const getProjects = async (userId: string, keyword: string) => {
  try {
    if (!userId) {
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
            roleControl: true,
            project: {
              include: {
                members: true
              },
            }
          },
          where: {
            OR: [
              {
                username: {
                  contains: keyword,
                  mode: 'insensitive'
                }
              },
              {
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
            ]
          },
          orderBy: [
            {
              project: {
                priority: "desc"
              }
            },
          ],
        }
      },
    })
    return {
      data: projects
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}