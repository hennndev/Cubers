"use client"
import React, { useState, useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/app/components/ui/table"
import { Button } from '@/app/components/ui/button'

type PropsTypes = {
    data: FriendDataTypes[]
}

const FriendsTable = ({data}: PropsTypes) => {    
    console.log(data)
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