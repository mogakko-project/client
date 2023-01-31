import {
    CHECK_USERNAME,
    CHECK_NICKNAME,
    SAVE_USER_PROFILE,
    GET_USER_PROFILE
} from '../_actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case CHECK_USERNAME:
            return { ...state, data: action.payload }
        case CHECK_NICKNAME:
            return { ...state, data: action.payload }
        case SAVE_USER_PROFILE:
            return { ...state, data: action.payload }
        case GET_USER_PROFILE:
            return { ...state, data: action.payload }
        default:
            return state
    }
}