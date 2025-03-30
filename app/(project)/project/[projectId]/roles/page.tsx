import React from 'react'
import { Metadata } from 'next'
import { getProject } from '@/lib/actions/projects/getProject'
// components
import { LuPlus } from 'react-icons/lu'
import { Button } from '@/app/components/ui/button'
import PageHeader from '@/app/components/shared/PageHeader'

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
    </section>
  )
}

export default ProjectRoles