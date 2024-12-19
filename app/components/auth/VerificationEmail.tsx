"use client"
import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { FaCheck } from "react-icons/fa"
import { FaXmark } from "react-icons/fa6"
import { useRouter } from 'next/navigation'
import { Button } from '@/app/components/ui/button'
import { verifiedEmail } from '@/lib/actions/auth/verifiedEmail'
import useDecodedToken from '@/app/hooks/useDecodedToken'

type PropsTypes = {
    token: string
}

const VerificationEmail = ({token}: PropsTypes) => {
    const router = useRouter()
    const { dataDecoded } = useDecodedToken(token)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isVerified, setIsVerified] = useState<boolean | null>(false)
    const [verificationMessage, setVerificationMessage] = useState<null | string>(null)
    
    const verifyEmail = async () => {
        try {
            await verifiedEmail(token)
            // set state bahwa email sudah terverifikasi
            setIsVerified(true)
            // tampilkan success message verified
            setVerificationMessage("Your email has verified")
        } catch (error: any) {
            // tampilkan error message
            if(error.message === "Email already verified") {
                router.push("page-not-found")
            }
            setVerificationMessage(error.message || "Something went wrong")
            // tampilkan failed message verified
            setIsVerified(false)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        // otomatis terpanggil ketika redirect ke halaman ini
        if(!isVerified) {
            verifyEmail()
        }
    }, [dataDecoded, token, isVerified])
    
    if(isLoading) {
        return (
            <section className='flex-center flex-col space-y-5'>
                <p className='animate-pulse'>Loading...</p>
            </section>
        )
    }  

    return (
        <section className='flex-center flex-col space-y-5'>
            <section className={clsx('w-14 h-14 rounded-full flex-center text-center bg-green-100', isVerified === true ? 'bg-green-100' : 'bg-red-100')}>
                {isVerified === true ? (
                    <FaCheck className='text-3xl text-green-700'/>
                ) : (
                    <FaXmark className='text-3xl text-red-700'/>
                )}
            </section>

            <section className='flex-center text-center flex-col space-y-6 max-w-[600px]'>
                <h1 className='text-3xl font-bold text-gray-800'>
                    {verificationMessage}
                </h1>
                <p className='text-gray-600'>
                    {isVerified ? "Thankyou for your support, we have successfully verified your email address. You can now access and using our services and features. Have fun and exploring." : ""}
                    {verificationMessage === "Token invalid" ? "Token has invalid" : ""}
                    {verificationMessage === "Token has expired" ? "Token has expired. Please click below button for verified your email again." : ""}
                </p>
                <Button onClick={() => router.push(isVerified ? "/login" : `/verified-your-email?token=${token}`)}>
                    {verificationMessage === "Token has expired" ? "Verified your email" : "Login"}
                </Button>
            </section>
        </section>
    )
}

export default VerificationEmail