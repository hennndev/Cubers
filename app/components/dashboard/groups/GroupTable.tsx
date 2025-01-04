"use client"
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { debounce } from 'lodash'
import queryString from 'query-string'
import { useSession } from 'next-auth/react'
import { getGroups } from '@/lib/actions/groups/getGroups'
import { useRouter, useSearchParams } from 'next/navigation'
import { leaveGroup } from '@/lib/actions/groups/leaveGroup'
import { removeGroup } from '@/lib/actions/groups/removeGroup'   
// components
import { Button } from '@/app/components/ui/button'
import ModalConfirmButton from '@/app/components/utils/ModalConfirm'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"


type PropsTypes = {
    data: GroupsDataTypes
}

const GroupTable = ({data}: PropsTypes) => {
    const router = useRouter()
    const session = useSession()
    // mengambil info userId dari session login
    const userId = session.data?.user.id
    const searchParams = useSearchParams()
    // data client side, disini digunakan untuk menyimpan data yg di render di client side
    const [isClient, setIsClient] = useState<boolean>(false)
    const [dataClientSide, setDataClientSide] = useState(data)
    // parsing queries saat ini
    const queriesStr = queryString.parse(window.location.search)

    const handleRemoveGroup = async (groupId: number, groupMemberId: number) => {
        try {
            // digunakan untuk remove group yang hanya bisa dilakukan oleh group owner
            await removeGroup(groupId)
            // update data secara realtime di clientside
            const updatedDataInClientSide = dataClientSide.filter((data) => data.id !== groupMemberId)
            setDataClientSide(updatedDataInClientSide)
            toast.success("Group has removed")
        } catch (error) {
            toast.error("Group has failed to removed")
        }
    } 
    
    const handleLeaveGroup = async (groupMemberId: number) => {
        try {
            // digunakan untuk leave group dengan role selain owner
            await leaveGroup(groupMemberId)
            // update data secara realtime di clientside
            const updatedDataInClientSide = dataClientSide.filter((data) => data.id !== groupMemberId)
            setDataClientSide(updatedDataInClientSide)
            toast.success("You're leave the group")
        } catch (error) {
            toast.error("Failed leave group")
        }
    }

    useEffect(() => {
        // saat pertama kali page di render, maka set isClient true
        if(data && !isClient) {
            setIsClient(true)
        }
    }, [data, isClient])
    
    // function untuk memanggil groups ketika ada perubahan realtime pada query q
    const handleGetGroupsInClientSide = debounce(async () => {
        const keyword = queriesStr.q as string || ""
        const groups = await getGroups(userId as string, keyword)
        setDataClientSide(groups.data?.groupsMember as GroupsDataTypes)
    }, 500)

    useEffect(() => {
        const handlePopState = async () => {
            // Update state when URL changes (e.g., after pushState or replaceState)
            const params: { [key: string]: string } = {};
            searchParams.forEach((value, key) => {
                params[key] = value;
            });
            // setQuery(params);
            await handleGetGroupsInClientSide()
        }

        if(isClient) {
            // Add event listener for popstate (triggered on history changes)
            window.addEventListener('popstate', handlePopState);
            // Initial state setup on component mount
            handlePopState();
        }

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('popstate', handlePopState);
        }
    }, [searchParams, queriesStr.q])

    return (
        <Table>
            <TableCaption>A list of group projects.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Role Group</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Group Detail</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {dataClientSide.map((obj: GroupDataTypes, index: number) => (
                    <TableRow key={obj.group.id}>
                        <TableCell className="font-medium">{index  +1}</TableCell>
                        <TableCell>{obj.group.name}</TableCell>
                        <TableCell>{obj.group.level}</TableCell>
                        <TableCell>{obj.roleGroup}</TableCell>
                        <TableCell>
                            {obj.group.members.length} Member
                        </TableCell>
                        <TableCell>
                            <Button variant="secondary" size="sm" onClick={() => router.push(`/groups/${obj.group.name.replaceAll(" ", "-")}?id=${obj.group.id}`)}>
                                Open Group
                            </Button>
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
                            <ModalConfirmButton 
                                modalType='remove'
                                modalTitle='Are you sure want to remove this group?'
                                modalText='This group will deleted permanently'
                                handleConfirm={() => {
                                    if(obj.roleGroup === "Owner") {
                                        handleRemoveGroup(obj.group.id, obj.id)
                                    } else {
                                        handleLeaveGroup(obj.id)
                                    }
                                }}>
                                <Button variant="destructive" size="sm">
                                    {obj.roleGroup === "Owner" ? "Remove group" : "Leave group"}
                                </Button>
                            </ModalConfirmButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
      </Table>
    )
}

export default GroupTable