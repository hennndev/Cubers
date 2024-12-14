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
        const userEmail = await prisma.user.findUnique({
            where: {
                email: fields.email
            }
        })
        if(userEmail) {
            throw new Error("Email already used")
        }
        const userUsername = await prisma.user.findUnique({
            where: {
                username: fields.username
            }
        })
        if(userUsername) {
            throw new Error("Username already used. Please type your unique username")
        }
        const hashPassword = await bcrypt.hash(fields.password, 10)
        await prisma.user.create({
            data: {
                id: uuid(),
                ...fields,
                password: hashPassword,
            }
        })
        await receiveEmailVerification(fields.email)
        return {
            message: "User has create. Please verified your email first before explore our services."
        }
    } catch (error: any) {
        return {
            error: error.message || "Something went wrong"
        }
    }
}