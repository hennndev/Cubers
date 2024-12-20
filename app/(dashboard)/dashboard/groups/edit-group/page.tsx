import GroupForm from '@/app/components/dashboard/group/GroupForm'
import React from 'react'
import { LuArrowLeft } from 'react-icons/lu'

export const metadata = {
    title: "Edit group"
}

const CreateGroup = () => {
    return (
        <section className='flex-1 w-full py-6 px-10'>
            <h1 className='text-2xl font-bold tracking-tight mb-5'>Create group</h1>
            <GroupForm/>
        </section>
    )
}

export default CreateGroup