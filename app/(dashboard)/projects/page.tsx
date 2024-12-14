import React from 'react'
import PageHeader from '@/app/components/dashboard/PageHeader'
import Link from 'next/link'
import { Button } from '@/app/components/ui/button'
import { LuPlus } from 'react-icons/lu'

export const metadata = {
    title: "Cubers | Projects"
}

const Projects = () => {
    return (
        <section className='flex-1 pb-10'>
            <PageHeader title='Projects' description='View and manage your projects'>       
                <Button asChild>
                    <Link href="/projects/create-project">
                        <LuPlus/> Create project
                    </Link>
                </Button>
            </PageHeader>
        </section>
    )
}

export default Projects