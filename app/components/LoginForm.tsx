"use client"
import React, { useState } from 'react'
import * as zod from 'zod'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { LuLoader2 } from "react-icons/lu"
import { useRouter } from 'next/navigation'
import { LoginSchema } from '@/schemas/auth'
import { RiGoogleFill } from "react-icons/ri"
import { FiLock, FiUnlock } from "react-icons/fi"
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { Checkbox } from '@/app/components/ui/checkbox'
import { LuAlertTriangle, LuX } from "react-icons/lu"


const LoginForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isError, setIsError] = useState<null | string>(null)
    const { register, formState: {errors}, handleSubmit } = useForm<zod.infer<typeof LoginSchema>>({
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const onSubmit = async (values: zod.infer<typeof LoginSchema>) => {
        setIsLoading(true)
        setIsError(null)
        try {
            const res = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false
            })
            if(res && !res.ok) {
                throw res.error
            } else {
                router.push("/group")
            }
        } catch (error: any) {
            setIsError(error as string)
        } finally {
            setIsLoading(false)
        }
    }

    const loginGoogle = async () => {
        await signIn("google", {
            callbackUrl: "/group"
        })
    }

    return (
        <section className='w-[400px]'>
            <h1 className='text-3xl font-bold tracking-tight text-back'>Login</h1>
            {isError && <section className='flexx relative mt-4 -mb-2 text-white font-normal bg-destructive rounded-lg p-3'>
                <LuAlertTriangle className='text-lg mr-2'/>
                {isError}
                <LuX className='absolute top-2 right-2 text-lg cursor-pointer' onClick={() => setIsError(null)}/>
            </section>}
            <form onSubmit={handleSubmit(onSubmit)} className='mt-5 flex flex-col'>
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
                        type='text' 
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
                <div className="flex items-center space-x-2 mb-3">
                    <Checkbox id="terms" />
                    <label htmlFor="terms" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Remember Me
                    </label>
                </div>
                <Button type='submit' disabled={isLoading ? true: false}>
                    {isLoading && <LuLoader2 className="animate-spin" />}
                    {isLoading ? 'Waiting' : 'Submit'}
                </Button>
                <div className='mt-3'>
                    <p className='text-sm'>
                        Don't have an account? <Link href='/signup' className='text-sm underline'>Signup</Link>
                    </p>
                </div>
                <section className='mt-5 '>
                    <Button type='button' className='w-full' variant='outline' onClick={loginGoogle}>
                        <RiGoogleFill/> Login with Google
                    </Button>
                </section>
            </form>
        </section>
    )
}

export default LoginForm