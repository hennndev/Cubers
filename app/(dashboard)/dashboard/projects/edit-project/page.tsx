import React from 'react'
import { redirect } from 'next/navigation'
import { getProject } from '@/lib/actions/projects/getProject'
// components
import PageHeader from '@/app/components/shared/PageHeader'
import ProjectForm from '@/app/components/dashboard/forms/ProjectForm'

export const metadata = {
  title: "Cubers | Edit project",
  description: "Page for edit project"
}

const EditProject = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  // mengambil query id
  const id = (await searchParams).id
  if (!id) {
    redirect("/dashboard/projects")
  }
  const project = await getProject(+id)
  if(!project.data) {
    redirect("/dashboard/projects")
  }

  return (
    <section className='flex-1 w-full pb-10'>
      <PageHeader title='Edit Project' description='Edit with proper values in project fields' />
      <ProjectForm isEditPage projectId={+id as number} />
    </section>
  )
}

export default EditProject