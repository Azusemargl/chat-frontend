import { axios } from '../../core'

const dialogsAPI = {
   getAllDialogs: () => axios.get('api/room').then(res => res.data)
}

export default dialogsAPI
