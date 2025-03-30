import React from 'react'
import Sidebar from '@/app/components/project/Sidebar'
import { SidebarProvider } from '@/app/components/ui/sidebar'

type PropsTypes = {
  children: React.ReactNode
}

const ProjectLayout = ({ children }: PropsTypes) => {
  return (
    <SidebarProvider>
      <main className='flex w-full'>
        <Sidebar />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default ProjectLayout