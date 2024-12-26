import React from 'react'
import PageHeader from '@/app/components/dashboard/PageHeader'

export const metadata = {
    title: "Create group"
}

const CreateGroup = () => {
    return (
        <section className='flex-1 w-full pb-10'>
            <PageHeader title='Create Project' description='Create and configuration your new project'/>
        </section>
    )
}

export default CreateGroup