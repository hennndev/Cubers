import React from 'react'
import Link from 'next/link'
import { LuPlus } from 'react-icons/lu'
import { getServerSession } from 'next-auth'
import { Button } from '@/app/components/ui/button'
import { authOptions } from '@/lib/config/authOptions'
import GroupTable from '@/app/components/dashboard/groups/GroupTable'
import GroupTableHeader from '@/app/components/dashboard/groups/GroupTableHeader'
import PageHeader from '@/app/components/dashboard/PageHeader'
import { getGroups } from '@/lib/actions/groups/getGroups'

export const metadata = {
    title: "Groups"
}

const Group = async ({searchParams}: {searchParams: Promise<{[key: string]: string | string[] | undefined}>}) => {
    const session = await getServerSession(authOptions)
    const userId = session?.user.id
    const querySearch = (await searchParams).q || "" 
    const groups = await getGroups(userId as string, querySearch as string)

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
                <GroupTable data={groups.data?.groupsMember}/>
            </section>
        </section>
    )
}

export default Group