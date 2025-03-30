import React from 'react'
import { Metadata } from 'next'
// components
import PageHeader from '@/app/components/shared/PageHeader'
import { getProject } from '@/lib/actions/projects/getProject'

type Props = {
  params: { projectId: string };
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const data = await getProject(+params.projectId)
  return {
    title: `Project ${data.data?.name} - Dashboard`,
    description: `Project with name ${data.data?.name}`
  }
}

const Project = () => {
  return (
    <section className='flex-1 pb-10'>
      <PageHeader title='Project' description='View and manage project'>
      </PageHeader>
    </section>
  )
}

export default Project