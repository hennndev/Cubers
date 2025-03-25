import React from 'react'
import Link from 'next/link'
import { Button } from '@/app/components/ui/button'

export const metadata = {
    title: "Page not found"
}
const NotFound = () => {
  return (
    <section className="min-h-screen flex-center flex-col -mt-20">
      <h2 className="dark:text-gray-300 text-gray-700 text-2xl font-bold mb-2">Page not found</h2>
      <p className="dark:text-gray-300 text-gray-700 font-medium mb-7">Oops, you visit at the wrong page.</p>
      <Link href="/dashboard">
        <Button type='button'>Back to home</Button>
      </Link>
    </section>
  )
}
export default NotFound