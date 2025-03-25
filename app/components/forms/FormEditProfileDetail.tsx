import React from 'react'
import * as zod from "zod"
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { UserDataDetailTypes } from '@/types/next-env'
import { ProfilePersonalInformationsSchema } from '@/schemas/profile'
import { editProfilePersonalInformation } from '@/lib/actions/users/editProfilePersonalInformation'
// components
import { Input } from "@/app/components/ui/input"
import { Textarea } from '@/app/components/ui/textarea'
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/app/components/ui/form"

type PropsTypes = {
  data: UserDataDetailTypes,
  setIsLoading: (value: boolean) => void
  closeModal: () => void
}

const FormEditProfileDetail = ({data, setIsLoading, closeModal}: PropsTypes) => {
  const form = useForm<zod.infer<typeof ProfilePersonalInformationsSchema>>({
    defaultValues: {
      bio: data.bio || '',
      country: data.country || '',
      city: data.city || '',
      address: data.address || '',
      whatsappNumber: data.whatsappNumber || ''
    }
  })

  const onSubmit =  async (values: zod.infer<typeof ProfilePersonalInformationsSchema>) => {
    if(data.bio === values.bio && data.country === values.country && data.city === values.city && data.address === values.address && data.whatsappNumber === values.whatsappNumber) {
      toast.warning("Profile detail personal information user has no changed")
      return
    }
    setIsLoading(true)
    try {
      await editProfilePersonalInformation(data.username, values)
      toast.success("Profil detail personal information user has updated")
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
        {/* country */}
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className='flex flex-col space-y-1.5 mb-3'>
              <label htmlFor="country" className='text-sm'>
                Country
              </label>
              <FormControl>
                <Input type='text' id='country' placeholder='Input your country' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        {/* city */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className='flex flex-col space-y-1.5 mb-3'>
              <label htmlFor="city" className='text-sm'>
                City
              </label>
              <FormControl>
                <Input type='text' id='city' placeholder='Input your city' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        {/* whatsapp number */}
        <FormField
          control={form.control}
          name="whatsappNumber"
          render={({ field }) => (
            <FormItem className='flex flex-col space-y-1.5 mb-3'>
              <label htmlFor="whatsappNumber" className='text-sm'>
                Whatsapp Number
              </label>
              <FormControl>
                <Input 
                  type='number' 
                  id='whatsappNumber' 
                  placeholder='Input your whatsapp number' 
                  {...field} 
                  onChange={(e) => {
                    field.onChange(e.target.value.toString())
                  }}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        {/* bio */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className='flex flex-col space-y-1.5 mb-3'>
              <label htmlFor="bio" className='text-sm'>
                Bio
              </label>
              <FormControl>
                <Input type='text' id='bio' placeholder='Input your bio' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        {/* address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className='flex flex-col space-y-1.5 mb-3'>
              <label htmlFor="address" className='text-sm'>
                Address
              </label>
              <FormControl>
                <Textarea id='address' placeholder='Input your address' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
      </form>
    </Form>
  )
}

export default FormEditProfileDetail