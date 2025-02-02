"use client"
import React, { useState, useEffect } from 'react'
import * as zod from 'zod'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { LoginSchema } from '@/schemas/auth'
import { zodResolver } from "@hookform/resolvers/zod"
// components
import { LuLoader2 } from "react-icons/lu"
import { RiGoogleFill } from "react-icons/ri"
import { FiLock, FiUnlock } from "react-icons/fi"
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { LuAlertTriangle, LuX } from "react-icons/lu"
import { Checkbox } from '@/app/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/app/components/ui/form"

type PropsTypes = {
    emailRemember: string | undefined
}

const LoginForm = ({emailRemember}: PropsTypes) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<null | string>(null)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const form = useForm<zod.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false
        }
    })
    const onSubmit = async (values: zod.infer<typeof LoginSchema>) => {
        setIsLoading(true)
        setIsError(null)
        try {
            // console.log(typeof Boolean(values.rememberMe))
            const res = await signIn("credentials", {
                email: values.email,
                password: values.password,
                rememberMe: values.rememberMe,
                redirect: false
            })
            // Jika tidak ok/atau ada error makan akan di catch oleh error handler
            if(res && !res.ok) {
                throw res.error
            } 
            // jika tidak ada error akan dialihkan ke halaman dashbaord
            else {
                router.push("/dashboard")
            }
        } catch (error: any) {
            // Jika user belum verifikasi maka akan otomatis di alihkan ke halaman verified your email dengan tokennya
            if(error.includes("Email not verified")) {
                const parsingError = JSON.parse(error)
                router.push(`/verified-your-email?token=${parsingError.token}`)
            } else {
            // Selain itu, maka akan menampilkan error message di login form saja
                setIsError(error as string)
            }
        } finally {
            setIsLoading(false)
        }
    }

    // login by google
    const loginGoogle = async () => {
        await signIn("google", {
            callbackUrl: "/dashboard"
        })
    }

    useEffect(() => {
        if(emailRemember) {
            form.setValue("email", emailRemember)
            form.setValue("rememberMe", true)
        }
    }, [emailRemember])
    

    return (
        <section className='w-[400px]'>
            <h1 className='text-3xl font-bold tracking-tight text-back'>Login</h1>
            {isError && <section className='flexx relative mt-4 -mb-2 text-white font-normal bg-destructive rounded-lg p-3'>
                <LuAlertTriangle className='text-lg mr-2'/>
                {isError}
                <LuX className='absolute top-2 right-2 text-lg cursor-pointer' onClick={() => setIsError(null)}/>
            </section>}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='mt-5 flex flex-col'>
                    <FormField 
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem className='flex flex-col space-y-1.5 mb-3'>
                                <label htmlFor="email" className='text-base'>
                                    Email <span className='text-destructive'>*</span>
                                </label>
                                <FormControl>
                                    <Input type='email' id='email' placeholder='Input your email'{...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                    )}/>
                    <FormField 
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem className='flex flex-col space-y-1.5 mb-3'>
                                <label htmlFor="password" className='text-base'>
                                    Password <span className='text-destructive'>*</span>
                                </label>
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
                    <div className="flex items-center space-x-2 mb-3">
                        <FormField
                            control={form.control}
                            name="rememberMe"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Checkbox
                                            id='rememberMe'
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <label htmlFor="rememberMe" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Remember Me
                        </label>
                    </div>
                    <Button type='submit' disabled={isLoading ? true: false}>
                        {isLoading && <LuLoader2 className="animate-spin" />}
                        {isLoading ? 'Waiting' : 'Submit'}
                    </Button>
                    <div className='mt-3'>
                        <p className='text-sm text-center'>
                            Don't have an account? Freely to <Link href='/signup' className='text-sm underline'>Signup</Link>
                        </p>
                    </div>
                    <section className='mt-5 '>
                        <Button type='button' className='w-full' variant='outline' onClick={loginGoogle}>
                            <RiGoogleFill/> Login with Google
                        </Button>
                    </section>
                </form>
            </Form>
        </section>
    )
}

export default LoginForm