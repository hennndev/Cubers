"use client"
import React, { useState } from 'react'
import { toast } from 'sonner'
import { IoMdMail } from "react-icons/io"
import { LuLoader2 } from 'react-icons/lu'
import { Button } from '@/app/components/ui/button'
import useDecodedToken from '../../hooks/useDecodedToken'
import { receiveEmailVerification } from '@/lib/actions/emails/emailAction'

type PropsTypes = {
    token: string
}

const VerifiedYourEmail = ({token}: PropsTypes) => {
    const { dataDecoded } = useDecodedToken(token)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleResend = async () => {
        setIsLoading(true)
        try {
            await receiveEmailVerification(dataDecoded?.email as string)
            toast("New email verification has sended. Please check your email", {
                description: "Please check your email",
                duration: 10000
            })
        } catch (error) {
        } finally {
            setIsLoading(false)
        }
    }
    

    return (
        <section className='flex-center flex-col space-y-5'>
            <section className='w-14 h-14 rounded-full flex-center text-center bg-green-100'>
                <IoMdMail className='text-3xl text-green-700'/>
            </section>

            <section className='flex-center text-center flex-col space-y-6 max-w-[600px]'>
                <h1 className='text-3xl font-bold text-gray-800'>Please verifiy your email</h1>
                <section className='space-y-2'>
                    <p>You're almost there! We sent an email to</p>
                    <p className='font-bold text-gray-700 text-lg'>{dataDecoded?.email}</p>
                </section>
                <p>Just click on the link in that email to complete your account. If you don't see it, you may need to <span className='font-bold text-gray-700'>check your spam</span> folder</p>
                <p>Still can't find that link in the email? No problem.</p>
                <Button onClick={handleResend}>
                    {isLoading && <LuLoader2 className="animate-spin" />}
                    {isLoading ? 'Waiting' : 'Resend verification email'}
                </Button>
            </section>
        </section>
    )
}

export default VerifiedYourEmail