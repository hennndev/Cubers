import React from 'react'
import PageHeader from '@/app/components/dashboard/PageHeader'
import FriendsTableHeader from '@/app/components/dashboard/friends/FriendsTableHeader'
import FriendsTable from '@/app/components/dashboard/friends/FriendsTable'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/config/authOptions'
import { getFriends } from '@/lib/actions/users/getFriends'

export const metadata = {
    title: "Friends"
}

const Group = async () => {
    const session = await getServerSession(authOptions)
    const userId = session?.user.id
    const friends = await getFriends(userId as string)
    return (
        <section className='flex-1 pb-10'>
            <PageHeader title='Friends' description='View and manage friend list'/>
            <section className='flex flex-col space-y-6 px-10 h-screen'>
                <FriendsTableHeader data={friends.data as FriendDataTypes[]}/>
                <FriendsTable data={friends.data as FriendDataTypes[]}/>
            </section>
        </section>
    )
}

export default Group