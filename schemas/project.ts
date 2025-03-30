import * as zod from "zod"
import { ProjectPriority, RoleControl } from "@prisma/client"

export const ProjectSchema = zod.object({
    name: zod.string().min(1, {message: "Project name is required"}),
    priority: zod.nativeEnum(ProjectPriority, {message: "Priority only require Low/Medium/High"}),
    description: zod.string().min(1, {message: "Project description is required"}),
    tags: zod.object({
        tag: zod.string().min(1)
    }).array(),
    members: zod.object({
        member: zod.string().min(1)
    }).array(),
    startDate: zod.date({required_error: "Start date is required"}),
    endDate: zod.date({required_error: "End date is required"}),
    estimatedBudget: zod.string().min(1, { message: "Estimated budget is required" })
})



export const ProjectMemberSchema = zod.object({
    username: zod.string().min(1, {message: "Username field is required"}),
    roleControl: zod.nativeEnum(RoleControl),
    roles: zod.object({
        role: zod.string().min(1)
    })
})