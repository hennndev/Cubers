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
import { useSession } from 'next-auth/react'
   
type PropsTypes = {
    data: any
}

const GroupTable = ({data}: PropsTypes) => {
    const session = useSession()
    console.log(session.status)
    
    return (
        <Table>
            <TableCaption>A list of group projects.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role Group</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Group Detail</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
            {data.map((obj: any, index: number) => (
                <TableRow key={obj.group.id}>
                    <TableCell className="font-medium">{index  +1}</TableCell>
                    <TableCell>{obj.group.name}</TableCell>
                    <TableCell>{obj.roleGroup}</TableCell>
                    <TableCell>
                        {obj.group.members.length} Member
                    </TableCell>
                    <TableCell>
                        <Button variant="secondary" size="sm">Open Group</Button>
                    </TableCell>
                    <TableCell>
                        {new Date(obj.group.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className='text-right space-x-3'>
                        <Button variant="secondary" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">
                            {obj.roleGroup === "Owner" ? "Remove group" : "Leave group"}
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
      </Table>
    )
}

export default GroupTable