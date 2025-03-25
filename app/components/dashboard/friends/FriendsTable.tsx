"use client"
import React from 'react'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import { FriendDataTypes } from '@/types/next-env'
import { removeFriend } from '@/lib/actions/users/removeFriend'
// components
import { Button } from '@/app/components/ui/button'
import ModalConfirmButton from '@/app/components/utils/ModalConfirm'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"

type PropsTypes = {
  data: FriendDataTypes[]
}

const FriendsTable = ({ data }: PropsTypes) => {
  const session = useSession()
  const userId = session.data?.user.id

  const handleRemoveFriend = async (friendId: string, username: string) => {
    try {
      await removeFriend(userId as string, friendId)
      toast.success(`${username} has removed from friends`)
    } catch (error) {
      toast.error("Friend has failed to removed")
    }
  }

  return (
    <Table>
      <TableCaption>A list of friends.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>User Detail</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((obj: FriendDataTypes, index: number) => (
          <TableRow key={obj.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{obj.name}</TableCell>
            <TableCell>
              {obj.email}
            </TableCell>
            <TableCell>
              Student
            </TableCell>
            <TableCell>
              <a href={`/dashboard/profile/${obj.username}`} target='_blank'>
                <Button variant="secondary" size="sm">User Detail</Button>
              </a>
            </TableCell>
            <TableCell className='text-right space-x-3'>
              <ModalConfirmButton
                modalType='remove'
                modalTitle='Are you sure want to remove your friend?'
                modalText='Your friend will deleted permanently'
                handleConfirm={() => handleRemoveFriend(obj.id, obj.username)}>
                <Button variant="destructive" size="sm">
                  Remove
                </Button>
              </ModalConfirmButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
export default FriendsTable