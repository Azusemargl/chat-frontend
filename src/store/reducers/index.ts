import { combineReducers } from 'redux'
import user from './User'
import dialogs from './Dialogs'
import messages from './Messages'

export default combineReducers({
   user,
   dialogs,
   messages,
})