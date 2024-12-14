import React from 'react'
import PageHeader from '@/app/components/dashboard/PageHeader'
import GroupForm from '@/app/components/dashboard/group/GroupForm'

const CreateGroup = () => {
    return (
        <section className='flex-1 w-full pb-10'>
            <PageHeader title='Create Group' description='Create and configuration your new group'/>
            <GroupForm/>
        </section>
    )
}

export default CreateGroup