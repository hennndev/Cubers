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
import { LuChevronDown, LuChevronUp, LuUser2 } from 'react-icons/lu'



const SidebarComponent = () => {

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                            <SidebarMenuButton>
                                Select Workspace
                            <LuChevronDown className="ml-auto" />
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