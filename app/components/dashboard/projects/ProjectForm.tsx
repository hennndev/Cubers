"use client"
import React, { useState, useEffect } from 'react'
import * as zod from "zod"
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
// components
import { LuLoader2 } from 'react-icons/lu'
import { Input } from '@/app/components/ui/input'
import ProjectTagsInput from './ProjectTagsInput'
import { ProjectSchema } from '@/schemas/project'
import { Button } from '@/app/components/ui/button'
import { Textarea } from '@/app/components/ui/textarea'
import ProjectFindMembersInput from './ProjectFindMembersInput'
import { createProject } from '@/lib/actions/projects/createProject'
import { Form, FormField, FormItem, FormControl, FormMessage } from '../../ui/form'
import {  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/app/components/ui/select"

type PropsTypes = {
    isEditPage?: boolean
    groupId?: number
}

const ProjectForm = ({isEditPage, groupId}: PropsTypes) => {
    const router = useRouter()
    const session = useSession()
    const userId = session.data?.user.id
    const sessionUsername = session.data?.user.username
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false)
    const form = useForm<zod.infer<typeof ProjectSchema>>({
        resolver: zodResolver(ProjectSchema),
        defaultValues: {
            name: "",
            description: "",
            level: "Common",
            members: [],
            tags: []
        }
    })
    
    const onSubmit = async (values: zod.infer<typeof ProjectSchema>) => {
        setIsLoading(true)
        try {
            const transformValues = {
                ...values,
                members: values.members.map(obj => obj.member),
                tags: values.tags.map(obj => obj.tag)
            }
            if(!isEditPage) {
                await createProject(userId as string, transformValues)
                toast.success("New project has created")
                router.push("/dashboard/projects")
            } else {
                // await editGroup(userId as string, groupTerm?.id as number, transformValues)
                // toast.success("Group has updated")
                // router.push("/dashboard/groups")
            }
        } catch (error) {
            toast.error("Failed create new project")
        } finally {
            setIsLoading(false)
        }
    }

    // const handleGetGroup = async () => {       
    //     const isGroupStored = groupTerm?.id === groupId 
    //     if(!groupTerm || !isGroupStored) {
    //         setIsLoadingPage(true)
    //         const group = await getGroup(groupId as number)
    //         if(group.data) {
    //             const transformGroupMember = group.data?.members.map(obj => ({
    //                 member: obj.username
    //             }))
    //             const transformTags = group.data.tags.map(tag => ({
    //                 tag
    //             }))
    //             setGroupTerm({
    //                 id: group.data.id,
    //                 name: group.data.name,
    //                 level: group.data.level,
    //                 description: group.data.description,
    //                 tags: transformTags,
    //                 members: transformGroupMember,
    //                 groupOwner: group.data.groupOwner
    //             })
    //             setIsLoadingPage(false)
    //         } 
    //         if(!group.data) {
    //             router.push("/dashboard/groups")
    //         }
    //     }  
    // }

    // useEffect(() => {
    //     if(isEditPage && groupId) {
    //         handleGetGroup()
    //     }
    // }, [isEditPage, groupId])

    // useEffect(() => {
    //     if(isEditPage && groupTerm) {
    //         form.setValue("name", groupTerm.name)
    //         form.setValue("level", groupTerm.level)
    //         form.setValue("description", groupTerm.description)
    //         form.setValue("members", groupTerm.members.filter(obj => obj.member !== sessionUsername))
    //         form.setValue("tags", groupTerm.tags)
    //     }
    // }, [isEditPage, groupTerm])
   
    // useEffect(() => {
    //     if(isEditPage && groupTerm && userId && userId !== groupTerm.groupOwner.id) {
    //         router.push("/dashboard/groups")
    //     }
    // }, [isEditPage, groupTerm, userId, router])

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
                                        placeholder="Input project name" {...field} />
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
                                            <SelectValue placeholder="Select a project level" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Choose project level</SelectLabel>
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
                    <ProjectFindMembersInput isLoading={isLoading} control={form.control}/>
                    <ProjectTagsInput isLoading={isLoading} control={form.control}/>
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
                                        placeholder='Input project description'/>
                                    </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={isLoading}>
                        {isLoading && <LuLoader2 className='animate-spin'/>} {isLoading ? "Loading" : isEditPage ? "Submit edit group" : "Submit new project"}
                    </Button>
                </form>
            </Form>
        </section>
    )
}

export default ProjectForm