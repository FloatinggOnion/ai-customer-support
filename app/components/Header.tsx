import React from 'react'

import { UserButton } from '@clerk/nextjs'
import Sidebar from './Sidebar'

type Props = {}

const Header = (props: Props) => {
  return (
    <div className='flex justify-between py-4 px-4 md:px-8 shadow-md'>
        <h2 className='text-2xl font-bold'>ClarityAI</h2>
        <div className='flex gap-4 items-center'>
            <UserButton />
            <Sidebar />
        </div>
    </div>
  )
}

export default Header