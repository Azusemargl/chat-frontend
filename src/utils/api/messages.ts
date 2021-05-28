import { axios } from '../../core'
import { Messages } from '../../types/message.type'
import { Users } from '../../types/user.type'

const dialogsAPI = {
   getAllMessages: (id: string) => axios.get<Array<Messages>>(`api/messages/get/?id=${id}`).then(res => res.data),
   setMessage: (message: string, user: string, room: string) => axios.post('api/messages/create', {
      message, user, room
   }).then(res => res.data)
}

export default dialogsAPI