"use client"
import React from 'react'
import Link from 'next/link'

const ProfileSidebar = () => {
    return (
        <section className='sticky top-[132px] self-start flex flex-col w-[200px]'>
            <Link href="/profile" className='text-sm hover:bg-sidebar-accent p-2 rounded-md bg-sidebar-accent'>My Profile</Link>
            <Link href="/profile" className='text-sm hover:bg-sidebar-accent p-2 rounded-md'>Activity</Link>
            <Link href="/profile" className='text-sm hover:bg-sidebar-accent p-2 rounded-md'>Group</Link>
            <Link href="/profile" className='text-sm hover:bg-sidebar-accent p-2 rounded-md'>Projects</Link>
            <Link href="/profile" className='text-sm hover:bg-sidebar-accent p-2 rounded-md'>Notifications</Link>
            <Link href="/profile" className='text-sm hover:bg-sidebar-accent p-2 rounded-md'>Delete Account</Link>
        </section>
    )
}

export default ProfileSidebar