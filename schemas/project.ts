import * as zod from "zod"

export const ProjectSchema = zod.object({
    name: zod.string().min(1, {message: "Project name is required"}),
    level: zod.enum(["Common", "Middle", "Priority"], {message: "Group level only require Common/Middle/Priority"}),
    description: zod.string().min(1, {message: "Project description is required"}),
    tags: zod.object({
        tag: zod.string().min(1)
    }).array(),
    members: zod.object({
        member: zod.string().min(1)
    }).array()

})