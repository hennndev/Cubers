"use client"

import React, { useState, useRef } from 'react'
import * as zod from "zod"
import { LuX } from 'react-icons/lu'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Control } from 'react-hook-form'
import { GroupSchema } from '@/schemas/group'
import { useFieldArray } from 'react-hook-form'

type PropsTypes = {
    control: Control<zod.infer<typeof GroupSchema>>
}

const GroupTagsInput = ({control}: PropsTypes) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [tagTerm, setTagTerm] = useState<string>("")
    const { fields, append, remove } = useFieldArray({name: "tags", control})

    const handleAddTag = () => {
        append({tag: tagTerm.trim().replaceAll(" ", "")})
        setTagTerm("")
        inputRef.current?.focus()
    }

    const isAdded = () => {
        return fields.find(field => field.tag === tagTerm)
    }

    return (
        <section className='flex flex-col space-y-1.5 mb-5'>
            <label htmlFor="name" className='text-base'>Tags</label>
            <section className='flexx space-x-3'>
                <Input 
                    type='text' 
                    ref={inputRef}
                    value={tagTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTagTerm(e.target.value.trim().replaceAll(" ", ""))}
                    placeholder='Input group name'/>
                <Button disabled={!tagTerm || Boolean(isAdded())} type='button' variant="outline" onClick={handleAddTag}>Add Tag</Button>
            </section>
            {fields.length > 0 && (
                <div className="flexx flex-wrap !mt-4">
                    {fields.map((field, index) => (
                        <div className='relative shadow dark:border dark:border-[#222] py-2 px-4 rounded-lg cursor-pointer mr-4 mb-2' key={field.id}>
                            <LuX className='absolute top-0 right-0 w-3.5 h-3.5' onClick={() => remove(index)}/>
                            {field.tag}
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}

export default GroupTagsInput