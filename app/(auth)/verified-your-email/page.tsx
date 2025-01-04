import React from 'react'
import { redirect } from 'next/navigation'
import VerifiedYourEmail from '@/app/components/auth/VerifiedYourEmail'

export const metadata = {
    title: "Cubers | Verified Your Email"
}

const EmailVerification = async ({searchParams}: {searchParams: Promise<{[key: string]: string | string[] | undefined}>}) => {
    const token = (await searchParams).token
    // Jika tidak ada query token maka akan otomatis redirect ke page not found
    if(!token) {
        redirect("/page-not-found")
    }
    return (
        <section className='flex-center min-h-screen'>
            <VerifiedYourEmail token={token as string}/>
        </section>
    )
}

export default EmailVerification