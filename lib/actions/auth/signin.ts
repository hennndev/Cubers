"use server"
import * as zod from "zod"
import { v4 as uuid} from "uuid"
import { LoginSchema } from "@/schemas/auth"
import { signIn } from "@/auth"


export const login = async (values: zod.infer<typeof LoginSchema>) => {
    try {
        const fields = LoginSchema.parse(values)
        await signIn()
    } catch (error) {
        
    }
}