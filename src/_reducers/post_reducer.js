import {
    GET_POST_OF_TYPE
} from '../_actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case GET_POST_OF_TYPE:
            return { ...state, data: action.payload }
        default:
            return state
    }
}