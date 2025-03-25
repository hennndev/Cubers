import React from 'react'
import * as zod from "zod"
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { UserDataDetailTypes } from '@/types/next-env'
import { DetailWorkerSchema } from '@/schemas/profile'
import { editProfileWorkerInfo } from '@/lib/actions/users/editProfileWorkerInfo'
// components
import { Input } from "@/app/components/ui/input"
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/app/components/ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/app/components/ui/select"

type PropsTypes = {
  data: UserDataDetailTypes,
  setIsLoading: (value: boolean) => void
  closeModal: () => void
}

const FormEditWorkerInfo = ({ data, setIsLoading, closeModal }: PropsTypes) => {
  const form = useForm<zod.infer<typeof DetailWorkerSchema>>({
    defaultValues: {
      position: data.detailWorker?.position || '',
      company: data.detailWorker?.company || '',
      department: data.detailWorker?.department || '',
      experience: data.detailWorker?.experience || '',
    }
  })
  const onSubmit = async (values: zod.infer<typeof DetailWorkerSchema>) => {
    const { detailWorker } = data
    if (detailWorker?.position === values.position && detailWorker?.company === values.company && detailWorker.department === values.department && detailWorker.experience === values.experience) {
      toast.warning("Profile detail worker info has no changed")
      return
    }
    setIsLoading(true)
    try {
      await editProfileWorkerInfo(data.username, detailWorker?.id as number, values)
      toast.success("Profile detail worker info has updated")
      closeModal()
    } catch (error: any) {
      console.log(error)
      toast.error(error.message || "Seomthing went wrong")
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Form {...form}>
      <form id="submit-form" onSubmit={form.handleSubmit(onSubmit)} className='mt-5 flex flex-col'>
        {/* position  */}
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem className='flex flex-col space-y-1.5 mb-3'>
              <label htmlFor="position" className='text-sm'>
                Position
              </label>
              <FormControl>
                <Input type='text' id='position' placeholder='Input your position' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        {/* company */}
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem className='flex flex-col space-y-1.5 mb-3'>
              <label htmlFor="company" className='text-sm'>
                Company
              </label>
              <FormControl>
                <Input type='text' id='company' placeholder='Input your company' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        {/* department */}
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem className='flex flex-col space-y-1.5 mb-3'>
              <label htmlFor="department" className='text-sm'>
                Department
              </label>
              <FormControl>
                <Input type='text' id='department' placeholder='Input your whatsapp number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        {/* experience */}
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem className='flex flex-col space-y-1.5 mb-3'>
              <label htmlFor="experience" className='text-sm'>
                Experience
              </label>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger id="experience">
                    <SelectValue placeholder="Select an experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Experience</SelectLabel>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
      </form>
    </Form>
  )
}

export default FormEditWorkerInfo