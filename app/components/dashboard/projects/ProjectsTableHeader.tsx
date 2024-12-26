"use client"
import React, { useState } from 'react'
import queryString from 'query-string'
import { useSearchParams } from 'next/navigation'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { LuArrowUpAZ, LuListFilter } from 'react-icons/lu'
import { useQueryParams } from '@/app/hooks/useQueryParams'

const ProjectsTableHeader = () => {
    const searchParams = useSearchParams()
    const queryQ = searchParams.get("q") || ""
    const [searchTerm, setSearchTerm] = useState<string>(queryQ)
    const queries = queryString.parse(window.location.search)
    const { newQueryParameters, handleSetQueries } = useQueryParams()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchTerm(value)
        handleSetQueries(queries)
        if(value) {
            newQueryParameters.set('q', value)
        } else {
            newQueryParameters.delete('q')
        }	
        const currentQueries = queryString.parse(newQueryParameters.toString())
        let newPathname = `${window.location.pathname}?${newQueryParameters.toString()}`
        if(Object.keys(currentQueries).length < 1) {
            newPathname = newPathname.replace('?', '')
        }
        window.history.pushState({}, "", newPathname)
    }

    return (
        <section className='flex-between'>
            <section className='flex space-x-6'>
                <p className='text-sm font-medium pb-2 border-b-2 border-gray-500'>Table View</p>
                <p className='text-sm font-medium'>Kanban View</p>
            </section>
            <section className='flexx space-x-3'>
                <Input 
                    type='text' 
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder='Search for projects name, projects tags, and projects owner' 
                    className='w-[500px]'/>
                <Button variant="outline" size="icon">
                    <LuArrowUpAZ/>
                </Button>   
                <Button variant="outline" size="icon">
                    <LuListFilter/>
                </Button>   
            </section>
        </section>
    )
}

export default ProjectsTableHeader