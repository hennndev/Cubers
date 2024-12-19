import React from 'react'
import { Section, Heading, Text, Hr } from "@react-email/components"
import EmailWrapper from './emailWrapper'

const EmailWelcome = () => {
    return (
        <EmailWrapper title='Hi, welcome to Cubers!'>
           <Section className='bg-gray-100 p-[15px] rounded-md'>
                <Heading className='text-2xl text-center font-black text-[#222]'>Welcome to Cubers</Heading>
                <Text className='text-[16px] leading-[25px] text-[#222]'>
                    Wowewee! Thankyou for register an account to Cubers. You're the coolest person in the world. Please, feel free to explore our features and ask our team to get support if you want. ❤️
                </Text>
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

export default EmailWelcome