import { useState } from "react"
import { UserDataDetailTypes } from "@/types/next-env"
// components
import { LuLoader } from "react-icons/lu"
import { Button } from "@/app/components/ui/button"
import FormEditProfileDetail from "@/app/components/forms/FormEditProfileDetail"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"

type PropsTypes = {
  open: boolean
  setOpen: (value: boolean) => void
  data: UserDataDetailTypes
}

const ModalEditProfileDetail = ({ open, setOpen, data }: PropsTypes) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <FormEditProfileDetail data={data} setIsLoading={setIsLoading} closeModal={() => setOpen(false)} />
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

export default ModalEditProfileDetail
