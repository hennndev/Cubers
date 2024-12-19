import React from 'react'
import { getServerSession } from 'next-auth'
import LoginForm from '@/app/components/auth/LoginForm'
import { authOptions } from '@/lib/config/authOptions'


export const metadata = {
    title: "Login"
}

const Login = async () => {
    const session = await getServerSession(authOptions)
    console.log(session)
    return (
        <section className='flex-center min-h-screen'>
            <LoginForm/>
        </section>
    )
}

export default Login