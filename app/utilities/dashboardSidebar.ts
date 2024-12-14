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
        url: '/groups'
    },
    {
        name: 'Projects',
        Icon: LuBriefcase,
        url: '/projects'
    },
    {
        name: 'Friends',
        Icon: LuContact2,
        url: '/friends'
    },
    {
        name: 'Schedule',
        Icon: LuCalendarDays,
        url: '/schedule'
    },
    {
        name: 'Storage',
        Icon: LuFolders,
        url: '/storage'
    },
]
