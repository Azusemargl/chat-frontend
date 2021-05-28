import React from 'react'
import { DialogItem, Empty } from '..'
import { orderBy } from 'lodash'

import { Rooms } from '../../types/room.type'
import { SearchOutlined, ContactsOutlined, EditOutlined } from '@ant-design/icons'
import './Dialogs.scss'

const Dialogs: React.FC<Props> = ({ rooms, ownerId, value, setValue }) => {
   return (
      <div className="dialogs">
         <div className="dialogs__header">
            <div className="dialogs__header-users">
               <ContactsOutlined />
               <p>Список диалогов</p>
            </div>
            <div className="dialogs__header-edit">
               <EditOutlined />
            </div>
         </div>
         <div className="dialogs__content">
            <div className="dialogs__search">
               <input
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  type="text"
                  placeholder="Поиск среди контактов"
               />
               <SearchOutlined className="dialogs__search-button" />
            </div>
            {rooms.length > 0
               ? orderBy(rooms, ["created_at"], ["desc"]).map(room => (
                  <DialogItem
                     key={room._id}
                     id={room._id}
                     message={room.message}
                     user={room.users.find(user => `${user._id}` !== `${ownerId}`) || room.users[1]}
                     date={room.updatedAt}
                     count={0}
                     isChecked={false}
                  />
               ))
               : <Empty text="Ничего не найдено" />
            }
         </div>
      </div>
   )
}

export default Dialogs

// Types
type Props = {
   rooms: Array<Rooms>
   ownerId?: string | null
   value: string
   setValue: (value: string) => void
}