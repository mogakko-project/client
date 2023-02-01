import {
    ADD_COMMENT,
    GET_COMMENTS_OF_POST,
    DELETE_COMMENT
} from '../_actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case ADD_COMMENT:
            return { ...state, data: action.payload }
        case GET_COMMENTS_OF_POST:
            return { ...state, data: action.payload }
        case DELETE_COMMENT:
            return { ...state, data: action.payload }
        default:
            return state
    }
}