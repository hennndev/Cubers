"use client"
import React, { useState } from 'react'
import * as zod from "zod"
import { toast } from 'sonner'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { RiGoogleFill } from 'react-icons/ri'
import { SignupSchema } from '@/schemas/auth'
import { FiLock, FiUnlock } from "react-icons/fi"
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { signup } from '@/lib/actions/auth/signup'
import { zodResolver } from '@hookform/resolvers/zod'
import { LuAlertTriangle, LuX, LuLoader2, LuCheck } from 'react-icons/lu'
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/app/components/ui/form"

const SignupForm = () => {
    const [isError, setIsError] = useState<null | string>(null)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false)
    const form = useForm<zod.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            name: '',
            username: '',
            email: '',
            password: '',
            passwordConfirm: ''
        }
    })
    const onSubmit = async (values: zod.infer<typeof SignupSchema>) => {
        setIsLoading(true)
        setIsSuccess(false)
        setIsError(null)
        try {
            const res = await signup(values)
            // Jika error, maka throw atau tampilkan errornya
            if(res && res.error) {
                throw res.error
            }
            // Jika success, set value jadi true, dan akan menampilkan alert success message
            setIsSuccess(true)
            toast("New user has created", {
                description: "Please verified your email now",
            })
        } catch (error: any) {
            setIsError(error as string)
        } finally {
            setIsLoading(false)
        }
    }

    const loginGoogle = async () => {
        await signIn("google", {
            callbackUrl: "/dashboard"
        })
    }

    return (
        <section className='w-[550px] pt-10 pb-10'>
            <h1 className='text-3xl font-bold tracking-tight text-back'>Signup</h1>
            {isError && <section className='flexx relative mt-4 -mb-2 text-white font-normal bg-destructive rounded-lg p-3'>
                <LuAlertTriangle className='text-xl mr-2'/>
                {isError}
                <LuX className='absolute top-2 right-2 text-lg cursor-pointer' onClick={() => setIsError(null)}/>
            </section>}
            {isSuccess && <section className='flex relative mt-4 -mb-2 text-white font-normal bg-green-600 rounded-lg p-3'>
                <LuCheck className='text-2xl mr-2'/>
                <p className='mr-5'>Success create new account. Check your email and verified your email now.</p>
                <LuX className='absolute top-2 right-2 text-lg cursor-pointer' onClick={() => setIsSuccess(false)}/>
            </section>}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='mt-5 flex flex-col'>
                    <section className='flexx space-x-3'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem className='flex flex-col space-y-1.5 mb-3 flex-1'>
                                    <label htmlFor="name" className='text-base'>Name <span className='text-destructive'>*</span></label>
                                    <Input type='text' id='name' placeholder='Input your name'{...field}/>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem className='flex flex-col space-y-1.5 mb-3 flex-1'>
                                    <label htmlFor="username" className='text-base'>Username <span className='text-destructive'>*</span></label>
                                    <FormControl>
                                        <Input type='text' id='username' placeholder='Input your name' {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                    </section>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem className='flex flex-col space-y-1.5 mb-3 flex-1'>
                                <label htmlFor="email" className='text-base'>Email <span className='text-destructive'>*</span></label>
                                <FormControl>
                                    <Input type='email' id='email' placeholder='Input your name' {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem className='flex flex-col space-y-1.5 mb-3 flex-1'>
                                <label htmlFor="password" className='text-base'>Password <span className='text-destructive'>*</span></label>
                                <section className='flexx space-x-3'>
                                    <FormControl>
                                        <Input type={showPassword ? "text" : "password"} id='password' placeholder='Input your password' {...field}/>
                                    </FormControl>
                                    <div className='rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors md:text-sm h-9 flex-center cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                        {!showPassword ? <FiLock className='text-base'/> : <FiUnlock className='text-base'/>}
                                    </div>
                                </section>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    <FormField
                        control={form.control}
                        name="passwordConfirm"
                        render={({field}) => (
                            <FormItem className='flex flex-col space-y-1.5 mb-3 flex-1'>
                                <label htmlFor="passwordConfirm" className='text-base'>Password Confirm <span className='text-destructive'>*</span></label>
                                <section className='flexx space-x-3'>
                                    <FormControl>
                                        <Input type={showPasswordConfirm ? "text" : "password"} id='passwordConfirm' placeholder='Input your password confirm' {...field}/>
                                    </FormControl>
                                    <div className='rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors md:text-sm h-9 flex-center cursor-pointer' onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}>
                                        {!showPasswordConfirm ? <FiLock className='text-base'/> : <FiUnlock className='text-base'/>}
                                    </div>
                                </section>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    <Button type='submit' disabled={isLoading ? true: false}>
                        {isLoading && <LuLoader2 className="animate-spin" />}
                        {isLoading ? 'Waiting' : 'Submit'}
                    </Button>
                </form>
            </Form>
            <div className='mt-3'>
                <p className='text-sm'>
                    Already have an account? <Link href='/login' className='text-sm underline'>Login</Link>
                </p>
            </div>
            <section className='mt-5 '>
                <Button type='button' className='w-full' variant='outline' onClick={loginGoogle}>
                    <RiGoogleFill/> Login with Google
                </Button>
            </section>
        </section>
    )
}

export default SignupForm