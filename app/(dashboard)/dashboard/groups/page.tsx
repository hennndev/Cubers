import React from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/config/authOptions'
import { getGroups } from '@/lib/actions/groups/getGroups'
// components
import { LuPlus } from 'react-icons/lu'
import { Button } from '@/app/components/ui/button'
import PageHeader from '@/app/components/shared/PageHeader'
import GroupTable from '@/app/components/dashboard/groups/GroupTable'
import GroupTableHeader from '@/app/components/dashboard/groups/GroupTableHeader'
import { GroupsDataTypes } from '@/types/next-env'

export const metadata = {
  title: "Cubers | Groups"
}

const Group = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const session = await getServerSession(authOptions)
  // mengambil userId dari session login
  const userId = session?.user.id
  // mengambil query q, jika tidak ada kembalikan empty string
  const querySearch = (await searchParams).q || ""
  // query search digunakan untuk mencari group berdasarkan keyword yang ditulis oleh user
  const groups = await getGroups(userId as string, querySearch as string)

  return (
    <section className='flex-1 pb-10'>
      <PageHeader title='Groups' description='View and manage group'>
        <Button asChild>
          <Link href="/dashboard/groups/create-group">
            <LuPlus /> Create group
          </Link>
        </Button>
      </PageHeader>
      <section className='flex flex-col space-y-6 px-10 h-screen'>
        <GroupTableHeader />
        <GroupTable data={groups.data?.groupsMember as GroupsDataTypes} />
      </section>
    </section>
  )
}
export default Group