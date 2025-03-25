import React, { useState } from 'react'
import { UserDataDetailTypes } from '@/types/next-env'
// components
import { LuPencil } from "react-icons/lu"
import { Button } from '@/app/components/ui/button'
import ModalEditWorkerInfo from '@/app/components/modal/ModalEditWorkerInfo'

type PropsTypes = {
  isCurrentUser: boolean
  data: UserDataDetailTypes
}

const ProfileDetailWorkerInfo = ({data, isCurrentUser}: PropsTypes) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  return (
    <>
      <section className='flex justify-between border border-gray-100 shadow-sm rounded-lg p-5'>
        <section className='flex flex-col space-y-8'>
          <h2 className='font-medium'>Works Information</h2>
          <section className='flex space-x-20'>
            <section className='flex flex-col space-y-6'>
              <section className='flex flex-col space-y-2'>
                <h3 className='text-sm text-gray-500'>Role/Position</h3>
                <p className='text-sm text-primary'>{data.detailWorker?.position || "---"}</p>
              </section>
              <section className='flex flex-col space-y-2'>
                <h3 className='text-sm text-gray-500'>Company</h3>
                <p className='text-sm text-primary'>{data.detailWorker?.company || "---"}</p>
              </section>
            </section>
            <section className='flex flex-col space-y-6'>
              <section className='flex flex-col space-y-2'>
                <h3 className='text-sm text-gray-500'>Departement</h3>
                <p className='text-sm text-primary'>{data.detailWorker?.department || "---"}</p>
              </section>
              <section className='flex flex-col space-y-2'>
                <h3 className='text-sm text-gray-500'>Experience</h3>
                <p className='text-sm text-primary'>{data.detailWorker?.experience || "---"}</p>
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
      <ModalEditWorkerInfo data={data as UserDataDetailTypes} open={openModal} setOpen={setOpenModal} />
    </>
  )
}

export default ProfileDetailWorkerInfo