import {
    ADD_POST,
    UPDATE_POST,
    GET_POST,
    GET_POST_OF_USER,
    GET_POST_OF_TYPE,
} from '../_actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case ADD_POST:
            return { ...state, data: action.payload }
        case UPDATE_POST:
            return { ...state, data: action.payload }
        case GET_POST:
            return { ...state, data: action.payload }
        case GET_POST_OF_USER:
            return { ...state, data: action.payload }
        case GET_POST_OF_TYPE:
            return { ...state, data: action.payload }
        default:
            return state
    }
}