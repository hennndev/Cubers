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
import { toast } from 'sonner'
import queryString from 'query-string'
import { useSession } from 'next-auth/react'
import { Button } from '@/app/components/ui/button'
import { getGroups } from '@/lib/actions/groups/getGroups'
import { useRouter, useSearchParams } from 'next/navigation'
import { leaveGroup } from '@/lib/actions/groups/leaveGroup'
import { removeGroup } from '@/lib/actions/groups/removeGroup'   
import { debounce } from 'lodash'

type PropsTypes = {
    data: any
}

const GroupTable = ({data}: PropsTypes) => {
    const router = useRouter()
    const session = useSession()
    const userId = session.data?.user.id
    const searchParams = useSearchParams()
    const [isClient, setIsClient] = useState<boolean>(false)
    const [dataClientSide, setDataClientSide] = useState(data)
    const queriesStr = queryString.parse(window.location.search)

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
            const updatedDataInClientSide = dataClientSide.filter((data: any) => data.id !== groupMemberId)
            setDataClientSide(updatedDataInClientSide)
            toast.success("You're leave the group")
        } catch (error) {
            toast.error("Failed leave group")
        }
    }

    const handleGetGroupsInClientSide = debounce(async () => {
        const keyword = queriesStr.q as string || ""
        const groups = await getGroups(userId as string, keyword)
        setDataClientSide(groups.data?.groupsMember)
    }, 500)


    useEffect(() => {
        if(data && !isClient) {
            setIsClient(true)
        }
    }, [data, isClient])
    

    useEffect(() => {
        const handlePopState = async () => {
            // Update state when URL changes (e.g., after pushState or replaceState)
            const params: { [key: string]: string } = {};
            searchParams.forEach((value, key) => {
                params[key] = value;
            });
            // setQuery(params);
            await handleGetGroupsInClientSide()
        };

        if(isClient) {
            // Add event listener for popstate (triggered on history changes)
            console.log("CALLED")
            window.addEventListener('popstate', handlePopState);

            // Initial state setup on component mount
            handlePopState();
        }

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [searchParams, queriesStr.q]);

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
                {dataClientSide.map((obj: any, index: number) => (
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
                            {obj.roleGroup === "Owner" && (
                                <Button variant="secondary" size="sm" onClick={() => router.push(`/dashboard/groups/edit-group?id=${obj.group.id}`)}>
                                    Edit
                                </Button>
                            )}
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