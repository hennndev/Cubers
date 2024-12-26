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

const ProjectsTable = ({data}: PropsTypes) => {
    const router = useRouter()
    const session = useSession()
    const userId = session.data?.user.id
    const searchParams = useSearchParams()
    const [isClient, setIsClient] = useState<boolean>(false)
    const [dataClientSide, setDataClientSide] = useState(data)
    const queriesStr = queryString.parse(window.location.search)


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
                <TableRow>
                    <TableCell className="font-medium">1</TableCell>
                    <TableCell>Web landing page project</TableCell>
                    <TableCell>Owner</TableCell>
                    <TableCell>
                        10 Member
                    </TableCell>
                    <TableCell>
                        <Button variant="secondary" size="sm">Open Project</Button>
                    </TableCell>
                    <TableCell>
                        {new Date().toLocaleDateString()}
                    </TableCell>
                    <TableCell className='text-right space-x-3'>
                        <Button variant="secondary" size="sm">
                            Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                            Remove project
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
      </Table>
    )
}

export default ProjectsTable