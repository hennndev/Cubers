"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from "lucide-react"
import { useForm } from 'react-hook-form'
import { FiLock, FiUnlock } from "react-icons/fi"
import { RiGoogleFill } from 'react-icons/ri'

type FormTypes = {
    name: string
    email: string
    password: string
}

const SignupForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const { register, formState: {errors}, handleSubmit } = useForm<FormTypes>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })
    const onSubmit = async (values: FormTypes) => {
        setIsLoading(true)
    }

    return (
        <section className='w-[400px] pt-10 pb-10'>
            <h1 className='text-3xl font-bold tracking-tight text-back'>Signup</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-5 flex flex-col'>
                <section className='flex flex-col space-y-1.5 mb-3'>
                    <label htmlFor="name" className='text-base'>Name</label>
                    <Input 
                        {...register('name', {
                            required: 'This field is required',
                        })}
                        type='text' 
                        placeholder='Input your name'/>
                    {errors.name && (
                        <small className='text-destructive text-sm !mt-2'>{errors.name.message}</small>
                    )}
                </section>
                <section className='flex flex-col space-y-1.5 mb-3'>
                    <label htmlFor="email" className='text-base'>Email</label>
                    <Input 
                        {...register('email', {
                            required: 'This field is required',
                            pattern: {
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                message: 'Email not valid'
                            }
                        })}
                        type='email' 
                        placeholder='Input your email'/>
                    {errors.email && (
                        <small className='text-destructive text-sm !mt-2'>{errors.email.message}</small>
                    )}
                </section>
                <section className='flex flex-col space-y-1.5 mb-5'>
                    <label htmlFor="password" className='text-base'>Password</label>
                    <div className='flexx space-x-3'>
                        <Input 
                            {...register('password', {
                                required: 'This field is required',
                                minLength: {
                                    value: 6,
                                    message: 'Minimum password length is 6 characters'
                                }
                            })}
                            type={showPassword ? 'text' : 'password'} 
                            placeholder='Input your password'/>
                        <div className='rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors md:text-sm h-9 flex-center cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                            {!showPassword ? <FiLock className='text-base'/> : <FiUnlock className='text-base'/>}
                        </div>
                    </div>
                    {errors.password && (
                        <small className='text-destructive text-sm !mt-2'>{errors.password.message}</small>
                    )}
                </section>
                <section className='flex flex-col space-y-1.5 mb-5'>
                    <label htmlFor="password" className='text-base'>Password Confirm</label>
                    <div className='flexx space-x-3'>
                        <Input 
                            {...register('password', {
                                required: 'This field is required',
                                minLength: {
                                    value: 6,
                                    message: 'Minimum password length is 6 characters'
                                }
                            })}
                            type={showPassword ? 'text' : 'password'} 
                            placeholder='Input your password'/>
                        <div className='rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors md:text-sm h-9 flex-center cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                            {!showPassword ? <FiLock className='text-base'/> : <FiUnlock className='text-base'/>}
                        </div>
                    </div>
                    {errors.password && (
                        <small className='text-destructive text-sm !mt-2'>{errors.password.message}</small>
                    )}
                </section>
                <Button type='submit' disabled={isLoading ? true: false}>
                    {isLoading && <Loader2 className="animate-spin" />}
                    {isLoading ? 'Waiting' : 'Submit'}
                </Button>
            </form>
            <div className='mt-3'>
                <p className='text-sm'>
                    Already have an account? <Link href='/auth/login' className='text-sm underline'>Login</Link>
                </p>
            </div>
            <section className='mt-5 '>
                <Button type='button' className='w-full' variant='outline'>
                    <RiGoogleFill/> Login with Google
                </Button>
            </section>
        </section>
    )
}

export default SignupForm