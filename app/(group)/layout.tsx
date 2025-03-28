import React from 'react'
import Sidebar from '@/app/components/group/Sidebar'
import { SidebarProvider } from '@/app/components/ui/sidebar'

type PropsTypes = {
  children: React.ReactNode
}

const GroupLayout = ({ children }: PropsTypes) => {
  return (
    <SidebarProvider>
      <main className='flex w-full'>
        <Sidebar />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default GroupLayout