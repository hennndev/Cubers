import React from 'react'
import EmailWrapper from './emailWrapper'
import { Section, Heading } from '@react-email/components'

type PropsTypes = {
    linkVerified: string
}

const EmailVerification = ({linkVerified}: PropsTypes) => {
    return (
        <EmailWrapper title='Verified your email'>
            <Section className='bg-white p-[30px] rounded-md'>
                <Heading className='text-xl text-center font-bold'>Welcome to Cubers</Heading>
           </Section>
        </EmailWrapper>
    )
}

export default EmailVerification