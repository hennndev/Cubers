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
    title: `Project ${data.data?.name} - Members`,
    description: `Project with name ${data.data?.name}`
  }
}

const ProjectMembers = () => {
  return (
    <section className='flex-1 pb-10'>
      <PageHeader title='Project Members' description='View and manage project members'>
        <Button>
          <LuPlus /> Add Member
        </Button>
      </PageHeader>
    </section>
  )
}

export default ProjectMembers