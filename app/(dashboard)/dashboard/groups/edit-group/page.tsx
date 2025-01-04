import React from 'react'
import { redirect } from 'next/navigation'
import PageHeader from '@/app/components/dashboard/PageHeader'
import GroupForm from '@/app/components/dashboard/groups/GroupForm'

export const metadata = {
    title: "Cubers | Edit group"
}

const EditGroup = async ({searchParams}: {searchParams: Promise<{[key: string]: string | string[] | undefined}>}) => {
    // mengambil query id
    const id = (await searchParams).id
    if(!id) {
        redirect("/dashboard/groups")
    }

    return (
        <section className='flex-1 w-full pb-10'>
            <PageHeader title='Edit Group' description='Edit with proper values in group fields'/>
            <GroupForm isEditPage groupId={+id as number}/>
        </section>
    )
}

export default EditGroup