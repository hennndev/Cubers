import React from 'react'

type PropsTypes = {
    children: React.ReactNode
}

const GroupLayout = ({children}: PropsTypes) => {
    return (
        <main>
            {children}
        </main>
    )
}

export default GroupLayout