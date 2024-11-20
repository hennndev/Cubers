"use client"
import React from 'react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/app/components/ui/select"
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'

type FormTypes = {
    name: string
    description: string
    level: string
}

const GroupForm = () => {

    const { register, formState: {errors} } = useForm<FormTypes>({
        defaultValues: {
            name: "",
            description: "",
            level: "common"
        }
    })
    
    return (
        <section className=''>
            <form>
                <section className='flex flex-col space-y-1.5 mb-5'>
                    <label htmlFor="name" className='text-base'>Name</label>
                    <Input 
                        {...register('name', {
                            required: 'This field is required',
                        })}
                        type='text' 
                        placeholder='Input group name'/>
                    {errors.name && (
                        <small className='text-destructive text-sm !mt-2'>{errors.name.message}</small>
                    )}
                </section>
                <section className='flex flex-col space-y-1.5 mb-5'>
                    <label htmlFor="name" className='text-base'>Level</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a group level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Level</SelectLabel>
                                <SelectItem value="common">Common</SelectItem>
                                <SelectItem value="middle">Middle</SelectItem>
                                <SelectItem value="priority">Priority</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </section>
                <section className='flex flex-col space-y-1.5 mb-5'>
                    <label htmlFor="name" className='text-base'>Description</label>
                    <Textarea 
                        {...register('name', {
                            required: 'This field is required',
                        })} 
                        rows={7}
                        placeholder='Input group description'/>
                    {errors.name && (
                        <small className='text-destructive text-sm !mt-2'>{errors.name.message}</small>
                    )}
                </section>
                <section className='flex flex-col space-y-1.5 mb-5'>
                    <label htmlFor="name" className='text-base'>Find and invite member</label>
                    <Input 
                        {...register('name', {
                            required: 'This field is required',
                        })}
                        type='text' 
                        placeholder='Input group name'/>
                    {errors.name && (
                        <small className='text-destructive text-sm !mt-2'>{errors.name.message}</small>
                    )}
                </section>
                <section className='flex flex-col space-y-1.5 mb-5'>
                    <label htmlFor="name" className='text-base'>Tags</label>
                    <Input 
                        {...register('name', {
                            required: 'This field is required',
                        })}
                        type='text' 
                        placeholder='Input group name'/>
                    {errors.name && (
                        <small className='text-destructive text-sm !mt-2'>{errors.name.message}</small>
                    )}
                </section>
                <Button>Submit new group</Button>
            </form>
        </section>
    )
}

export default GroupForm