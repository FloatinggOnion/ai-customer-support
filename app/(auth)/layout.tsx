import React from 'react'

// This tells Next.js not to use the root layout
export const dynamic = 'force-static'

type Props = {
    children: React.ReactNode
}

const layout = (props: Props) => {
  return (
    <html>
        <body>
            {props.children}
        </body>
    </html>
  )
}

export default layout