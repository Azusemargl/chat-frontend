import { Rooms } from '../../../types/room.type'
import { dialogsAPI } from '../../../utils/api'
import { BaseThunk, InferAction } from '../../store'

const initialState = {
   rooms: [] as Array<Rooms>
}

const dialogReducer = (state = initialState, action: Action): InitialState => {
   switch (action.type) {
      case 'DIALOGS:SET_DIALOGS':
         return {...state, rooms: action.payload}
   
      default:
         return state
   }
}

const actions = {
   setDialogs: (dialogs: Array<Rooms>) => ({
      type: 'DIALOGS:SET_DIALOGS',
      payload: dialogs
   })
}

export const fetchDialogs = (): Thunk =>  async (dispatch) => {
   const res = await dialogsAPI.getAllDialogs()
   try {
      dispatch(actions.setDialogs(res))
   } catch(e) {
      console.error(e)
   }
}

export default dialogReducer

// Types
type InitialState = typeof initialState
type Action = InferAction<typeof actions>
type Thunk = BaseThunk<Action>

