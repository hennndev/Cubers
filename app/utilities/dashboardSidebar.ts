import { LuComponent, LuUsers, LuBriefcase, LuContact, LuMail, LuCalendarDays, LuFolders, LuSettings, LuNotebookText } from "react-icons/lu"

export const dataSidebar = [
  {
    name: 'Dashboard',
    Icon: LuComponent,
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
    Icon: LuContact,
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
  {
    name: 'Todos',
    Icon: LuNotebookText,
    url: '/dashboard/todos'
  },
  {
    name: 'Mail',
    Icon: LuMail,
    url: '/dashboard/mail'
  },
  {
    name: 'Settings',
    Icon: LuSettings,
    url: '/dashboard/settings'
  },
]

