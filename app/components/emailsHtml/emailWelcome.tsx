import React from 'react'
import { Section, Heading } from "@react-email/components"
import EmailWrapper from './emailWrapper'

const EmailWelcome = () => {
    return (
        <EmailWrapper title='Thakyou for register to Cubers. Feel free to explore and ask out team to get support.'>
           <Section className='bg-white p-[30px] rounded-md'>
                <Heading className='text-xl text-center font-bold'>Welcome to Cubers</Heading>
           </Section>
        </EmailWrapper>
    )
}

export default EmailWelcome