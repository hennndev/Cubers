import React from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/config/authOptions'
import { getProjects } from '@/lib/actions/projects/getProjects'
// components
import { LuPlus } from 'react-icons/lu'
import { Button } from '@/app/components/ui/button'
import PageHeader from '@/app/components/dashboard/PageHeader'
import ProjectsTable from '@/app/components/dashboard/projects/ProjectsTable'
import ProjectsTableHeader from '@/app/components/dashboard/projects/ProjectsTableHeader'

export const metadata = {
    title: "Cubers | Projects"
}

const Projects = async ({searchParams}: {searchParams: Promise<{[key: string]: string | string[] | undefined}>}) => {
    const session = await getServerSession(authOptions)
    // mengambil userId dari session login
    const userId = session?.user.id
    // mengambil query q sebagai keyword get projects
    const querySearch = (await searchParams).q || "" 
    const projects = await getProjects(userId as string, querySearch as string)

    return (
        <section className='flex-1 pb-10'>
            <PageHeader title='Projects' description='View and manage your projects'>       
                <Button asChild>
                    <Link href="/dashboard/projects/create-project">
                        <LuPlus/> Create project
                    </Link>
                </Button>
            </PageHeader>
            <section className='flex flex-col space-y-6 px-10 h-screen'>
                <ProjectsTableHeader/>
                <ProjectsTable data={projects.data?.projectsMember}/>
            </section>
        </section>
    )
}

export default Projects