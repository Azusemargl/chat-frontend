import React from 'react'
import './Block.scss'

const Block: React.FC<Props> = ({ children }) => {
   return <div className="block">{children}</div>
}

export default Block

// Type
type Props = {
   children: React.ReactChild
}