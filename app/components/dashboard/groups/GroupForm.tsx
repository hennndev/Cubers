"use client"
import React, { useState } from 'react'
import { toast } from 'sonner'
import { Input } from '@/app/components/ui/input'
import { Textarea } from '@/app/components/ui/textarea'
import { Form, FormField, FormItem, FormControl, FormMessage } from '../../ui/form'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/app/components/ui/select"
import { useForm, useFieldArray } from 'react-hook-form'
import { Button } from '@/app/components/ui/button'
import * as zod from "zod"
import { GroupSchema } from '@/schemas/group'
import { zodResolver } from '@hookform/resolvers/zod'
import GroupFindMembersInput from './GroupFindMembersInput'
import GroupTagsInput from './GroupTagsInput'

enum FormLevelEnum {
    Common,
    Middle,
    Priority
}

type FormTypes = {
    name: string
    description: string
    level: FormLevelEnum
    members: String[]
    tags: String[] 
}

const GroupForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const form = useForm<zod.infer<typeof GroupSchema>>({
        resolver: zodResolver(GroupSchema),
        defaultValues: {
                name: "",
                description: "",
                level: "Common",
                members: [],
                tags: []
        }
    })
    
    const onSubmit = async (values: zod.infer<typeof GroupSchema>) => {
        setIsLoading(true)
        try {
            
            toast.success("New group has created")
        } catch (error) {
            toast.error("Failed create new group")
        } finally {
            setIsLoading(false)
        }
    }
    
    return (
        <section className='px-10'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className='flex flex-col space-y-1.5 mb-5'>
                                <label htmlFor='name' className='text-md'>
                                    Name <span className='text-red-500'>*</span>
                                </label>
                                <FormControl>
                                    <Input 
                                        id='name' 
                                        disabled={isLoading} 
                                        placeholder="Input group name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className='flex flex-col space-y-1.5 mb-5'>
                                <label htmlFor='level' className='text-md'>
                                    Level <span className='text-red-500'>*</span>
                                </label>
                                <Select disabled={isLoading} value={field.value} onValueChange={field.onChange}>
                                    <FormControl id='level'>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a group level" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Choose group level</SelectLabel>
                                            <SelectItem value="common">Common</SelectItem>
                                            <SelectItem value="middle">Middle</SelectItem>
                                            <SelectItem value="priority">Priority</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <GroupFindMembersInput control={form.control}/>
                    <GroupTagsInput control={form.control}/>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className='flex flex-col space-y-1.5 mb-5'>
                                <label htmlFor='description' className='text-md'>
                                    Description <span className='text-red-500'>*</span>
                                </label>
                                <FormControl id='description'>
                                <Textarea 
                                    {...field}
                                    rows={7}
                                    placeholder='Input group description'/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={isLoading}>
                        Submit new group
                    </Button>
                </form>
            </Form>
        </section>
    )
}

export default GroupForm