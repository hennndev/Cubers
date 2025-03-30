"use client"
import React, { useState, useEffect } from 'react'
import * as zod from "zod"
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { format } from "date-fns"
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ProjectSchema } from '@/schemas/project'
import { zodResolver } from '@hookform/resolvers/zod'
import { getProject } from '@/lib/actions/projects/getProject'
import { editProject } from '@/lib/actions/projects/editProject'
import { createProject } from '@/lib/actions/projects/createProject'
// components
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { LuLoader, LuCalendar } from 'react-icons/lu'
import { Calendar } from "@/app/components/ui/calendar"
import { Textarea } from '@/app/components/ui/textarea'
import ProjectTagsInput from '@/app/components/dashboard/projects/ProjectTagsInput'
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover"
import ProjectFindMembersInput from '@/app/components/dashboard/projects/ProjectFindMembersInput'
import { Form, FormField, FormItem, FormControl, FormMessage, FormDescription } from '@/app/components/ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/app/components/ui/select"

type PropsTypes = {
  isEditPage?: boolean
  projectId?: number //for edit project form
}

type ProjectTermTypes = zod.infer<typeof ProjectSchema> & {
  id: number,
  projectOwner: {
    id: string
  }
} | null

const ProjectForm = ({ isEditPage, projectId }: PropsTypes) => {
  const router = useRouter()
  const session = useSession()
  const userId = session.data?.user.id
  const sessionUsername = session.data?.user.username
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false)
  const [projectTerm, setProjectTerm] = useState<ProjectTermTypes>(null)
  const form = useForm<zod.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      name: "",
      tags: [],
      members: [],
      priority: "LOW",
      description: "",
      estimatedBudget: "",
      endDate: new Date(),
      startDate: new Date(),
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
      if (!isEditPage) {
        await createProject(userId as string, transformValues)
        toast.success("New project has created")
        router.push("/dashboard/projects")
      } else {
        if(
            projectTerm && values.name === projectTerm.name && 
            values.priority === projectTerm.priority && 
            values.members.every((v, i) => v.member === projectTerm?.members.filter(member => member.member !== sessionUsername)[i].member) && 
            values.tags.every((v, i) => v.tag === projectTerm.tags[i].tag) && 
            values.startDate.getTime() === projectTerm.startDate.getTime() && 
            values.endDate.getTime() === projectTerm.endDate.getTime() && 
            values.estimatedBudget === projectTerm.estimatedBudget && 
            values.description === projectTerm.description) {
          toast.warning("Project data has no changed")
          return
        }
        await editProject(userId as string, projectTerm?.id as number, transformValues)
        toast.success("Project has updated")
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
      project.data.members.forEach(member => {
        if(member.username === sessionUsername && member.roleControl === "Member") {
          toast.warning("You didn't have permission to change this data")
          router.push("/dashboard/projects")
          return
        }
      })
      const transformProjectMember = project.data?.members.map(obj => ({
        member: obj.username
      }))
      const transformTags = project.data.tags.map(tag => ({
        tag
      }))
      setProjectTerm({
        id: project.data.id,
        name: project.data.name,
        priority: project.data.priority,
        description: project.data.description,
        tags: transformTags,
        members: transformProjectMember,
        projectOwner: project.data.projectOwner,
        estimatedBudget: project.data.estimatedBudget,
        startDate: project.data.startDate,
        endDate: project.data.endDate
      })
      setIsLoadingPage(false)
    }
  }

  useEffect(() => {
    if (isEditPage && projectId) {
      handleGetProject()
    }
  }, [userId, isEditPage, projectId])

  useEffect(() => {
    if (isEditPage && projectTerm) {
      form.reset({
        name: projectTerm.name,
        priority: projectTerm.priority,
        description: projectTerm.description,
        members: projectTerm.members.filter(obj => obj.member !== sessionUsername),
        tags: projectTerm.tags,
        estimatedBudget: projectTerm.estimatedBudget,
        startDate: projectTerm.startDate,
        endDate: projectTerm.endDate
      })
    }
  }, [isEditPage, projectTerm])

  if (isEditPage && isLoadingPage) {
    return (
      <section className='flex-center flex-col space-y-5'>
        <p className='animate-pulse'>Loading...</p>
      </section>
    )
  }


  console.log(form.formState.errors)

  return (
    <section className='px-10'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className='flex flex-col space-y-1.5 mb-5'>
                <label htmlFor='name' className='text-sm'>
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
          {/* priority */}
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem className='flex flex-col space-y-1.5 mb-5'>
                <label htmlFor='priority' className='text-sm'>
                  Priority <span className='text-red-500'>*</span>
                </label>
                <Select disabled={isLoading} value={field.value} onValueChange={field.onChange}>
                  <FormControl id='priority'>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a project level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Choose project priority</SelectLabel>
                      <SelectItem value="LOW" className='capitalize'>LOW</SelectItem>
                      <SelectItem value="MEDIUM" className='capitalize'>MEDIUM</SelectItem>
                      <SelectItem value="HIGH" className='capitalize'>HIGH</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* members */}
          <ProjectFindMembersInput isLoading={isLoading} control={form.control} />
          <ProjectTagsInput isLoading={isLoading} control={form.control} />
          <section className='w-full flexx space-x-3'>
            {/* start date */}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className='flex flex-1 flex-col space-y-1.5 mb-5'>
                  <label htmlFor='endDate' className='text-sm'>
                    Start Date <span className='text-red-500'>*</span>
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <LuCalendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))} // Disable sebelum hari ini
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* end date */}
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className='flex flex-1 flex-col space-y-1.5 mb-5'>
                  <label htmlFor='endDate' className='text-sm'>
                    Start Date <span className='text-red-500'>*</span>
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <LuCalendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))} // Disable sebelum hari ini
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          {/* estimated budget */}
          <FormField
            control={form.control}
            name="estimatedBudget"
            render={({ field }) => (
              <FormItem className='flex flex-col space-y-1.5 mb-5'>
                <label htmlFor='estimatedBudget' className='text-sm'>
                  Estimated Budget <span className='text-red-500'>*</span>
                </label>
                <Select disabled={isLoading} value={field.value} onValueChange={field.onChange}>
                  <FormControl id='level'>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an estimated budget" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Choose estimated budget</SelectLabel>
                      <SelectItem value="Not yet decided">Not yet decided</SelectItem>
                      <SelectItem value="± $100">&plusmn; $100</SelectItem>
                      <SelectItem value="± $500">&plusmn; $500</SelectItem>
                      <SelectItem value="± $1000">&plusmn; $1000</SelectItem>
                      <SelectItem value="± $2000">&plusmn; $2000</SelectItem>
                      <SelectItem value="± $5000">&plusmn; $5000</SelectItem>
                      <SelectItem value="± $10000">&plusmn; $10000</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Actual and spent budget can updated while project is running
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className='flex flex-col space-y-1.5 mb-5'>
                <label htmlFor='description' className='text-sm'>
                  Description <span className='text-red-500'>*</span>
                </label>
                <FormControl id='description'>
                  <Textarea
                    {...field}
                    disabled={isLoading}
                    rows={7}
                    placeholder='Input project description' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading}>
            {isLoading && <LuLoader className='animate-spin' />} {isLoading ? "Loading" : isEditPage ? "Submit edit project" : "Submit new project"}
          </Button>
        </form>
      </Form>
    </section>
  )
}

export default ProjectForm