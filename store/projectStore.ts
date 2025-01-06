import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import * as zod from "zod"
import { GroupSchema } from '@/schemas/group'
import { ProjectSchema } from '@/schemas/project'

type ProjectTermTypes = zod.infer<typeof ProjectSchema> & { 
    id: number,
    projectOwner: {
        id: string
    }
 } | null

type GroupStoreTypes = {
    projectTerm: ProjectTermTypes
    setProjectTerm: (groupData: ProjectTermTypes) => void
}

export const useProjectStore = create(
    persist<GroupStoreTypes>(
        (set) => ({
            projectTerm: null,
            setProjectTerm: (projectData: ProjectTermTypes) => set({ projectTerm: projectData }),
        }),
        {
            name: 'projectTerm', 
        },
    ),
)
