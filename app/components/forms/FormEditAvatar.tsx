import React from 'react'
import { LuCamera } from 'react-icons/lu'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'

const FormEditAvatar = () => {
  return (
    <Avatar className="w-[120px] h-[120px] rounded-full relative overflow-visible">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="rounded-full" />
      <AvatarFallback>CB</AvatarFallback>
      <input type="file" id="profile-picture" className="hidden" />
      <label htmlFor="profile-picture" className="absolute right-0 bottom-0 z-10 w-12 h-12 flex-center bg-primary text-primary-foreground rounded-full cursor-pointer">
        <LuCamera className="text-lg" />
      </label>
    </Avatar>
  )
}

export default FormEditAvatar