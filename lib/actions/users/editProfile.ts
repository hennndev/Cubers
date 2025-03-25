"use server"
import * as zod from "zod"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/config/prisma"
import { ProfileSchema } from "@/schemas/profile"
import { DetailStudent, DetailWorker, UserStatus } from "@prisma/client"

export const editDetailProfile = async (data: zod.infer<typeof ProfileSchema>) => {
  try {
    // Check user is exist or not
    const user = await prisma.user.findFirst({
      where: {
        email: data.email
      }
    })
    //If not existed, throwing new error
    if(!user) {
      throw new Error("User not exist")
    }

    //function for create new detailWorker
    async function createNewDetailWorker(): Promise<DetailWorker> {
      const newDetailWorker = await prisma.detailWorker.create({
        data: {
          position: '',
          company: '',
          department: '',
          experience: ''
        }
      })
      return newDetailWorker
    }
    //function for create new detailStudent
    async function createNewDetailStudent(): Promise<DetailStudent> {
      const newDetailStudent = await prisma.detailStudent.create({
        data: {
          institution: '',
          major: '',
          gradeLevel: ''
        }
      })
      return newDetailStudent
    }
    //function for update user
    async function updateUser(status: UserStatus, detailWorkerId: number | null = null, detailStudentId: number | null = null ) {
      await prisma.user.update({
        where: {
          email: data.email
        },
        data: {
          name: data.name,
          status: data.status,
          detailStudentId: detailStudentId,
          detailWorkerId: detailWorkerId
        }
      })
    }

    //if current status is STUDENT and new status is not STUDENT
    if(user.status === "STUDENT" && user.status !== data.status) {
      if(data.status === "WORKER") {
        //if new status is WORKER, then delete detail student
        await prisma.detailStudent.delete({
          where: {
            id: user.detailStudentId as number
          }
        })
      }
      const newDetailWorker = await createNewDetailWorker()
      //jika statusnya adalah STUDENT AND WORKER, maka tambah parameter detailStudentId sebelumnya
      await updateUser(data.status, newDetailWorker.id, data.status === "STUDENT_AND_WORKER" ? user.detailStudentId : null)
    } 
    if(user.status === "WORKER" && user.status !== data.status) {
      if(data.status === "STUDENT") {
        await prisma.detailWorker.delete({
          where: {
            id: user.detailWorkerId as number
          }
        })
      }
      const newDetailStudent = await createNewDetailStudent()
      await updateUser(data.status, data.status === "STUDENT_AND_WORKER" ? user.detailWorkerId : null, newDetailStudent.id)
    } 
    if(user.status === "STUDENT_AND_WORKER" && user.status !== data.status) {
      if(data.status === "WORKER") {
        await prisma.detailStudent.delete({
          where: {
            id: user.detailStudentId as number
          }
        })
        await updateUser(data.status, user.detailWorkerId, null)
      } else if(data.status === "STUDENT") {
        await prisma.detailWorker.delete({
          where: {
            id: user.detailWorkerId as number
          }
        })
        await updateUser(data.status, null, user.detailStudentId)
      }
    }
    if(user.status === data.status) {
      await prisma.user.update({
        where: {
          email: data.email
        },
        data: {
          name: data.name
        }
      })
    }
    revalidatePath(`/dashboard/profile/${data.username}`)
  } catch (error: any) {
    throw new Error(error.message)    
  }
}