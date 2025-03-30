import React from 'react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/config/authOptions'
// components
import FormSignup from '@/app/components/auth/forms/FormSignup'

export const metadata = {
  title: "Cubers | Signup",
  description: "Page for user to signup new user"
}

const Signup = async () => {
  const session = await getServerSession(authOptions)
  if(session?.user) {
    redirect("/dashboard")
  }
  return (
    <section className='flex-center min-h-screen'>
      <FormSignup />
    </section>
  )
}

export default Signup