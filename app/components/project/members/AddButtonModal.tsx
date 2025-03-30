"use client"
import React, { useState } from 'react'
import { Button } from '../../ui/button'
import { LuPlus } from 'react-icons/lu'
import ModalAddMember from '../modals/ModalAddMember'

const AddButtonModal = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>
        <LuPlus /> Add Member
      </Button>
      {openModal && <ModalAddMember open={openModal} setOpen={setOpenModal}/>}
    </>
  )
}

export default AddButtonModal