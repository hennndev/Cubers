import { LuComponent, LuClipboardList, LuBriefcase, LuCalendarDays, LuFolders, LuUsersRound } from "react-icons/lu"

export const dataSidebar = [
  {
    name: 'Dashboard',
    Icon: LuComponent,
    url: '/'
  },
  {
    name: 'Members',
    Icon: LuUsersRound,
    url: '/members'
  },
  {
    name: 'Roles',
    Icon: LuBriefcase,
    url: '/roles'
  },
  {
    name: 'Tasks',
    Icon: LuClipboardList,
    url: '/tasks'
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

