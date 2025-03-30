"use client"
import React from 'react'
// components
import { Button } from '@/app/components/ui/button'
import ModalConfirmButton from '@/app/components/shared/ModalConfirm'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"

const MembersTable = () => {

  return (
    <Table>
      <TableCaption>A list of projects.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Role Control</TableHead>
          <TableHead>Role Project</TableHead>
          <TableHead>Tasks</TableHead>
          <TableHead className='text-right'>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">1</TableCell>
          <TableCell>hendraadri</TableCell>
          <TableCell>Admin</TableCell>
          <TableCell>
            Frontend Web Developer
          </TableCell>
          <TableCell>
            <Button variant="secondary" size="sm">Open Tasks</Button>
          </TableCell>
          <TableCell className='text-right space-x-3'>
            <Button variant="secondary" size="sm">
              Edit
            </Button>
            <ModalConfirmButton
              modalType='remove'
              modalTitle='Are you sure want to remove this project?'
              modalText='This project will deleted permanently'
              handleConfirm={() => alert("aaa")}>
              <Button variant="destructive" size="sm">
                Remove project
              </Button>
            </ModalConfirmButton>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default MembersTable