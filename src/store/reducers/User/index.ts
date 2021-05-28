import { BaseThunk, InferAction } from './../../store'
import { userAPI } from '../../../utils/api'
import { Users } from '../../../types/user.type'
import { delete_cookie } from '../../../utils/helpers/cookies'

const initialState = {
   auth:  false,
   id:    null as string | null,
   token: null as string | null,
   name:  null as string | null,
   email: null as string | null,
   avatar: null as string | null,
   last_seen: null as Date | number | null,
   confirmed: false,
   registrationError: null as string | null,
   loginError: null as string | null
}

const userReducer = (state = initialState, action: Action): InitialState => {
   switch (action.type) {
      case 'SET_USER':
         return { ...state, ...action.payload }
   
      default:
         return state
   }
}

export const actions = {
   setUser: (payload: Users) => ({ type: 'SET_USER', payload } as const),
   logout: () => ({ type: 'SET_USER', payload: {
      auth:  false,
      id:    null,
      token: null,
      name:  null,
      email: null,
      avatar: null,
      last_seen: null,
      confirmed: false,
   }} as const)
}

export const fetchAuth = (token: string): Thunk => async (dispatch) => {
   const res = await userAPI.me(token)
   dispatch(actions.setUser(res))
}

export const fetchRegistration = (name: string, email: string, password: string): Thunk => async (dispatch) => {
   const res = await userAPI.userCreating(name, email, password)
   dispatch(fetchLogin(email, password))
}

export const fetchLogin = (email: string, password: string): Thunk => async (dispatch) => {
   const res = await userAPI.userLogin(email, password)

   if (res.loginError) {
      dispatch(actions.setUser(res))
   } else {
      dispatch(fetchAuth(res.token))
      delete_cookie('token')
      document.cookie = `token=${res.token}`
   }
}

export default userReducer

// Types
export type InitialState = typeof initialState
type Action = InferAction<typeof actions>
type Thunk = BaseThunk<Action>
