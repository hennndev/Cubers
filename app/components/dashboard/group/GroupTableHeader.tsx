"use client"
import React from 'react'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { LuArrowUpAZ, LuListFilter } from 'react-icons/lu'

const GroupTableHeader = () => {
    return (
        <section className='flex-between'>
            <section className='flex space-x-6'>
                <p className='text-sm font-medium pb-2 border-b-2 border-gray-500'>Table View</p>
                <p className='text-sm font-medium'>Kanban View</p>
            </section>
            <section className='flexx space-x-3'>
                <Input type='text' placeholder='Search for group' className='w-[500px]'/>
                <Button variant="outline" size="icon">
                    <LuArrowUpAZ/>
                </Button>   
                <Button variant="outline" size="icon">
                    <LuListFilter/>
                </Button>   
            </section>
        </section>
    )
}

export default GroupTableHeader