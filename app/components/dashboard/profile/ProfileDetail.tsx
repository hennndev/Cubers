"use client"
import React from 'react'
import { Button } from '@/app/components/ui/button'
import { LuPencil } from "react-icons/lu";


const ProfileDetail = () => {
    return (
        <section className='flex-1 flex flex-col space-y-6'>
            <section className='flex justify-between border border-gray-100 shadow-sm rounded-lg p-5'>
                <section className='flexx space-x-3'>
                    <div className='w-[100px] h-[100px]'>
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg" alt="man" className='w-full h-full rounded-full object-cover'/>
                    </div>
                    <section className='flex flex-col space-y-1.5'>
                        <h1 className='text-xl font-semibold'>Hendra Adriyanto Permana Putra</h1>
                        <p className='text-sm'>@hendraadri</p>
                        <p className='text-gray-500 text-sm '>Software Engineer, Indonesia</p>
                    </section>
                </section>
                <Button variant="outline">
                    <LuPencil/> Edit
                </Button>
            </section>

            <section className='flex justify-between border border-gray-100 shadow-sm rounded-lg p-5'>
                <section className='flex flex-col space-y-8'>
                    <h2 className='font-medium'>Personal Information</h2>

                    <section className='flex space-x-20'>
                        <section className='flex flex-col space-y-6'>
                            <section className='flex flex-col space-y-2'>
                                <h3 className='text-sm text-gray-500'>Name</h3>
                                <p className='text-sm text-primary'>Hendra Adriyanto Permana Putra</p>
                            </section>
                            <section className='flex flex-col space-y-2'>
                                <h3 className='text-sm text-gray-500'>Email Address</h3>
                                <p className='text-sm text-primary'>hen@hen.com</p>
                            </section>
                            <section className='flex flex-col space-y-2'>
                                <h3 className='text-sm text-gray-500'>Bio</h3>
                                <p className='text-sm text-primary'>Lifelong Learning</p>
                            </section>
                        </section>

                        <section className='flex flex-col space-y-6'>
                            <section className='flex flex-col space-y-2'>
                                <h3 className='text-sm text-gray-500'>Username</h3>
                                <p className='text-sm text-primary'>@hendraadri</p>
                            </section>
                            <section className='flex flex-col space-y-2'>
                                <h3 className='text-sm text-gray-500'>Phone/Whatsapp</h3>
                                <p className='text-sm text-primary'>62895377111674</p>
                            </section>
                        </section>
                    </section>
                </section>
                <Button variant="outline">
                    <LuPencil/> Edit
                </Button>
            </section>


            <section className='flex justify-between border border-gray-100 shadow-sm rounded-lg p-5'>
                <section className='flex flex-col space-y-8'>
                    <h2 className='font-medium'>Address</h2>

                    <section className='flex space-x-20'>
                        <section className='flex flex-col space-y-6'>
                            <section className='flex flex-col space-y-2'>
                                <h3 className='text-sm text-gray-500'>Country</h3>
                                <p className='text-sm text-primary'>Indonesia</p>
                            </section>
                            <section className='flex flex-col space-y-2'>
                                <h3 className='text-sm text-gray-500'>Address</h3>
                                <p className='text-sm text-primary'>RT 05/11, Toyareka, Kemangkon, Purbalingga</p>
                            </section>
                        </section>

                        <section className='flex flex-col space-y-6'>
                            <section className='flex flex-col space-y-2'>
                                <h3 className='text-sm text-gray-500'>City/State</h3>
                                <p className='text-sm text-primary'>Purbalingga</p>
                            </section>
                            <section className='flex flex-col space-y-2'>
                                <h3 className='text-sm text-gray-500'>Postal Code</h3>
                                <p className='text-sm text-primary'>53381</p>
                            </section>
                        </section>
                    </section>
                </section>
                <Button variant="outline">
                    <LuPencil/> Edit
                </Button>
            </section>
        </section>
    )
}

export default ProfileDetail