import React from 'react'
import Link from 'next/link'
import PageHeader from '@/app/components/dashboard/PageHeader'
import FriendsTableHeader from '@/app/components/dashboard/friends/FriendsTableHeader'
import FriendsTable from '@/app/components/dashboard/friends/FriendsTable'

const Group = () => {
    return (
        <section className='flex-1 pb-10'>
            <PageHeader title='Friends' description='View and manage friend list'/>
            <section className='flex flex-col space-y-6 px-10 h-screen'>
                <FriendsTableHeader/>
                <FriendsTable/>
            </section>
        </section>
    )
}

export default Group