import React from 'react'
import { Metadata } from 'next'
import { getProject } from '@/lib/actions/projects/getProject'
// components
import { LuPlus } from 'react-icons/lu'
import { Button } from '@/app/components/ui/button'
import PageHeader from '@/app/components/shared/PageHeader'
import RolesTable from '@/app/components/project/roles/RolesTable'
import RolesTableHeader from '@/app/components/project/roles/RolesTableHeader'

type Props = {
  params: { projectId: string };
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const data = await getProject(+params.projectId)
  return {
    title: `Project ${data.data?.name} - Roles`,
    description: `Project with name ${data.data?.name}`
  }
}

const ProjectRoles = () => {
  return (
    <section className='flex-1 pb-10'>
      <PageHeader title='Project Roles' description='View and manage project roles'>
        <Button>
          <LuPlus /> Add Role
        </Button>
      </PageHeader>
      <section className='flex flex-col space-y-6 px-10 h-screen'>
        <RolesTableHeader/>
        <RolesTable/>
      </section>
    </section>
  )
}

export default ProjectRoles