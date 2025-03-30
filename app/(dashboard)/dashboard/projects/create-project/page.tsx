import React from 'react'
// components
import PageHeader from '@/app/components/shared/PageHeader'
import ProjectForm from '@/app/components/dashboard/forms/ProjectForm'

export const metadata = {
  title: "Cubers | Create project",
  description: "Page for create new project"
}

const CreateProject = () => {
  return (
    <section className='flex-1 w-full pb-10'>
      <PageHeader title='Create Project' description='Create and configuration your new project' />
      <ProjectForm />
    </section>
  )
}

export default CreateProject