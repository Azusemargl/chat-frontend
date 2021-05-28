import React from 'react'
import EmptyImage from '../../assets/img/empty.svg'
import './Empty.scss'

const Empty: React.FC<Props> = ({ text }) => {
   return (
      <div className="empty">
         <img src={EmptyImage} alt={text} />
         <p>{text}</p>
      </div>
   )
}

export default Empty


// Types
type Props = {
   text: string
}