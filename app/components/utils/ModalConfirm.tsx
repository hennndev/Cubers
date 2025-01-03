"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog"
import clsx from "clsx"

type PropsTypes = {
    modalType: "remove" | "edit"
    modalTitle: string
    modalText: string
    children: React.ReactNode
    handleConfirm: () => void
}
  
const ModalConfirmButton = ({modalType, modalTitle, modalText, children, handleConfirm}: PropsTypes) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{modalTitle}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {modalText}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                        className={clsx(modalType === "remove" ? "bg-destructive hover:bg-destructive hover:opacity-90" : "")}
                        onClick={handleConfirm}>
                        {modalType === "remove" ? "Remove" : "Edit"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ModalConfirmButton
  