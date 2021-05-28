import React from 'react'
import { Link } from 'react-router-dom'
import { Message, Status, Editor, Avatar } from '..'
import { Messages as MessageType } from '../../types/message.type'
import { Users } from '../../types/user.type'
import Background from '../../assets/img/background.jpg'
import './Messages.scss'

const MessageHeader: React.FC<Props> = ({ items, ownerId }) => {
   const interlocutors = items.filter(item => item.user._id !== ownerId)
   const interlocutor = interlocutors.length === 1 ? interlocutors[0] : null

   return (
      <div className="messages__header">
         <Status seen={interlocutor?.user.last_seen} />
         <div className="messages__header-interlocutor">
            <Link className="messages__header-link" to={`/im/user/${interlocutor?.user._id}`}>
               <Avatar user={interlocutor?.user} />
               <h4 className="messages__header-name">{interlocutor?.user.name}</h4>
            </Link>
         </div>
         <div className="messages__header-settings">
            <span></span>
            <span></span>
            <span></span>
         </div>
      </div>
   )
}

export const Messages: React.FC<Props> = ({ items, ownerId }) => {
   return (
      <div className="messages" style={{backgroundImage: `url(${Background})`}}>
         <MessageHeader items={items} ownerId={ownerId} />
         <div>
            <div className="messages__content">
               {items.map(item => {
                  return <Message
                     key={item._id}
                     user={item.user}
                     date={item.date}
                     message={item.message}
                     audio={item.audio}
                     attachments={item.attachments}
                     isTyping={item.isTyping}
                     isReaded={item.isReaded}
                     isMe={item.user._id === `${ownerId}`}
                  />
               })}
            </div>
            <Editor />
         </div>
      </div>
   )
}

export default Messages

// Props
type Props = {
   items: Array<MessageType>
   ownerId?: string | null
}
type Message = {
   user: Users
   date: number | Date
   message: string
   attachments: string
}