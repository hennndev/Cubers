"use client"
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { LuPlus } from 'react-icons/lu'

const GroupHeader = () => {
    const router = useRouter()

    return (
        <section className='flex-between mb-10'>
            <Input type='text' placeholder='Type to find group...' className='w-[450px]'/>
            <Button onClick={() => router.push('/group/create-group')}>
                <LuPlus/> Create group
            </Button>
        </section>
    )
}

export default GroupHeader