"use client"
import React, { useState, useRef } from 'react'
import { z } from "zod"
import { debounce } from 'lodash'
import { ProjectSchema } from '@/schemas/project'
import { Control, useFieldArray } from 'react-hook-form'
import { findUsers } from '@/lib/actions/users/findUsers'
// components
import { LuX } from 'react-icons/lu'
import { Input } from '@/app/components/ui/input'
import SelectedSearchUser from '@/app/components/utils/SelectedSearchUser'

type PropsTypes = {
  isLoading: boolean
  control: Control<z.infer<typeof ProjectSchema>>
}

const ProjectFindMembersInput = ({ isLoading, control }: PropsTypes) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [results, setResults] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const { fields, append, remove } = useFieldArray({
    control,
    name: "members"
  })

  const debouncedSearchUsers = debounce(async (keyword) => {
    const results = await findUsers(keyword)
    setResults(results.data as any)
  }, 500)

  const handleChange = (value: string) => {
    setSearchTerm(value)
    debouncedSearchUsers(value)
  }

  const handleAddMember = (e: React.MouseEvent<HTMLButtonElement>, member: string) => {
    e.stopPropagation()
    append({ member: member })
    setSearchTerm("")
    inputRef.current?.focus()
  }

  const isAdded = (member: string) => {
    return fields.find(field => field.member === member)
  }

  const handleClear = () => {
    setSearchTerm("")
    setResults([])
  }

  return (
    <section className='relative w-full h-auto mb-5'>
      <section className='flex flex-col space-y-1.5'>
        <label htmlFor="name" className='text-sm'>Find and invite member</label>
        <Input
          disabled={isLoading}
          type='text'
          ref={inputRef}
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
          placeholder='Input group name' />
        {fields.length > 0 && (
          <div className="flexx flex-wrap !mt-4">
            {fields.map((field, index) => (
              <div className='relative shadow dark:border dark:border-[#222] py-2 px-4 rounded-lg cursor-pointer mr-4 mb-2' key={field.id}>
                <LuX className='absolute top-0 right-0 w-3.5 h-3.5' onClick={() => remove(index)} />
                {field.member}
              </div>
            ))}
          </div>
        )}
      </section>
      {searchTerm && (
        <SelectedSearchUser
          isUsername
          handleClear={handleClear}
          utilClass="!top-20"
          results={results}
          isAdded={(member: string) => Boolean(isAdded(member))}
          handleAdd={(e: React.MouseEvent<HTMLButtonElement>, member: string) => handleAddMember(e, member)} />
      )}
    </section>
  )
}

export default ProjectFindMembersInput