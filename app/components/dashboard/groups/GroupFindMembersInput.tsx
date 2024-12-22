"use client"
import React, { useState, useRef } from 'react'
import { debounce } from 'lodash'
import * as zod from "zod"
import { LuX } from 'react-icons/lu'
import { useSession } from 'next-auth/react'
import { GroupSchema } from '@/schemas/group'
import { Input } from '@/app/components/ui/input'
import { Control, useFieldArray } from 'react-hook-form'
import { findUsers } from '@/lib/actions/users/findUsers'
import SelectedSearchUser from '@/app/components/utils/SelectedSearchUser'

type PropsTypes = {
    control: Control<zod.infer<typeof GroupSchema>>
}

const GroupFindMembersInput = ({control}: PropsTypes) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [results, setResults] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const { fields, append, remove } = useFieldArray({name: "members", control})

    const debouncedSearchUsers = debounce(async (keyword) => {
        const results = await findUsers(keyword)
        setResults(results.data as any)
    }, 500)

    const handleChange = (value: string) => {
        setSearchTerm(value)
        debouncedSearchUsers(value)
    }

    const handleAddMember = (e: React.MouseEvent<HTMLButtonElement>, member: string) => {
        append({member: member})
        setSearchTerm("")
        inputRef.current?.focus()
    }

    const isAdded = (member: string) => {
        return fields.find(field => field.member === member)
    }

    return (
        <section className='relative w-full h-auto mb-5'>
            <section className='flex flex-col space-y-1.5'>
                <label htmlFor="name" className='text-base'>Find and invite member</label>
                <Input 
                    type='text' 
                    ref={inputRef}
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
                    placeholder='Input group name'/>
                {fields.length > 0 && (
                    <div className="flexx flex-wrap !mt-4">
                        {fields.map((field, index) => (
                            <div className='relative shadow dark:border dark:border-[#222] py-2 px-4 rounded-lg cursor-pointer mr-4 mb-2' key={field.id}>
                                <LuX className='absolute top-0 right-0 w-3.5 h-3.5' onClick={() => remove(index)}/>
                                {field.member}
                            </div>
                        ))}
                    </div>
                )}
            </section>
            {searchTerm && (
                <SelectedSearchUser 
                    isUsername
                    utilClass="!top-20"
                    results={results} 
                    isAdded={(member: string) => Boolean(isAdded(member))}
                    handleAdd={(e: React.MouseEvent<HTMLButtonElement>, memberId: string) => handleAddMember(e, memberId)}/>
            )}
        </section>
    )
}

export default GroupFindMembersInput