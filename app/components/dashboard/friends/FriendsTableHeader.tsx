"use client"
import React, { useState } from 'react'
import { debounce } from 'lodash'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { findUsers } from '@/lib/actions/users/findUsers'
import { addFriend } from '@/lib/actions/users/addFriend'
import { LuArrowUpAZ, LuListFilter } from 'react-icons/lu'

type FriendsResponseTypes = {
    id: string
    username: string
    email: string
}

type PropsTypes = {
    data: FriendDataTypes[]
}

const FriendsTableHeader = ({data}: PropsTypes) => {
    const session = useSession()
    const userId = session.data?.user?.id as string
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [results, setResults] = useState<FriendsResponseTypes[]>([])

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
        } catch (error) {
            toast.error("Failed add new friend")
        }
    }
    
    const isFriend = (userId: string) => {
        return data.find(obj => obj.id === userId)
    }

    console.log(!isFriend("a4e23e5d-c91d-4342-9850-9eaa92501c40"))

    return (
        <section className='relative w-full h-auto'>
            <section className='flexx space-x-3'>
                <Input type='text' value={searchTerm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)} placeholder='Search for friends' className='w-full'/>
                <Button variant="outline" size="icon">
                    <LuArrowUpAZ/>
                </Button>   
                <Button variant="outline" size="icon">
                    <LuListFilter/>
                </Button>   
            </section>
            {searchTerm && (
                <section className='absolute top-12 shadow-md w-full min-h-[100px] max-h-[300px] overflow-y-auto bg-white text-sm border border-input z-10'>
                    {results.length > 0 ? (
                        results.map((user: FriendsResponseTypes) => (
                            <section key={user.id} className='flex-between cursor-pointer hover:bg-gray-100 py-3 px-4'>
                                <p>{user.username}</p>
                                {!isFriend(user.id) && userId !== user.id && (
                                    <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleAddFriend(e, user.id)} className='outline-none border-none text-gray-700'>Tambahkan</button>
                                )}
                            </section>
                        ))
                    ) : (
                        <p className='text-gray-700 p-2'>User not found</p>
                    )}
                </section>
            )}
        </section>
    )
}

export default FriendsTableHeader