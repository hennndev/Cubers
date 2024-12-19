"use client"
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import Countdown from "react-countdown"
import { IoMdMail } from "react-icons/io"
import { LuLoader2 } from 'react-icons/lu'
import { useRouter } from 'next/navigation'
import { Button } from '@/app/components/ui/button'
import useDecodedToken from '../../hooks/useDecodedToken'
import { receiveEmailVerification } from '@/lib/actions/emails/emailAction'
import { checkEmailIsVerified } from '@/lib/actions/auth/checkEmailIsVerified'
import { count } from 'node:console'
import ResendTimer from './ResendTimer'

type PropsTypes = {
    token: string
}

const VerifiedYourEmail = ({token}: PropsTypes) => {
    const router = useRouter()
    const { dataDecoded } = useDecodedToken(token)
    const [isClickResend, setIsClickResend] = useState<boolean>(JSON.parse(localStorage.getItem("isClickResend") as string) || false)
    const [countdownReclickResend, setCountdownReclickResend] = useState<number>(+JSON.parse(localStorage.getItem("countdown") as string) || 0)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [resendLoading, setResendLoading] = useState<boolean>(false)

    const handleResend = async () => {
        setResendLoading(true)
        await receiveEmailVerification(dataDecoded?.email as string)
        toast("New email verification has sended. Please check your email", {
            description: "Please check your email",
            duration: 10000
        })
        setResendLoading(false)
        setIsClickResend(true)
        localStorage.setItem("isClickResend", JSON.stringify(true))
        setCountdownReclickResend(Date.now() + 60000)
        localStorage.setItem("countdown", JSON.stringify(Date.now() + 60000))
    }

    const checkEmail = async () => {
        try {
            const res = await checkEmailIsVerified(dataDecoded?.email as string)
            if(res) {
                router.push("/page-not-found")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(dataDecoded) {
            checkEmail()
        }
    }, [token, dataDecoded])

    if(isLoading) {
        return (
            <section className='flex-center flex-col space-y-5'>
                <p className='animate-pulse'>Loading...</p>
            </section>
        )
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
                {isClickResend && <ResendTimer countdownReclickResend={countdownReclickResend} setIsClickResend={setIsClickResend}/>}
                <Button disabled={resendLoading || isClickResend} onClick={handleResend}>
                    {resendLoading && <LuLoader2 className="animate-spin" />}
                    {resendLoading ? 'Waiting' : isClickResend ? 'Wait the countdown' : 'Resend verification email'}
                </Button>
            </section>
        </section>
    )
}

export default VerifiedYourEmail