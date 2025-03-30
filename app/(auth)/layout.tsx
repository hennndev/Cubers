import React from 'react'

type PropsTypes = {
  children: React.ReactNode
}

const AuthLayout = ({ children }: PropsTypes) => {
  return (
    <main className='min-h-screen'>
      {children}
    </main>
  )
}

export default AuthLayout