"use client"
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { debounce } from 'lodash'
import queryString from 'query-string'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { removeProject } from '@/lib/actions/projects/removeProject'
// components
import { Button } from '@/app/components/ui/button'
import ModalConfirmButton from '@/app/components/utils/ModalConfirm'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { getProjects } from '@/lib/actions/projects/getProjects'
import clsx from 'clsx'

type PropsTypes = {
  data: any
}

const ProjectsTable = ({ data }: PropsTypes) => {
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


  useEffect(() => {
    // saat pertama kali page di render, maka set isClient true
    if (data && !isClient) {
      setIsClient(true)
    }
  }, [data, isClient])


  // function untuk memanggil groups ketika ada perubahan realtime pada query q
  const handleGetProjectsClientSide = debounce(async () => {
    const keyword = queriesStr.q as string || ""
    const project = await getProjects(userId as string, keyword)
    setDataClientSide(project.data?.projectsMember)
  }, 500)

  useEffect(() => {
    const handlePopState = async () => {
      // Update state when URL changes (e.g., after pushState or replaceState)
      const params: { [key: string]: string } = {};
      searchParams.forEach((value, key) => {
        params[key] = value;
      });
      // setQuery(params);
      await handleGetProjectsClientSide()
    }

    if (isClient) {
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
      <TableCaption>A list of projects.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role Control</TableHead>
          <TableHead>Members</TableHead>
          <TableHead>Detail</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead className='text-right'>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataClientSide.map((obj: any, index: number) => (
          <TableRow key={obj.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{obj.project.name}</TableCell>
            <TableCell>{obj.roleControl}</TableCell>
            <TableCell>
              {obj.project.members.length} {obj.project.members.length > 1 ? "members" : "member"}
            </TableCell>
            <TableCell>
              <Button variant="secondary" size="sm" onClick={() => router.push(`/project/${obj.project.id}`)}>Open Project</Button>
            </TableCell>
            <TableCell className={clsx(`font-bold`, 
              obj.project.priority === "HIGH" ? "text-red-500" : "",
              obj.project.priority === "MEDIUM" ? "text-yellow-500" : "",
              obj.project.priority === "LOW" ? "text-green-500" : "",)}>
              {obj.project.priority}
            </TableCell>
            <TableCell className='text-right space-x-3'>
              {obj.roleControl !== "Owner" || obj.roleControl !== "Admin" && (
                <Button variant="secondary" size="sm" onClick={() => router.push(`/dashboard/projects/edit-project?id=${obj.project.id}`)}>
                  Edit
                </Button>
              )}
              {obj.roleControl === "Owner" && (
                <ModalConfirmButton
                  modalType='remove'
                  modalTitle='Are you sure want to remove this project?'
                  modalText='This project will deleted permanently'
                  handleConfirm={() => handleRemoveProject(obj.project.id, obj.id)}>
                  <Button variant="destructive" size="sm">
                    Remove project
                  </Button>
                </ModalConfirmButton>
              )}
              {obj.roleControl === "Member" && (
                "Not allowed"
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ProjectsTable