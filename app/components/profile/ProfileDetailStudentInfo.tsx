"use client"
import React, { useState } from 'react'
import { UserDataDetailTypes } from '@/types/next-env'
// components
import { LuPencil } from "react-icons/lu"
import { Button } from '@/app/components/ui/button'
import ModalEditStudentInfo from '@/app/components/profile/modals/ModalEditStudentInfo'

type PropsTypes = {
  isCurrentUser: boolean
  data: UserDataDetailTypes
}

const ProfileDetailStudentInfo = ({data, isCurrentUser}: PropsTypes) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  return (
    <>
      <section className='flex justify-between border border-gray-100 shadow-sm rounded-lg p-5'>
        <section className='flex flex-col space-y-8'>
          <h2 className='font-medium'>Student Information</h2>

          <section className='flex space-x-20'>
            <section className='flex flex-col space-y-6'>
              <section className='flex flex-col space-y-2'>
                <h3 className='text-sm text-gray-500'>Institution</h3>
                <p className='text-sm text-primary'>{data.detailStudent?.institution || "---"}</p>
              </section>
              <section className='flex flex-col space-y-2'>
                <h3 className='text-sm text-gray-500'>Major</h3>
                <p className='text-sm text-primary'>{data.detailStudent?.major || "---"}</p>
              </section>
            </section>

            <section className='flex flex-col space-y-6'>
              <section className='flex flex-col space-y-2'>
                <h3 className='text-sm text-gray-500'>Grade Level</h3>
                <p className='text-sm text-primary'>{data.detailStudent?.gradeLevel || "---"}</p>
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
      <ModalEditStudentInfo data={data} open={openModal} setOpen={setOpenModal}/>
    </>
  )
}

export default ProfileDetailStudentInfo