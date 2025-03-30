import React from 'react'
import * as zod from 'zod'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { ProfileSchema } from "@/schemas/profile"
import { ProjectMemberSchema } from '@/schemas/project'
import { zodResolver } from "@hookform/resolvers/zod"
import { UserDataDetailTypes } from '@/types/next-env'
import { editDetailProfile } from '@/lib/actions/users/editProfile'
// components
import { Badge } from '@/app/components/ui/badge'
import { Input } from "@/app/components/ui/input"
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/app/components/ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/app/components/ui/select"

type PropsTypes = {
  closeModal: () => void
  setIsLoading: (value: boolean) => void
}

const FormAddProjectMember = ({ closeModal, setIsLoading }: PropsTypes) => {
  const form = useForm<zod.infer<typeof ProjectMemberSchema>>({
    resolver: zodResolver(ProjectMemberSchema),
    defaultValues: {
      username: "",
      roleControl: "Member",
    }
  })
  const onSubmit = async (values: zod.infer<typeof ProjectMemberSchema>) => {
    
  }

  return (
    <Form {...form}>
      <form id="submit-form" onSubmit={form.handleSubmit(onSubmit)} className='mt-5 flex flex-col'>
        {/* roleControl */}
        <FormField
          control={form.control}
          name="roleControl"
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
                      <SelectLabel>Role Control</SelectLabel>
                      <SelectItem value="Member">Member</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
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

export default FormAddProjectMember