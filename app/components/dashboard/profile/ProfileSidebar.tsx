"use client"
import React from 'react'
import Link from 'next/link'

const ProfileSidebar = () => {
  return (
    <section className='sticky top-[132px] self-start flex flex-col w-[200px]'>
      <Link href="/dashboard/profile" className='text-sm hover:bg-sidebar-accent p-2 rounded-md bg-sidebar-accent'>My Profile</Link>
      <Link href="/dashboard/profile/activity" className='text-sm hover:bg-sidebar-accent p-2 rounded-md'>Activity</Link>
      <Link href="/dashboard/profile/groups" className='text-sm hover:bg-sidebar-accent p-2 rounded-md'>Groups</Link>
      <Link href="/dashboard/profile/projects" className='text-sm hover:bg-sidebar-accent p-2 rounded-md'>Projects</Link>
      <Link href="/dashboard/profile/notifications" className='text-sm hover:bg-sidebar-accent p-2 rounded-md'>Notifications</Link>
    </section>
  )
}

export default ProfileSidebar