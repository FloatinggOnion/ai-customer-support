import React from 'react'

import { UserProfile } from '@clerk/nextjs'

type Props = {}

const page = (props: Props) => {
  return (
    <UserProfile path="/profile" />
  )
}

export default page