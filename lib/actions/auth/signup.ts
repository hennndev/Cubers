"use server"
import * as zod from "zod"
import bcrypt from "bcryptjs"
import { v4 as uuid} from "uuid"
import { prisma } from "@/lib/config/prisma"
import { SignupSchema } from "@/schemas/auth"
import { receiveEmailVerification } from "../emails/emailAction"

export const signup = async (values: zod.infer<typeof SignupSchema>) => {
    try {
        const {passwordConfirm, ...fields} = SignupSchema.parse(values)
        // Cek apakah user dengan email tersebut ada/tidak
        const userEmail = await prisma.user.findUnique({
            where: {
                email: fields.email
            }
        })
        // Jika ada, throw error
        if(userEmail) {
            throw new Error("Email already used")
        }
        // Cek apakah user dengan username unik tersebut ada/tidak
        const userUsername = await prisma.user.findUnique({
            where: {
                username: fields.username
            }
        })
        // Jika ada, throw error
        if(userUsername) {
            throw new Error("Username already used. Please type your unique username")
        }
        // Lalu buat hash password
        const hashPassword = await bcrypt.hash(fields.password, 10)
        // Buat user baru
        await prisma.user.create({
            data: {
                id: uuid(),
                ...fields,
                password: hashPassword,
            }
        })
        // Lalu kirim email verifikasi ke email user berdasarkan email dia dan username dia
        await receiveEmailVerification(fields.email, fields.username)
        return {
            message: "User has create. Please verified your email first before explore our services."
        }
    } catch (error: any) {
        // catch error
        return {
            error: error.message || "Something went wrong"
        }
    }
}