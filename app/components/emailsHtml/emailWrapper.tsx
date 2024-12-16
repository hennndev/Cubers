import React from 'react'
import { Head, Html, Body, Preview, Container, Font, Tailwind } from '@react-email/components'

type PropsTypes = {
    title: string
    children: React.ReactNode
}

const EmailWrapper = ({title, children}: PropsTypes) => {
    return (
        <Html>
            <Head/>
            <Preview>{title}</Preview>
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            colors: {
                                brand: "#007291",
                            },
                        },
                    },
                }}
            >
                <Body className='bg-white p-[10px]'>
                    <Container className='mx-auto p-[20px]'>
                        {children}
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}

export default EmailWrapper