import { combineReducers } from 'redux'
import user from './user_reducer'
import profile from './profile_reducer'

const rootReducer = combineReducers({
    user,
    profile
})

export default rootReducer