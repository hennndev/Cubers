"use client"
import React from 'react'

type PropsTypes = {
	title: string
	description: string
	children?: React.ReactNode
}

const PageHeader = ({ title, description, children }: PropsTypes) => {
	return (
		<section className='sticky top-0 py-6 px-10 flex-between bg-white z-50 mb-5'>
			<section className='flex flex-col space-y-2'>
				<h1 className='text-2xl font-semibold tracking-tight'>{title}</h1>
				<p className='text-gray-500 text-sm'>
					{description}
				</p>
			</section>
			{children && children}
		</section>
	)
}

export default PageHeader