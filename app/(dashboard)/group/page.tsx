import React from 'react'
import GroupHeader from '@/app/components/dashboard/group/GroupHeader'
import GroupTable from '@/app/components/dashboard/group/GroupTable'
import GroupTableHeader from '@/app/components/dashboard/group/GroupTableHeader'

const Group = () => {
    return (
        <section className='flex-1 py-6 px-10'>
            <GroupHeader/>
            <section className='flex flex-col space-y-6'>
                <GroupTableHeader/>
                <GroupTable/>
            </section>
        </section>
    )
}

export default Group