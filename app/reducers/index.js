import { combineReducers } from 'redux'
import MessagesReducer from './messages'

const rootReducer = combineReducers({
  messages: MessagesReducer
})

export default rootReducer
