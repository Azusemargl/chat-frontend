import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import classnames from 'classnames'
import { Avatar, Time } from '..'
import readed from '../../assets/img/readed.svg'
import { Users } from '../../types/user.type'
import './DialogItem.scss'

const DialogItem: React.FC<Props> = ({ id, user, message, date, isChecked, count }) => {
   const dialogUrl = useHistory()

   const currentDialog = dialogUrl.location.pathname.split('/')[2]

   return (
      <Link className={classnames("dialog", {"active": currentDialog === id})} to={`/im/${id}`}>
         <div className="dialog__avatar">
            <Avatar user={user} />
            {!user?.last_seen &&
               <span className="dialog__online"></span>
            }
         </div>
         <div className="dialog__content">
            <div className="dialog__header">
               <h4 className="dialog__name">{user?.name}</h4>
               <Time date={date} />
            </div>
            <div className="dialog__footer">
               <p className="dialog__text">{message}</p>
               {isChecked
                  ? <img className="dialog__readed" src={readed} alt="readed"/>
                  : <span className="dialog__count">{count}</span>
               }
            </div>
         </div>
      </Link>
   )
}

export default DialogItem

// Type
type Props = {
   id: string
   user: Users
   message: string
   date: Date | undefined
   isChecked: boolean
   count: number
}