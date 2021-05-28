import React from 'react'
import { Time } from '..';
import { isEqual } from 'date-fns';
import './Status.scss'

const Status: React.FC<Props> = ({ seen }) => {
   const online = seen ? isEqual(new Date, seen) : null

   return (
      <div className="status_block">
         {online ? (
            <>
               <span className="status status--online"></span>
               <p className="status__text">Онлайн</p>
            </>
            ) : (
            <>
               <span className="status status--offline"></span>
               <p className="status__text">Был в сети <Time className="status__text" date={new Date()} /></p>
            </>
         )}
      </div>
   )
}

export default Status

// Type
type Props = {
   seen?: Date | number
}