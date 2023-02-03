import { combineReducers } from 'redux'
import user from './user_reducer'
import profile from './profile_reducer'
import post from './post_reducer'
import comment from './comment_reducer'
import group from './group_reducer'
import meeting from './meeting_reducer'

const rootReducer = combineReducers({
    user,
    profile,
    post,
    comment,
    group,
    meeting
})

export default rootReducer