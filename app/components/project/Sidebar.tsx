"use client"
import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useRouter, usePathname, useParams } from 'next/navigation'
import { dataSidebar } from '@/app/utilities/projectSidebar'
// components
import { LuChevronsUpDown, LuChevronUp, LuUser, LuCodesandbox } from 'react-icons/lu'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/app/components/ui/dropdown-menu'
import { Sidebar,  SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter } from "@/app/components/ui/sidebar"

const SidebarComponent = () => {
  const pathname = usePathname()
  const { projectId } = useParams()
  const router = useRouter()
  const session = useSession()

  let pathTitle: string[] | string = pathname.split("/")
  pathTitle.shift()
  pathTitle = `/${pathTitle[0]}`

  return (
    <Sidebar>
      {/* sidebar header */}
      <SidebarHeader className='mb-3'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className='py-6'>
              <section className='flexx space-x-2'>
                <div className='bg-black rounded-xl p-2 flex-center'>
                  <LuCodesandbox className='text-white text-2xl' />
                </div>
                <section className='flex flex-col space-y-1'>
                  <h1 className='text-[15px] font-semibold'>Cubers Inc</h1>
                  <p className='text-[13px]'>Group</p>
                </section>
              </section>
              <LuChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* sidebar content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dataSidebar.map(({ Icon, ...obj }) => (
                <SidebarMenuItem key={obj.name}>
                  <SidebarMenuButton asChild>
                    <Link href={`${pathTitle}/${projectId}/${obj.url}`}>
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

      {/* sidebar footer */}
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton>
                        <LuUser /> {session.data?.user?.username}
                        <LuChevronUp className="ml-auto" />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="top"
                      className="w-[--radix-popper-anchor-width]"
                    >
                      <DropdownMenuItem onClick={() => router.push(`/dashboard/profile/${session.data?.user.username}`)} className='cursor-pointer'>
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Mail</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => signOut()}>
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