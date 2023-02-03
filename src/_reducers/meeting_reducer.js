import {
    CREATE_GROUP_MEETING,
    GET_GROUP_MEETING_LIST,
    DELETE_GROUP_MEETING,
    SET_MEETING_ATTENDANCE
} from '../_actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case CREATE_GROUP_MEETING:
            return { ...state, data: action.payload }
        case GET_GROUP_MEETING_LIST:
            return { ...state, data: action.payload }
        case DELETE_GROUP_MEETING:
            return { ...state, data: action.payload }
        case SET_MEETING_ATTENDANCE:
            return { ...state, data: action.payload }
        default:
            return state
    }
}