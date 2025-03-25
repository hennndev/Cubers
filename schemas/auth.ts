import * as zod from 'zod'

export const LoginSchema = zod.object({
    email: zod.string().min(1, {message: "Email field is required"}).email("Email not valid"),
    password: zod.string().min(1, {message: "Password field is required"}).min(7, {message: "Minimum password length is 7 characters"}),
    rememberMe: zod.boolean().default(false)
})

export const SignupSchema = zod.object({
    name: zod.string().min(1, {message: "Name field is required"}),
    username: zod.string().min(1, {message: "Username field is required"}).min(3, {message: "Minimum username length is 3 characters"}).max(10, {message: "Maximum username length is 10 characters"}),
    email: zod.string().min(1, {message: "Email field is required"}).email("Email not valid"),
    status: zod.enum(['STUDENT', 'WORKER', 'STUDENT_AND_WORKER'], {message: "status only require STUDENT/WORKER/STUDENT_AND_WORKER"}),
    password: zod.string().min(1, {message: "Password field is required"}).min(7, {message: "Minimum password length is 7 characters"}),
    passwordConfirm: zod.string().min(1, {message: "Password confirm is required"}).min(7, {
        message: "Minimum password confirm length is 7 characters"
    }).optional()
}).refine((field) => field.password === field.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Password confirm not match with password"
})