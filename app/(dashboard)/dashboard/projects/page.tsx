import React from 'react'
import Link from 'next/link'
import { LuPlus } from 'react-icons/lu'
import { Button } from '@/app/components/ui/button'
import PageHeader from '@/app/components/dashboard/PageHeader'
import ProjectsTable from '@/app/components/dashboard/projects/ProjectsTable'
import ProjectsTableHeader from '@/app/components/dashboard/projects/ProjectsTableHeader'

export const metadata = {
    title: "Cubers | Projects"
}

const Projects = () => {
    return (
        <section className='flex-1 pb-10'>
            <PageHeader title='Projects' description='View and manage your projects'>       
                <Button asChild>
                    <Link href="/projects/create-project">
                        <LuPlus/> Create project
                    </Link>
                </Button>
            </PageHeader>
            <section className='flex flex-col space-y-6 px-10 h-screen'>
                <ProjectsTableHeader/>
                <ProjectsTable/>
            </section>
        </section>
    )
}

export default Projects