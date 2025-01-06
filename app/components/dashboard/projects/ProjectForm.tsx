"use client"
import React, { useState, useEffect } from 'react'
import * as zod from "zod"
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ProjectSchema } from '@/schemas/project'
import { zodResolver } from '@hookform/resolvers/zod'
import { getProject } from '@/lib/actions/projects/getProject'
import { createProject } from '@/lib/actions/projects/createProject'
// components
import { LuLoader2 } from 'react-icons/lu'
import { Input } from '@/app/components/ui/input'
import ProjectTagsInput from './ProjectTagsInput'
import { Button } from '@/app/components/ui/button'
import { Textarea } from '@/app/components/ui/textarea'
import ProjectFindMembersInput from './ProjectFindMembersInput'
import { editProject } from '@/lib/actions/projects/editProject'
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/app/components/ui/form'
import {  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/app/components/ui/select"

type PropsTypes = {
    isEditPage?: boolean
    projectId?: number
}

type ProjectTermTypes = zod.infer<typeof ProjectSchema> & { 
    id: number,
    projectOwner: {
        id: string
    }
 } | null

const ProjectForm = ({isEditPage, projectId}: PropsTypes) => {
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
    const [projectTerm, setProjectTerm] = useState<ProjectTermTypes>(null)
    
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
                const data = await editProject(userId as string, projectTerm?.id as number, transformValues)
                toast.success("Group has updated")
                router.push("/dashboard/projects")
            }
        } catch (error: any) {
            toast.error(error.message || "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    const handleGetProject = async () => {       
        setIsLoadingPage(true)
        const project = await getProject(projectId as number)
        if(project.data) {
            const transformProjectMember = project.data?.members.map(obj => ({
                member: obj.username
            }))
            const transformTags = project.data.tags.map(tag => ({
                tag
            }))
            setProjectTerm({
                id: project.data.id,
                name: project.data.name,
                level: project.data.level,
                description: project.data.description,
                tags: transformTags,
                members: transformProjectMember,
                projectOwner: project.data.projectOwner
            })
            setIsLoadingPage(false)
        } 
    }

    useEffect(() => {
        if(isEditPage && projectId) {
            handleGetProject()
        }
    }, [isEditPage, projectId])

    useEffect(() => {
        if(isEditPage && projectTerm) {
            form.reset({
                name: projectTerm.name,
                level: projectTerm.level,
                description: projectTerm.description,
                members: projectTerm.members.filter(obj => obj.member !== sessionUsername),
                tags: projectTerm.tags,
            })
        }
    }, [isEditPage, projectTerm])

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
                        {isLoading && <LuLoader2 className='animate-spin'/>} {isLoading ? "Loading" : isEditPage ? "Submit edit project" : "Submit new project"}
                    </Button>
                </form>
            </Form>
        </section>
    )
}

export default ProjectForm