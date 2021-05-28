import React from 'react'
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import ruLocale from "date-fns/locale/ru"
import './Time.scss'

const Time: React.FC<Props> = ({ date, className }) => {
   return <span className={`time ${className}`}>
      {formatDistanceToNow(new Date(2021, 4, 14, 7), {addSuffix: true, locale: ruLocale})}
   </span>
}

export default Time


// Type
type Props = {
   date: number | undefined | Date
   className?: string
}