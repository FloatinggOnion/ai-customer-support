import React from 'react'

import { SignIn } from '@clerk/nextjs'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='flex justify-center p-5'>
        <SignIn />
    </div>
  )
}

export default page