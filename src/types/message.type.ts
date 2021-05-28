import { Rooms } from "./room.type"
import { Users } from "./user.type"

export type Messages = {
   _id?: number
   message: string
   audio?: string
   attachments: Array<Attachments>
   date: number | Date
   user: Users
   room?: Rooms
   read?: boolean
   isTyping?: boolean
   isReaded?: boolean
   isMe?: boolean
}

type Attachments = {
   url: string
   name: string
}