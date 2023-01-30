import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    AUTH_USER,
    CHECK_USERNAME,
    CHECK_NICKNAME,
    SAVE_USER_PROFILE
} from '../_actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, data: action.payload }
        case REGISTER_USER:
            return { ...state, data: action.payload }
        case LOGOUT_USER:
            return { ...state, data: action.payload }
        case AUTH_USER:
            return { ...state, data: action.payload }
        case CHECK_USERNAME:
            return { ...state, data: action.payload }
        case CHECK_NICKNAME:
            return { ...state, data: action.payload }
        case SAVE_USER_PROFILE:
            return { ...state, data: action.payload }
        default:
            return state
    }
}