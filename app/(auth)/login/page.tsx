import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/config/authOptions'
import LoginForm from '@/app/components/auth/LoginForm'
import AlreadyLoggedIn from '@/app/components/auth/AlreadyLoggedIn'


export const metadata = {
    title: "Login"
}

const Login = async () => {
    const session = await getServerSession(authOptions)
    return (
        <section className='flex-center min-h-screen'>
            {session?.user ? (
                <AlreadyLoggedIn/>
            ) : (
                <LoginForm/>
            )}
        </section>
    )
}

export default Login