"use server"
import { prisma } from "@/lib/config/prisma"

export const checkEmailIsVerified = async (email: string) => {
  // mengidentifikasi apakah email tersebut sudah verified atau belum
  const user = await prisma.user.findUnique({
    where: {
      email: email
    },
  })
  if (!user?.emailVerified) {
    throw new Error("Email not verified")
  }
  return true
}