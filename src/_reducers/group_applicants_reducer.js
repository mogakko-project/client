import {
    APPLY_FOR_ADMISSION,
    GET_APPLICANTS_OF_GROUP,
    ACCEPT_APPLICANT_OF_GROUP
} from '../_actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case APPLY_FOR_ADMISSION:
            return { ...state, data: action.payload }
        case GET_APPLICANTS_OF_GROUP:
            return { ...state, data: action.payload }
        case ACCEPT_APPLICANT_OF_GROUP:
            return { ...state, data: action.payload }
        default:
            return state
    }
}