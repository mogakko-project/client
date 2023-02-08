import {
    ADD_EVALUATION,
    GET_EVALUATION,
    DELETE_EVALUATION,
    UPDATE_EVALUATION
} from '../_actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case ADD_EVALUATION:
            return { ...state, data: action.payload }
        case GET_EVALUATION:
            return { ...state, data: action.payload }
        case DELETE_EVALUATION:
            return { ...state, data: action.payload }
        case UPDATE_EVALUATION:
            return { ...state, data: action.payload }
        default:
            return state
    }
}