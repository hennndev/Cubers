import React from 'react'
import Link from 'next/link'
import { LuPlus } from 'react-icons/lu'
import { Button } from '@/app/components/ui/button'
import GroupTable from '@/app/components/dashboard/group/GroupTable'
import GroupTableHeader from '@/app/components/dashboard/group/GroupTableHeader'
import PageHeader from '@/app/components/dashboard/PageHeader'

export const metadata = {
    title: "Groups"
}

const Group = () => {
    return (
        <section className='flex-1 pb-10'>
            <PageHeader title='Groups' description='View and manage group'>
                <Button asChild>
                    <Link href="/dashboard/groups/create-group">
                        <LuPlus/> Create group
                    </Link>
                </Button>
            </PageHeader>
            <section className='flex flex-col space-y-6 px-10 h-screen'>
                <GroupTableHeader/>
                <GroupTable/>
            </section>
        </section>
    )
}

export default Group