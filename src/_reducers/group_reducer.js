import {
    APPLY_FOR_ADMISSION
} from '../_actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case APPLY_FOR_ADMISSION:
            return { ...state, data: action.payload }
        default:
            return state
    }
}