import React from 'react'
import { cookies } from 'next/headers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/config/authOptions'
// components
import LoginForm from '@/app/components/auth/LoginForm'
import AlreadyLoggedIn from '@/app/components/auth/AlreadyLoggedIn'

export const metadata = {
    title: "Cubers | Login"
}

const Login = async () => {
    // mengambil session untuk mengetahui status user dan data user
    const session = await getServerSession(authOptions)
    const cookieStore = await cookies()
    const cookie = cookieStore.get("rememberMe")
    const emailRemember = cookie?.value
    return (
        <section className='flex-center min-h-screen'>
            {/* kondisi jika user ada, maka akan menampilkan message bahwa user sudah login, jika tidak akan menampilkan login form */}
            {session?.user ? (
                <AlreadyLoggedIn/>
            ) : (
                <LoginForm emailRemember={emailRemember}/>
            )}
        </section>
    )
}

export default Login