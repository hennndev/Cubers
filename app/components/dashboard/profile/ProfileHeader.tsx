"use client"
import React from 'react'

const ProfileHeader = () => {
    return (
        <section className='sticky top-0 py-6 px-10 flex-between bg-white'>
            <section className='flex flex-col space-y-2'>
                <h1 className='text-2xl font-semibold tracking-tight'>Profile</h1>
                <p className='text-gray-500 text-sm'>Your profile information and all detail that related</p>
            </section>
        </section>
    )
}

export default ProfileHeader