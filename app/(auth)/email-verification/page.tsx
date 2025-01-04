import React from 'react'
import { redirect } from 'next/navigation'
import VerificationEmail from '@/app/components/auth/VerificationEmail'

export const metadata = {
    title: "Cubers | Email Verification"
}

const EmailVerification = async ({searchParams}: {searchParams: Promise<{[key: string]: string | string[] | undefined}>}) => {
    const token = (await searchParams).token
    if(!token) {
        // Jika tidak ada query token maka akan redirect otomatis ke halaman login
        redirect("/login")
    }
    return (
        <section className='flex-center min-h-screen'>
            <VerificationEmail token={token as string}/>
        </section>
    )
}

export default EmailVerification