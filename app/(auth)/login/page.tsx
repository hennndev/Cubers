import React from 'react'
import { cookies } from 'next/headers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/config/authOptions'
// components
import FormLogin from '@/app/components/auth/forms/FormLogin'
import AlreadyLoggedIn from '@/app/components/auth/AlreadyLoggedIn'

export const metadata = {
  title: "Cubers | Login",
  description: "Page for user to login"
}

const Login = async () => {
  const session = await getServerSession(authOptions)
  const cookieStore = await cookies()
  const cookie = cookieStore.get("rememberMe")
  const emailRemember = cookie?.value 
  return (
    <section className='flex-center min-h-screen'>
      {session?.user ? (
        <AlreadyLoggedIn />
      ) : (
        <FormLogin emailRemember={emailRemember} />
      )}
    </section>
  )
}

export default Login