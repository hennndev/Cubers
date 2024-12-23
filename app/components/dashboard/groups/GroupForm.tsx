"use client"
import React, { useState, useEffect } from 'react'
import * as zod from "zod"
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { LuLoader2 } from 'react-icons/lu'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { GroupSchema } from '@/schemas/group'
import GroupTagsInput from './GroupTagsInput'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/app/components/ui/textarea'
import GroupFindMembersInput from './GroupFindMembersInput'
import { createGroup } from '@/lib/actions/groups/createGroup'
import { useGroupStore } from '@/store/groupStore'
import { Form, FormField, FormItem, FormControl, FormMessage } from '../../ui/form'
import {  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { getGroup } from '@/lib/actions/groups/getGroup'

type PropsTypes = {
    isEditPage?: boolean
    groupId?: number
}

const GroupForm = ({isEditPage, groupId}: PropsTypes) => {
    const router = useRouter()
    const session = useSession()
    const userId = session.data?.user.id
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false)
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
    const { groupTerm, setGroupTerm } = useGroupStore()
    
    const onSubmit = async (values: zod.infer<typeof GroupSchema>) => {
        setIsLoading(true)
        try {
            const transformValues = {
                ...values,
                members: values.members.map(obj => obj.member),
                tags: values.tags.map(obj => obj.tag)
            }
            await createGroup(userId as string, transformValues)
            toast.success("New group has created")
            form.reset()
            router.push("/dashboard/groups")
        } catch (error) {
            toast.error("Failed create new group")
        } finally {
            setIsLoading(false)
        }
    }

    const handleGetGroup = async () => {       
        const isGroupStored = groupTerm?.id === groupId 
        if(!groupTerm || !isGroupStored) {
            setIsLoadingPage(true)
            const group = await getGroup(groupId as number)
            if(group.data) {
                const transformGroupMember = group.data?.members.map(obj => ({
                    member: obj.username
                }))
                const transformTags = group.data.tags.map(tag => ({
                    tag
                }))
                setGroupTerm({
                    id: group.data.id,
                    name: group.data.name,
                    level: group.data.level,
                    description: group.data.description,
                    tags: transformTags,
                    members: transformGroupMember
                })
                setIsLoadingPage(false)
            } 
            if(!group) {
                router.push("/dashboard/groups")
            }
        }  
    }

    useEffect(() => {
        if(isEditPage && groupId) {
            handleGetGroup()
        }
    }, [isEditPage, groupId])


    useEffect(() => {
        if(isEditPage && groupTerm) {
            form.setValue("name", groupTerm.name)
            form.setValue("level", groupTerm.level)
            form.setValue("description", groupTerm.description)
            form.setValue("members", groupTerm.members)
            form.setValue("tags", groupTerm.tags)
        }
    }, [isEditPage, groupTerm])
    

    if(isEditPage && isLoadingPage) {
        return (
            <section className='flex-center flex-col space-y-5'>
                <p className='animate-pulse'>Loading...</p>
            </section>
        )
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
                        name="level"
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
                                            <SelectItem value="Common">Common</SelectItem>
                                            <SelectItem value="Middle">Middle</SelectItem>
                                            <SelectItem value="Priority">Priority</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <GroupFindMembersInput isLoading={isLoading} control={form.control}/>
                    <GroupTagsInput isLoading={isLoading} control={form.control}/>
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
                                        disabled={isLoading}
                                        rows={7}
                                        placeholder='Input group description'/>
                                    </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={isLoading}>
                        {isLoading && <LuLoader2 className='animate-spin'/>} {isLoading ? "Loading" : "Submit new group"}
                    </Button>
                </form>
            </Form>
        </section>
    )
}

export default GroupForm