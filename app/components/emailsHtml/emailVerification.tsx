import React from 'react'
import EmailWrapper from './emailWrapper'

import { Section, Heading, Button, Text, Hr, Container, Img } from '@react-email/components'

type PropsTypes = {
    username?: string
    linkVerified: string
}

const EmailVerification = ({username, linkVerified}: PropsTypes) => {

    return (
        <EmailWrapper title='Verified your email'>
            <Section className='bg-gray-100 p-[15px] rounded-md'>
                <Heading className='text-2xl text-center font-black text-[#222]'>Cubers</Heading>
                <Text className='text-xl text-center font-semibold text-[#222]'>Verify your email address</Text>
                {username && <Text className='text-[16px] leading-[25px] text-[#222] !mt-7'>Hi, {username}</Text>}
                <Text className='text-[16px] leading-[25px] text-[#222]'>
                    Please confirm that you want use this as your Cubers account email address. Once it's done you will be able to start exploring our services and features.
                </Text>
                <Button href={linkVerified} className='bg-[#222] block rounded-md px-[8px] py-[12px] text-white text-center text-[16px] !pointer-events-nonemt-7'>
                    Verified Email
                </Button>
                <Text className='text-[16px] leading-[25px]'>
                    Best,
                    <br />
                    Hendra Kece Badai
                </Text>
                <Hr className='border-[#222] my-[20px]'/>
                <Text>Purbalingga, Jawa Tengah, Indonesia</Text>
           </Section>
        </EmailWrapper>
    )
}

export default EmailVerification