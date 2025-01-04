"use client"
import React, { useState, useRef } from 'react'
import { toast } from 'sonner'
import { debounce } from 'lodash'
import { useSession } from 'next-auth/react'
import { findUsers } from '@/lib/actions/users/findUsers'
import { addFriend } from '@/lib/actions/users/addFriend'
// components
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { LuArrowUpAZ, LuListFilter } from 'react-icons/lu'
import SelectedSearchUser from '@/app/components/utils/SelectedSearchUser'

type UserResponseTypes = {
    id: string
    username: string
    email: string
}

type PropsTypes = {
    data: FriendDataTypes[]
}

const FriendsTableHeader = ({data}: PropsTypes) => {
    const session = useSession()
    const inputRef = useRef<HTMLInputElement>(null)
    const userId = session.data?.user?.id as string
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [results, setResults] = useState<UserResponseTypes[]>([])

    const debouncedSearchUsers = debounce(async (keyword) => {
        const results = await findUsers(keyword)
        setResults(results.data as any)
    }, 500)

    const handleChange = (value: string) => {
        setSearchTerm(value)
        debouncedSearchUsers(value)
    }

    const handleAddFriend = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, friendId: string) => {
        e.stopPropagation()
        try {
            await addFriend(userId, friendId)
            toast.success("New friend has added")
            inputRef.current?.focus()
        } catch (error) {
            toast.error("Failed add new friend")
        }
    }
    
    const isFriend = (userId: string) => {
        return data.find(obj => obj.id === userId)
    }

    return (
        <section className='relative w-full h-auto'>
            <section className='flexx space-x-3'>
                <Input type='text' ref={inputRef} value={searchTerm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)} placeholder='Search for friends' className='w-full'/>
                <Button variant="outline" size="icon">
                    <LuArrowUpAZ/>
                </Button>   
                <Button variant="outline" size="icon">
                    <LuListFilter/>
                </Button>   
            </section>
            {searchTerm && (
                <SelectedSearchUser 
                    isAdded={(userId: string) => Boolean(isFriend(userId))} 
                    results={results} 
                    handleAdd={(e, userId) => handleAddFriend(e, userId)}/>
            )}
        </section>
    )
}

export default FriendsTableHeader