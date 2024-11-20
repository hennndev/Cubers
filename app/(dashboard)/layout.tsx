import React from 'react'
import Sidebar from '@/app/components/dashboard/Sidebar'
import { SidebarProvider } from '@/app/components/ui/sidebar'

type PropsTypes = {
    children: React.ReactNode
}

const DashboardLayout = ({children}: PropsTypes) => {
    return (
        <SidebarProvider>
            <main className='flex w-full min-h-screen'>
                <Sidebar/>
                {children}
            </main>
        </SidebarProvider>
    )
}

export default DashboardLayout