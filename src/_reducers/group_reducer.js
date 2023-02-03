import {
    GET_GROUP_MEMBERS,
    GET_GROUP_LIST_OF_USER,
    RELEASE_GROUP_MEMBER,
    GET_GROUP_STATUS,
    SET_GROUP_STATUS,

    APPLY_FOR_ADMISSION
} from '../_actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case GET_GROUP_MEMBERS:
            return { ...state, data: action.payload }
        case GET_GROUP_LIST_OF_USER:
            return { ...state, data: action.payload }
        case RELEASE_GROUP_MEMBER:
            return { ...state, data: action.payload }
        case GET_GROUP_STATUS:
            return { ...state, data: action.payload }
        case SET_GROUP_STATUS:
            return { ...state, data: action.payload }
        case APPLY_FOR_ADMISSION:
            return { ...state, data: action.payload }
        default:
            return state
    }
}