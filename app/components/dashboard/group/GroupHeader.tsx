"use client"
import React from 'react'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { useRouter } from 'next/navigation'
import { LuPlus, LuListFilter, LuArrowUpAZ } from 'react-icons/lu'

const GroupHeader = () => {
    const router = useRouter()

    return (
        <section className='flex-between mb-12'>
            <section className='flex flex-col space-y-2'>
                <h1 className='text-2xl font-semibold tracking-tight'>Groups</h1>
                <p className='text-gray-500 text-sm'>View and manage your group</p>
            </section>
            <Button onClick={() => router.push('/group/create-group')}>
                <LuPlus/> Create group
            </Button>
        </section>
    )
}

export default GroupHeader