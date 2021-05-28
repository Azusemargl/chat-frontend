import { Users } from "./user.type";

export type Rooms = {
   _id: string
   users: Array<Users>
   key: string
   message: string
   updatedAt: Date | undefined
   isChecked: boolean
}