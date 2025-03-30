import { useState } from "react"
// components
import { LuLoader } from "react-icons/lu"
import { Button } from "@/app/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import FormAddProjectMember from "../forms/FormAddProjectMember"

type PropsTypes = {
  open: boolean
  setOpen: (value: boolean) => void
}

const ModalAddMember = ({ open, setOpen }: PropsTypes) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
          <DialogDescription>
            Add new member into your project. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <section>
          <FormAddProjectMember setIsLoading={setIsLoading} closeModal={() => setOpen(false)}/>
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

export default ModalAddMember
