import {
    ADD_POST,
    GET_POST_OF_TYPE,
    GET_POST
} from '../_actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case ADD_POST:
            return { ...state, data: action.payload }
        case GET_POST_OF_TYPE:
            return { ...state, data: action.payload }
        case GET_POST:
            return { ...state, data: action.payload }
        default:
            return state
    }
}