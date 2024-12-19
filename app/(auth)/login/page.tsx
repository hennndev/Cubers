import LoginForm from '@/app/components/auth/LoginForm'
import React from 'react'


export const metadata = {
    title: "Login"
}

const Login = () => {
    return (
        <section className='flex-center min-h-screen'>
            <LoginForm/>
        </section>
    )
}

export default Login