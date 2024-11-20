import GroupForm from '@/app/components/dashboard/GroupForm'
import React from 'react'
import { LuArrowLeft } from 'react-icons/lu'

const CreateGroup = () => {
    return (
        <section className='flex-1 w-full p-10'>
            <h1 className='text-2xl font-bold tracking-tight mb-5'>Create group</h1>
            <GroupForm/>
        </section>
    )
}

export default CreateGroup