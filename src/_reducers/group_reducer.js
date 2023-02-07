import {
    GET_GROUP_LIST_OF_USER,
    RELEASE_GROUP_MEMBER,
    GET_GROUP_STATUS,
    SET_GROUP_STATUS,
    GET_POSTID_OF_GROUP
} from '../_actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case GET_GROUP_LIST_OF_USER:
            return { ...state, data: action.payload }
        case RELEASE_GROUP_MEMBER:
            return { ...state, data: action.payload }
        case GET_GROUP_STATUS:
            return { ...state, data: action.payload }
        case SET_GROUP_STATUS:
            return { ...state, data: action.payload }
        case GET_POSTID_OF_GROUP:
            return { ...state, data: action.payload }
        default:
            return state
    }
}