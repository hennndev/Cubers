import React from 'react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { getUser } from '@/lib/actions/users/getUser'
import { authOptions } from '@/lib/config/authOptions'
import { UserDataDetailTypes } from '@/types/next-env'
// components
import PageHeader from '@/app/components/shared/PageHeader'
import ProfileDetail from '@/app/components/profile/ProfileDetail'
import ProfileSidebar from '@/app/components/profile/ProfileSidebar'

type Props = {
  params: { username: string };
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const data = await getUser(params.username)
  return {
    title: `Cubers | ${data?.data?.name}`,
    description: `Profile with username ${params.username}`
  }
}

const Profile = async ({ params }: { params: { username: string } }) => {
  const session = await getServerSession(authOptions)
  const { username } = await params
  let user = await getUser(username)
  if(!user?.data) {
    redirect(`/dashboard/profile/${session?.user.username}`)
  }

  return (
    <section className='flex-1 pb-10'>
      <PageHeader title='Profile' description='Your profile information and all detail that related' />
      <section className='flex px-10 space-x-8 min-h-screen'>
        <ProfileSidebar />
        <ProfileDetail data={user.data as unknown as UserDataDetailTypes}/>
      </section>
    </section>
  )
}

export default Profile