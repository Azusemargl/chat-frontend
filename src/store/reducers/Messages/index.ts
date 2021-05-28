import { Messages } from '../../../types/message.type'
import { messagesAPI } from '../../../utils/api'
import { BaseThunk, InferAction } from '../../store'

const initialState = {
   messages: [] as Array<Messages>,
   isLoading: false
}

const messageReducer = (state = initialState, action: Action): InitialState => {
   switch (action.type) {
      case 'MESSAGES:SET_MESSAGES':
         return {...state, messages: action.payload}

      case 'MESSAGES:SET_LOADING':
         return {...state, isLoading: action.payload}
   
      default:
         return state
   }
}

const actions = {
   setMessages: (dialogs: Array<Messages>) => ({
      type: 'MESSAGES:SET_MESSAGES',
      payload: dialogs
   } as const),
   setMessage: (message: Messages) => ({
      type: 'MESSAGES:SET_MESSAGE',
      payload: message
   } as const),
   setLoading: (bool: boolean) => ({
      type: 'MESSAGES:SET_LOADING',
      payload: bool
   } as const)
}

export const fetchMessages = (id: string): Thunk =>  async (dispatch) => {
   dispatch(actions.setLoading(true))
   const res = await messagesAPI.getAllMessages(id)

   try {
      dispatch(actions.setMessages(res))
      dispatch(actions.setLoading(false))
   } catch(e) {
      console.error(e)
      dispatch(actions.setLoading(false))
   }
}

export const setMessages = (message: string, user: string, room: string): Thunk =>  async (dispatch) => {
   const res = await messagesAPI.setMessage(message, user, room)

   try {
      dispatch(actions.setMessage(res))
   } catch(e) {
      console.error(e)
   }
}

export default messageReducer

// Types
type InitialState = typeof initialState
type Action = InferAction<typeof actions>
type Thunk = BaseThunk<Action>