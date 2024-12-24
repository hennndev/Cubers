import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import * as zod from "zod"
import { GroupSchema } from '@/schemas/group'

type GroupTerm = zod.infer<typeof GroupSchema> & { 
    id: number,
    groupOwner: {
        id: string
    }
 } | null

type GroupStoreTypes = {
    groupTerm: GroupTerm
    setGroupTerm: (groupData: GroupTerm) => void
}

export const useGroupStore = create(
    persist<GroupStoreTypes>(
        (set) => ({
            groupTerm: null,
            setGroupTerm: (groupData: GroupTerm) => set({ groupTerm: groupData }),
        }),
        {
            name: 'groupTerm', 
        },
    ),
)
