import {
    GET_GROUP_MEMBERS
} from '../_actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case GET_GROUP_MEMBERS:
            return { ...state, data: action.payload }
        default:
            return state
    }
}