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
import { useRouter, useSearchParams } from 'next/navigation'  
import { debounce } from 'lodash'
import ModalConfirmButton from '@/app/components/utils/ModalConfirm'
import { removeProject } from '@/lib/actions/projects/removeProject'

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

    const handleRemoveProject = async (projectIdd: number, projectMemberId: number) => {
            try {
                await removeProject(projectIdd)
                const updatedDataInClientSide = dataClientSide.filter((data: any) => data.id !== projectMemberId)
                setDataClientSide(updatedDataInClientSide)
                toast.success("Project has removed")
            } catch (error) {
                toast.error("Group has failed to removed")
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
                {data.map((obj: any) => (
                    <TableRow key={obj.id}>
                        <TableCell className="font-medium">{obj.project.id + 1}</TableCell>
                        <TableCell>{obj.project.name}</TableCell>
                        <TableCell>Owner</TableCell>
                        <TableCell>
                            {obj.project.members.length}
                        </TableCell>
                        <TableCell>
                            <Button variant="secondary" size="sm">Open Project</Button>
                        </TableCell>
                        <TableCell>
                            {new Date(obj.project.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className='text-right space-x-3'>
                            <Button variant="secondary" size="sm">
                                Edit
                            </Button>
                            <ModalConfirmButton 
                                modalType='remove'
                                modalTitle='Are you sure want to remove this project?'
                                modalText='This project will deleted permanently'
                                handleConfirm={() => handleRemoveProject(obj.project.id, obj.id)}>
                                <Button variant="destructive" size="sm">
                                    Remove project
                                </Button>
                            </ModalConfirmButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
      </Table>
    )
}

export default ProjectsTable