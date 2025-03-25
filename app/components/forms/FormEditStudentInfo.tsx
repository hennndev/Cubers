import React from 'react'
import * as zod from "zod"
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { UserDataDetailTypes } from '@/types/next-env'
import { DetailStudentSchema } from '@/schemas/profile'
import { editProfileStudentInfo } from '@/lib/actions/users/editProfileStudentInfo'
// components
import { Input } from "@/app/components/ui/input"
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/app/components/ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/app/components/ui/select"

type PropsTypes = {
  data: UserDataDetailTypes
  setIsLoading: (value: boolean) => void
  closeModal: () => void
}

const FormEditStudentInfo = ({data, setIsLoading, closeModal}: PropsTypes) => {
  const form = useForm<zod.infer<typeof DetailStudentSchema>>({
    defaultValues: {
      institution: data.detailStudent?.institution || '',
      major: data.detailStudent?.major || '',
      gradeLevel: data.detailStudent?.gradeLevel || ''
    }
  })
  const onSubmit = async (values: zod.infer<typeof DetailStudentSchema>) => {
    if(data.detailStudent?.institution === values.institution && data.detailStudent?.major === values.major && data.detailStudent?.gradeLevel === values.gradeLevel) {
      toast.warning("Profile detail student info has no changed")
      return
    }
    setIsLoading(true)
    try {
      await editProfileStudentInfo(data.username, data.detailStudent?.id as number, values)
      toast.success("Profile detail student info has updated")
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
        {/* institution */}
        <FormField
          control={form.control}
          name="institution"
          render={({ field }) => (
            <FormItem className='flex flex-col space-y-1.5 mb-3'>
              <label htmlFor="institution" className='text-sm'>
                Institution Name
              </label>
              <FormControl>
                <Input type='text' id='institution' placeholder='Input your instiution name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        {/* major */}
        <FormField
          control={form.control}
          name="major"
          render={({ field }) => (
            <FormItem className='flex flex-col space-y-1.5 mb-3'>
              <label htmlFor="major" className='text-sm'>
                Major
              </label>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger id='major'>
                    <SelectValue placeholder="Select a major" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Major</SelectLabel>
                      <SelectItem value="master">Master</SelectItem>
                      <SelectItem value="bachelor">Bachelor</SelectItem>
                      <SelectItem value="diploma">Diplome</SelectItem>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="junior-high-school">Junior High School</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        {/* grade level */}
        <FormField
          control={form.control}
          name="gradeLevel"
          render={({ field }) => (
            <FormItem className='flex flex-col space-y-1.5 mb-3'>
              <label htmlFor="gradeLevel" className='text-sm'>
                Grade Level
              </label>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger id="gradeLevel">
                    <SelectValue placeholder="Select a grade level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Grade Level</SelectLabel>
                      <SelectItem value=">semester8">&gt; Semester 8</SelectItem>
                      <SelectItem value=">semester5">&gt; Semester 5</SelectItem>
                      <SelectItem value=">semester3">&gt; Semester 3</SelectItem>
                      <SelectItem value=">=semester1">&ge; Semester 1</SelectItem>
                      <SelectItem value="class-12">Class 12 (For high schoole)</SelectItem>
                      <SelectItem value="class-11">Class 11 (For high schoole)</SelectItem>
                      <SelectItem value="class-10">Class 10 (For high schoole)</SelectItem>
                      <SelectItem value="class-9">Class 9 (For junior high schoole)</SelectItem>
                      <SelectItem value="class-8">Class 8 (For junior high schoole)</SelectItem>
                      <SelectItem value="class-7">Class 7 (For junior high schoole)</SelectItem>
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

export default FormEditStudentInfo