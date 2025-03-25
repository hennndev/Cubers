import { useState } from "react"
import { UserDataDetailTypes } from "@/types/next-env"
// components
import { LuLoader } from "react-icons/lu"
import { Button } from "@/app/components/ui/button"
import FormEditAvatar from "@/app/components/forms/FormEditAvatar"
import FormEditProfile from "@/app/components/forms/FormEditProfile"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"

type PropsTypes = {
  open: boolean
  setOpen: (value: boolean) => void
  data: UserDataDetailTypes
}

const ModalEditProfile = ({ open, setOpen, data }: PropsTypes) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <section className="flex-center">
          <FormEditAvatar />
        </section>
        <section className="mt-3">
          <FormEditProfile closeModal={() => setOpen(false)} setIsLoading={setIsLoading} data={data} />
        </section>
        <DialogFooter>
          <Button type="submit" form="submit-form" disabled={isLoading}>
            {isLoading && <LuLoader className="animate-spin" />}
            {isLoading ? 'Waiting' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ModalEditProfile
