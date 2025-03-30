"use client"
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import { Button } from '@/app/components/ui/button'

type UserResponseTypes = {
  id: string
  email: string
  username: string
}
type PropsTypes = {
  isUsername?: boolean
  utilClass?: string
  handleClear: () => void
  isAdded: (value: string) => boolean
  results: UserResponseTypes[] | []
  handleAdd: (e: React.MouseEvent<HTMLButtonElement>, user: string, username: string) => void
}

const SelectedSearchUser = ({ isUsername, utilClass, handleClear, isAdded, handleAdd, results }: PropsTypes) => {
  const session = useSession()
  const userId = session.data?.user.id

  const addFriendHandler = (e: React.MouseEvent<HTMLButtonElement>, user: UserResponseTypes) => {
    e.preventDefault()
    e.stopPropagation()
    handleAdd(e, isUsername ? user.username : user.id, user.username)
    handleClear()
  }

  return (
    <section className={clsx("absolute top-12 shadow-md w-full min-h-[100px] max-h-[300px] overflow-y-auto bg-white text-sm border border-input z-10", utilClass && `${utilClass}`)}>
      {results.length > 0 ? (
        results.map((user: UserResponseTypes) => (
          <a href={`/dashboard/profile/${user.username}`} target='_blank' key={user.id} className='flex-between cursor-pointer hover:bg-gray-100 py-3 px-4'>
            <p>{user.username} {user.id === userId? "(yourself)" : ""}</p>
            {!isAdded(isUsername ? user.username : user.id) && userId !== user.id && (
              <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => addFriendHandler(e, user)} className='outline-none border-none text-gray-700'>Tambahkan</button>
            )}
          </a>
        ))
      ) : (
        <p className='text-gray-700 p-2'>User not found</p>
      )}
      <div className='p-2'>
        <Button variant="ghost" size="sm" onClick={handleClear}>Clear</Button>
      </div>
    </section>
  )
}

export default SelectedSearchUser