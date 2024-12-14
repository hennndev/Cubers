import React from 'react'
import PageHeader from '@/app/components/dashboard/PageHeader'
import ProfileSidebar from '@/app/components/dashboard/profile/ProfileSidebar'
import ProfileDetail from '@/app/components/dashboard/profile/ProfileDetail'

export const metadata = {
    title: "Cubers | Profile"
}

const Profile = () => {
    return (
        <section className='flex-1 pb-10'>
            <PageHeader title='Profile' description='Your profile information and all detail that related'/>
            <section className='flex px-10 space-x-8 h-screen'>
                <ProfileSidebar/>
                <ProfileDetail/>
            </section>
        </section>
    )
}

export default Profile