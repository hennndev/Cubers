import { LuHome, LuUsers, LuBriefcase, LuContact2, LuCalendar, LuCalendarDays, LuFolders } from "react-icons/lu"

export const dataSidebar = [
    {
        name: 'Home',
        Icon: LuHome,
        url: '/dashboard'
    },
    {
        name: 'Groups',
        Icon: LuUsers,
        url: '/dashboard/groups'
    },
    {
        name: 'Projects',
        Icon: LuBriefcase,
        url: '/dashboard/projects'
    },
    {
        name: 'Friends',
        Icon: LuContact2,
        url: '/dashboard/friends'
    },
    {
        name: 'Schedule',
        Icon: LuCalendarDays,
        url: '/dashboard/schedule'
    },
    {
        name: 'Storage',
        Icon: LuFolders,
        url: '/dashboard/storage'
    },
]

