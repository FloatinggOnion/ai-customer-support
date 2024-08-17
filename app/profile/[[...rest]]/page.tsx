import React from 'react'

import { UserProfile } from '@clerk/nextjs'

type Props = {}

const page = (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <UserProfile path="/profile" />
    </div>
  )
}

export default page