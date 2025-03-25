import React from 'react'
import { getServerSession } from 'next-auth'
import PageHeader from '@/app/components/dashboard/PageHeader'
import ProfileSidebar from '@/app/components/dashboard/profile/ProfileSidebar'
import ProfileDetail from '@/app/components/dashboard/profile/ProfileDetail'
import { getUser } from '@/lib/actions/users/getUser'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/config/authOptions'
import { UserDataDetailTypes } from '@/types/next-env'

export const metadata = {
  title: "Cubers | Profile"
}

const Profile = async ({ params }: { params: { username: string } }) => {
  // ambil session login
  const session = await getServerSession(authOptions)
  //ambil dynamic paramnya
  const { username } = await params
  //get user by username
  let user = await getUser(username)
  //if user is undefined, param is replaced by session username
  if(!user?.data) {
    redirect(`/dashboard/profile/${session?.user.username}`)
  }

  return (
    <section className='flex-1 pb-10'>
      <PageHeader title='Profile' description='Your profile information and all detail that related' />
      <section className='flex px-10 space-x-8 min-h-screen'>
        {/* <ProfileSidebar /> */}
        <ProfileDetail data={user.data as unknown as UserDataDetailTypes}/>
      </section>
    </section>
  )
}

export default Profile