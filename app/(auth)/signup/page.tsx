import React from 'react'
import SignupForm from '@/app/components/auth/SignupForm'

export const metadata = {
    title: "Cubers | Signup"
}

const Signup = () => {
    return (
        <section className='flex-center min-h-screen'>
            <SignupForm/>
        </section>
    )
}

export default Signup