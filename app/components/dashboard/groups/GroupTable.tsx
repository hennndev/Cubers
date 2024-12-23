"use client"
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/components/ui/table"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Button } from '@/app/components/ui/button'
import { removeGroup } from '@/lib/actions/groups/removeGroup'   
import { leaveGroup } from '@/lib/actions/groups/leaveGroup'

type PropsTypes = {
    data: any
}

const GroupTable = ({data}: PropsTypes) => {
    const router = useRouter()
    const handleRemoveGroup = async (groupId: number) => {
        try {
            await removeGroup(groupId)
            toast.success("Group has removed")
        } catch (error) {
            toast.error("Group has failed to removed")
        }
    } 

    const handleLeaveGroup = async (groupMemberId: number) => {
        try {
            await leaveGroup(groupMemberId)
            toast.success("You're leave the group")
        } catch (error) {
            toast.error("Failed leave group")
        }
    }

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
                        <Button variant="secondary" size="sm" onClick={() => router.push(`/dashboard/groups/edit-group?id=${obj.group.id}`)}>Edit</Button>
                        <Button variant="destructive" size="sm" onClick={() => {
                            if(obj.roleGroup === "Owner") {
                                handleRemoveGroup(obj.group.id)
                            } else {
                                handleLeaveGroup(obj.id)
                            }
                        }}>
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