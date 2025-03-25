import * as zod from 'zod'


export const ProfileSchema = zod.object({
    email: zod.string().min(1, {message: "Email field is required"}).email("Email not valid"),
    name: zod.string().min(1, {message: "Name field is required"}),
    username: zod.string().min(1, {message: "Username field is required"}),
    status: zod.enum(["STUDENT", "WORKER", "STUDENT_AND_WORKER"], {message: "Only require student/worker/student and worker"}),
})

export const ProfilePersonalInformationsSchema = zod.object({
    country: zod.string(),
    city: zod.string(),
    bio: zod.string(),
    whatsappNumber: zod.string(),
    address: zod.string()
})

export const DetailStudentSchema = zod.object({
    institution: zod.string(),
    major: zod.string(),
    gradeLevel: zod.string()
})

export const DetailWorkerSchema = zod.object({
   position: zod.string(),
   company: zod.string(),
   department: zod.string(),
   experience: zod.string() 
})