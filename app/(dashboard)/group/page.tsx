import GroupHeader from '@/app/components/dashboard/GroupHeader'
import GroupTable from '@/app/components/dashboard/GroupTable'
import React from 'react'

const Group = () => {
    return (
        <section className='flex-1 p-10'>
            <GroupHeader/>
            <GroupTable/>
        </section>
    )
}

export default Group