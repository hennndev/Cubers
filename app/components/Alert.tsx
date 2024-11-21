"use client"
import React from 'react'
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/app/components/ui/alert"

type PropsTypes = {
    variant: "default" | "destructive"
    title: string
    description: string
}

const Alertcomp = ({variant, title}: PropsTypes) => {
    return (
        <Alert variant={variant}>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                Your session has expired. Please log in again.
            </AlertDescription>
        </Alert>
    )
}

export default Alertcomp