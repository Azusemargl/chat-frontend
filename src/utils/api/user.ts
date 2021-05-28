import { axios } from '../../core'
import { Users } from '../../types/user.type'

const userAPI = {
   userCreating: (name: string, email: string, password: string) => axios.post<string>('/api/auth/registration', {
      name, email, password
   }).then(res => res.data),

   userLogin: (email: string, password: string) => axios.post<Users>('/api/auth/login', {
      email, password
   }).then(res => res.data),

   me: (token: string) => axios.post<Users>('/api/auth/me', {token}).then(res => res.data)
}

export default userAPI