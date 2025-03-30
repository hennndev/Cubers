"use client"
import React, { useState } from 'react'
import { UserDataDetailTypes } from '@/types/next-env'
// components
import { LuPencil } from "react-icons/lu"
import { Button } from '@/app/components/ui/button'
import ModalEditProfileDetail from '@/app/components/profile/modals/ModalEditProfileDetail'

type PropsTypes = {
  isCurrentUser: boolean
  data: UserDataDetailTypes
}

const ProfileDetailPersonalInformation = ({isCurrentUser, data}: PropsTypes) => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <>
      <section className='flex justify-between border border-gray-100 shadow-sm rounded-lg p-5'>
        <section className='flex flex-col space-y-8'>
          <h2 className='font-medium'>Personal Information</h2>
          <section className='flex space-x-20'>
            <section className='flex flex-col space-y-6'>
              <section className='flex flex-col space-y-2'>
                <h3 className='text-sm text-gray-500'>Country</h3>
                <p className='text-sm text-primary'>{data.country || "---"}</p>
              </section>
              <section className='flex flex-col space-y-2'>
                <h3 className='text-sm text-gray-500'>City/State</h3>
                <p className='text-sm text-primary'>{data.city || "---"}</p>
              </section>
              <section className='flex flex-col space-y-2'>
                <h3 className='text-sm text-gray-500'>Bio</h3>
                <p className='text-sm text-primary'>{data.bio || "---"}</p>
              </section>
            </section>
            <section className='flex flex-col space-y-6'>
              <section className='flex flex-col space-y-2'>
                <h3 className='text-sm text-gray-500'>Phone/Whatsapp</h3>
                <p className='text-sm text-primary'>{data.whatsappNumber || "---"}</p>
              </section>
              <section className='flex flex-col space-y-2'>
                <h3 className='text-sm text-gray-500'>Address</h3>
                <p className='text-sm text-primary'>{data.address || "---"}</p>
              </section>
            </section>
          </section>
        </section>
        {isCurrentUser && (
          <Button variant="outline" onClick={() => setOpenModal(true)}>
            <LuPencil /> Edit
          </Button>
        )}
      </section>
      <ModalEditProfileDetail data={data as UserDataDetailTypes} open={openModal} setOpen={setOpenModal} />
    </>
  )
}

export default ProfileDetailPersonalInformation