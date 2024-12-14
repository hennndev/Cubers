"use client"
import React from 'react'
import PageHeader from '../PageHeader'
import { LuPlus } from 'react-icons/lu'
import { useRouter } from 'next/navigation'
import { Button } from '@/app/components/ui/button'

const GroupHeader = () => {
    const router = useRouter()

    return (
        <PageHeader title='Groups' description='View and manage your group'>
            <Button onClick={() => router.push('/group/create-group')}>
                <LuPlus/> Create group
            </Button>
        </PageHeader>
    )
}

export default GroupHeader