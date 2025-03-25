"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { UserDataDetailTypes } from '@/types/next-env'
// components
import ProfileDetailHeader from '@/app/components/dashboard/profile/ProfileDetailHeader'
import ProfileDetailWorkerInfo from '@/app/components/dashboard/profile/ProfileDetailWorkerInfo'
import ProfileDetailStudentInfo from '@/app/components/dashboard/profile/ProfileDetailStudentInfo'
import ProfileDetailPersonalInformation from '@/app/components/dashboard/profile/ProfileDetailPersonalInformation'

type PropsTypes = {
  data: UserDataDetailTypes
}

const ProfileDetail = ({ data }: PropsTypes) => {
  const session = useSession()
  const currentUser = session.data?.user.username === data.username

  return (
    <section className='flex-1 flex flex-col space-y-6'>
      <ProfileDetailHeader data={data} isCurrentUser={currentUser} />
      <ProfileDetailPersonalInformation data={data} isCurrentUser={currentUser} />
      {data.detailWorker && (
        <ProfileDetailWorkerInfo data={data} isCurrentUser={currentUser} />
      )}
      {data.detailStudent && (
        <ProfileDetailStudentInfo data={data} isCurrentUser={currentUser} />
      )}
    </section>
  )
}

export default ProfileDetail