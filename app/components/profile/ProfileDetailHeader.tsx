"use client"
import React, { useState } from 'react'
import { UserDataDetailTypes } from '@/types/next-env'
// components
import { LuPencil } from "react-icons/lu"
import { Button } from '@/app/components/ui/button'
import ModalEditProfile from '@/app/components/profile/modals/ModalEditProfile'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'

type PropsTypes = {
  isCurrentUser: boolean
  data: UserDataDetailTypes
}

const ProfileDetailHeader = ({isCurrentUser, data}: PropsTypes) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  return (
    <>
      <section className='flex justify-between border border-gray-100 shadow-sm rounded-lg p-5'>
        <section className='flexx space-x-3'>
          <Avatar className="w-[100px] h-[100px]">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CB</AvatarFallback>
          </Avatar>
          <section className='flex flex-col space-y-1.5'>
            <h1 className='text-xl font-semibold'>{data?.name}</h1>
            <p className='text-sm'>@{data?.username}</p>
            <p className='text-gray-500 text-sm '>{data?.email}</p>
            <p className='text-gray-500 text-sm lowercase'>
              {data?.status.replaceAll("_", " ")}
            </p>
          </section>
        </section>
        {isCurrentUser && (
          <Button variant="outline" onClick={() => setOpenModal(true)}>
            <LuPencil /> Edit
          </Button>
        )}
      </section>
      <ModalEditProfile data={data as UserDataDetailTypes} open={openModal} setOpen={setOpenModal} />
    </>
  )
}

export default ProfileDetailHeader