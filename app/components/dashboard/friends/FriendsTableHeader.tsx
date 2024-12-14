"use client"
import React from 'react'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { LuArrowUpAZ, LuListFilter } from 'react-icons/lu'

const FriendsTableHeader = () => {
    return (
        <section className='flexx space-x-3'>
            <Input type='text' placeholder='Search for friends' className='w-full'/>
            <Button variant="outline" size="icon">
                <LuArrowUpAZ/>
            </Button>   
            <Button variant="outline" size="icon">
                <LuListFilter/>
            </Button>   
        </section>
    )
}

export default FriendsTableHeader