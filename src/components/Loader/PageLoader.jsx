import React from 'react'
import { PulseLoader } from 'react-spinners'

const PageLoader = () => {
    return (
        <div className='bg-black col h-screen'>
            <PulseLoader size={100} color='rgba(30, 215, 96, 1)' />
        </div>
    )
}

export default PageLoader