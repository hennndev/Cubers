"use client"
import React from 'react'
import Link from 'next/link'
import { Button } from '@/app/components/ui/button'

const AlreadyLoggedIn = () => {
    return (
        <section className='flex-center flex-col space-y-5 text-center w-[500px]'>
            <h1 className='text-3xl font-bold tracking-tight text-back'>You already logged in</h1>
            <p className="dark:text-gray-300 text-gray-700 font-medium mb-7">You can back to dashboard page or you can logout and back to login page again.</p>
            <Button asChild>
                <Link href="/dashboard">Back to dashboard</Link>
            </Button>
        </section>
    )
}

export default AlreadyLoggedIn