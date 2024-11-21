"use server"
import * as zod from "zod"
import bcrypt from "bcryptjs"
import { v4 as uuid} from "uuid"
import { prisma } from "@/lib/config/prisma"
import { SignupSchema } from "@/schemas/auth"

export const signup = async (values: zod.infer<typeof SignupSchema>) => {
    try {
        const fields = SignupSchema.parse(values)
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
        return {
            message: "Success create new user account"
        }
    } catch (error: any) {
        return {
            error: error.message || "Something went wrong"
        }
    }
}