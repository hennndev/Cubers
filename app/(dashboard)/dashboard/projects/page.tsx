import React from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/config/authOptions'
import { getProjects } from '@/lib/actions/projects/getProjects'
// components
import { LuPlus } from 'react-icons/lu'
import { Button } from '@/app/components/ui/button'
import PageHeader from '@/app/components/shared/PageHeader'
import ProjectsTable from '@/app/components/dashboard/projects/ProjectsTable'
import ProjectsTableHeader from '@/app/components/dashboard/projects/ProjectsTableHeader'

export const metadata = {
  title: "Cubers | Projects",
  description: "Page for project list"
}

const Projects = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const session = await getServerSession(authOptions)
  const userId = session?.user.id
  const querySearch = (await searchParams).q || ""
  const projects = await getProjects(userId as string, querySearch as string)

  return (
    <section className='flex-1 pb-10'>
      <PageHeader title='Projects' description='View and manage your projects'>
        <Button asChild>
          <Link href="/dashboard/projects/create-project">
            <LuPlus /> Create project
          </Link>
        </Button>
      </PageHeader>
      <section className='flex flex-col space-y-6 px-10 h-screen'>
        <ProjectsTableHeader />
        <ProjectsTable data={projects.data?.projectsMember} />
      </section>
    </section>
  )
}

export default Projects