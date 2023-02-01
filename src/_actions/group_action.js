import axios from 'axios'
import {
    APPLY_FOR_ADMISSION
} from './types'

export function applyForAdmission({ groupId, userId }) {
    const request = axios.post('/api/groups/' + groupId + '/application/users/' + userId)
        .then(response => response.data)

    return {
        type: APPLY_FOR_ADMISSION,
        payload: request
    }
}