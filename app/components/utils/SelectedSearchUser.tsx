"use client"
import { useSession } from 'next-auth/react'
import clsx from 'clsx'

type UserResponseTypes = {
    id: string
    username: string
    email: string
}
type PropsTypes = {
    isUsername?: boolean
    utilClass?: string
    isAdded: (value: string) => boolean
    results: UserResponseTypes[] | []
    handleAdd: (e: React.MouseEvent<HTMLButtonElement>, user: string) => void
}

const SelectedSearchUser = ({isUsername, utilClass, isAdded, handleAdd, results}: PropsTypes) => {
    const session = useSession()
    const userId = session.data?.user.id

    return (
        <section className={clsx("absolute top-12 shadow-md w-full min-h-[100px] max-h-[300px] overflow-y-auto bg-white text-sm border border-input z-10", utilClass && `${utilClass}`)}>
            {results.length > 0 ? (
                results.map((user: UserResponseTypes) => (
                    <section key={user.id} className='flex-between cursor-pointer hover:bg-gray-100 py-3 px-4'>
                        <p>{user.username}</p>
                        {!isAdded(isUsername ? user.username : user.id) && userId !== user.id && (
                            <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleAdd(e, isUsername ? user.username : user.id)} className='outline-none border-none text-gray-700'>Tambahkan</button>
                        )}
                    </section>
                ))
            ) : (
                <p className='text-gray-700 p-2'>User not found</p>
            )}
        </section>
    )
}

export default SelectedSearchUser