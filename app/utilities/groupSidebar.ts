import { LuComponent, LuUsers, LuBriefcase, LuCalendarDays, LuFolders } from "react-icons/lu"

export const dataSidebar = [
    {
        name: 'Dashboard',
        Icon: LuComponent,
        url: '/dashboard'
    },
    {
        name: 'Projects',
        Icon: LuBriefcase,
        url: '/projects'
    },
    {
        name: 'Members',
        Icon: LuUsers,
        url: '/members'
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

