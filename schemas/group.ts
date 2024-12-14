import * as zod from 'zod'

export const GroupSchema = zod.object({
    name: zod.string(),
    level: zod.enum(["Common", "Middle", "Priority"]),
    description: zod.string(),
    tags: zod.array(zod.string()),
    members: zod.array(zod.number())
})