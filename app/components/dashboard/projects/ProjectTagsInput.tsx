"use client"
import React, { useState, useRef } from 'react'
import * as zod from "zod"
import { LuX } from 'react-icons/lu'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Control } from 'react-hook-form'
import { useFieldArray } from 'react-hook-form'
import { ProjectSchema } from '@/schemas/project'

type PropsTypes = {
    isLoading: boolean
    control: Control<zod.infer<typeof ProjectSchema>>
}

const ProjectTagsInput = ({isLoading, control}: PropsTypes) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [tagTerm, setTagTerm] = useState<string>("")
    const { fields, append, remove } = useFieldArray({
        control,
        name: "tags", 
    })

    const handleAddTag = () => {
        append({tag: tagTerm.trim().replaceAll(" ", "")})
        setTagTerm("")
        inputRef.current?.focus()
    }

    const isAdded = () => {
        return fields.find(field => field.id === tagTerm)
    }

    return (
        <section className='flex flex-col space-y-1.5 mb-5'>
            <label htmlFor="name" className='text-base'>Tags</label>
            <section className='flexx space-x-3'>
                <Input 
                    disabled={isLoading}
                    type='text' 
                    ref={inputRef}
                    value={tagTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTagTerm(e.target.value.trim().replaceAll(" ", ""))}
                    placeholder='Input tag'/>
                <Button disabled={!tagTerm || Boolean(isAdded()) || isLoading} type='button' variant="outline" onClick={handleAddTag}>Add Tag</Button>
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

export default ProjectTagsInput