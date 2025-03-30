import React from 'react'
import { Metadata } from 'next'
import { getProject } from '@/lib/actions/projects/getProject'
// components
import { LuPlus } from 'react-icons/lu'
import { Button } from '@/app/components/ui/button'
import PageHeader from '@/app/components/shared/PageHeader'
import MembersTable from '@/app/components/project/members/MembersTable'
import MembersTableHeader from '@/app/components/project/members/MembersTableHeader'
import AddButtonModal from '@/app/components/project/members/AddButtonModal'

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
        <AddButtonModal/>
      </PageHeader>
      <section className='flex flex-col space-y-6 px-10 h-screen'>
        <MembersTableHeader/>
        <MembersTable/>
      </section>
    </section>
  )
}

export default ProjectMembers