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
import { Button } from '@/app/components/ui/button'
   
const friends = [
    {
        id: 1,
        name: "Zulfa Aulia Hanafi",
        email: "zulfa@zulfa.com",
        status: "Student",
    },
    {
        id: 2,
        name: "Tugas Machine learning",
        email: "zulfa@zulfa.com",
        status: "Student",
    },
]

const FriendsTable = () => {
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
            {friends.map((obj) => (
                <TableRow key={obj.id}>
                    <TableCell className="font-medium">{obj.id}</TableCell>
                    <TableCell>{obj.name}</TableCell>
                    <TableCell>
                        {obj.email}
                    </TableCell>
                    <TableCell>
                        {obj.status}
                    </TableCell>
                    <TableCell>
                        <Button variant="secondary" size="sm">User Detail</Button>
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

export default FriendsTable