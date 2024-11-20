"use client"
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/app/components/ui/table"
import { Button } from '../ui/button'
   
  const groups = [
    {
      id: 1,
      name: "Tugas Web Toko Online",
      tags: ["tugas", "javascript", "python"],
      link: "1",
    },
    {
      id: 2,
      name: "Tugas Machine learning",
      tags: ["tugas", "javascript", "python"],
      link: "1",
    },
  ]

const GroupTable = () => {
    return (
        <Table>
            <TableCaption>A list of group projects.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Group Detail</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
            {groups.map((group) => (
                <TableRow key={group.id}>
                    <TableCell className="font-medium">{group.id}</TableCell>
                    <TableCell>{group.name}</TableCell>
                    <TableCell>
                        0 Member
                    </TableCell>
                    <TableCell>
                        <Button variant="secondary" size="sm">Open Group</Button>
                    </TableCell>
                    <TableCell>
                        {new Date().toLocaleDateString()}
                    </TableCell>
                    <TableCell className='text-right space-x-3'>
                        <Button variant="secondary" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Remove</Button>
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
      </Table>
    )
}

export default GroupTable