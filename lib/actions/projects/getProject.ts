"use server"
import { prisma } from "@/lib/config/prisma"

export const getProject = async (projectId: number) => {
  try {
    if (!projectId) {
      throw new Error("Something went wrong")
    }
    const project = await prisma.project.findUnique({
      where: {
        id: projectId
      },
      select: {
        id: true,
        name: true,
        priority: true,
        tags: true,
        description: true,
        members: {
          select: {
            username: true,
            roleControl: true
          }
        },
        estimatedBudget: true,
        startDate: true,
        endDate: true,
        projectOwner: {
          select: {
            id: true
          }
        },
      }
    })
    return {
      data: project
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}