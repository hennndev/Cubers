import React from 'react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/config/authOptions'
import SignupForm from '@/app/components/auth/SignupForm'
import FormSignup from '@/app/components/forms/FormSignup'

export const metadata = {
  title: "Cubers | Signup"
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