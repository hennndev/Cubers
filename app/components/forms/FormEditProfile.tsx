import React from 'react'
import * as zod from 'zod'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { ProfileSchema } from "@/schemas/profile"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserDataDetailTypes } from '@/types/next-env'
import { editDetailProfile } from '@/lib/actions/users/editProfile'
// components
import { Badge } from '@/app/components/ui/badge'
import { Input } from "@/app/components/ui/input"
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/app/components/ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/app/components/ui/select"

type PropsTypes = {
  data: UserDataDetailTypes
  closeModal: () => void
  setIsLoading: (value: boolean) => void
}

const FormEditProfile = ({ data, closeModal, setIsLoading }: PropsTypes) => {
  const form = useForm<zod.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      email: data.email || '',
      name: data.name || '',
      username: data.username || '',
      status: data.status || 'STUDENT'
    }
  })
  const onSubmit = async (values: zod.infer<typeof ProfileSchema>) => {
    if(data.name === values.name && data.status === values.status) {
      toast.warning("Profile has no changed")
      return
    }
    setIsLoading(true)
    try {
      await editDetailProfile(values)
      toast.success("Profile has updated")
      closeModal()
    } catch (error: any) {
      console.log(error)
      toast.error(error.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form id="submit-form" onSubmit={form.handleSubmit(onSubmit)} className='mt-5 flex flex-col'>
        {/* disabled mail */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className='flex flex-col space-y-1.5 mb-3'>
              <label htmlFor="email" className='text-sm'>
                Email <Badge className="w-max ml-1">Verified</Badge>
              </label>
              <FormControl>
                <Input type='email' id='email' placeholder='Input your email' disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        {/* disabled username because unique, maybe can be changed but with some rules */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className='flex flex-col space-y-1.5 mb-3'>
              <label htmlFor="username" className='text-sm'>
                Username
              </label>
              <FormControl>
                <Input type='text' id='username' disabled placeholder='Input your username' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        {/* name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className='flex flex-col space-y-1.5 mb-3'>
              <label htmlFor="name" className='text-sm'>
                Name
              </label>
              <FormControl>
                <Input type='text' id='name' placeholder='Input your name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        {/* status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className='flex flex-col space-y-1.5 mb-3'>
              <label htmlFor="status" className='text-sm'>
                Status
              </label>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="STUDENT">Student</SelectItem>
                      <SelectItem value="WORKER">Worker</SelectItem>
                      <SelectItem value="STUDENT_AND_WORKER">Student and Worker</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
      </form>
    </Form >
  )
}

export default FormEditProfile