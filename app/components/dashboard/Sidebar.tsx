"use client"
import React from 'react'
import { dataSidebar } from '@/app/utilities/dashboardSidebar'
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter
} from "@/app/components/ui/sidebar"
import Link from 'next/link'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu'
import { LuChevronsUpDown, LuChevronUp, LuUser2, LuCodesandbox } from 'react-icons/lu'



const SidebarComponent = () => {

    return (
        <Sidebar>
            <SidebarHeader className='mb-3'>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className='py-6'>
                            <section className='flexx space-x-2'>
                                <div className='bg-black rounded-xl p-2 flex-center'>
                                    <LuCodesandbox className='text-white text-2xl'/>
                                </div>
                                <section className='flex flex-col space-y-1'>
                                    <h1 className='text-[15px] font-semibold'>Cubers Inc</h1>
                                    <p className='text-[13px]'>Dashboard</p>
                                </section>
                            </section>
                            <LuChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {dataSidebar.map(({Icon, ...obj}) => (
                                <SidebarMenuItem key={obj.name}>
                                    <SidebarMenuButton asChild>
                                        <Link href={obj.url}>
                                            <Icon />
                                            <span>{obj.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>


            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <SidebarMenuButton>
                            <LuUser2 /> Zulfa
                            <LuChevronUp className="ml-auto" />
                        </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                        side="top"
                        className="w-[--radix-popper-anchor-width]"
                        >
                        <DropdownMenuItem>
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <span>Mail</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <span>Sign out</span>
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>

    )
}

export default SidebarComponent