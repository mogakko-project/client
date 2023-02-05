import axios from 'axios'
import {
    APPLY_FOR_ADMISSION,
    GET_APPLICANTS_OF_GROUP,
    ACCEPT_APPLICANT_OF_GROUP
} from './types'

// admission
export function applyForAdmission(groupId, userId) {
    const request = axios.post('/api/groups/' + groupId + '/application/users/' + userId)
        .then(response => response.data)

    return {
        type: APPLY_FOR_ADMISSION,
        payload: request
    }
}

export function getApplicantsOfGroup(groupId) {
    const request = axios.get('/api/groups/' + groupId + '/applicants')
        .then(response => response.data)

    return {
        type: GET_APPLICANTS_OF_GROUP,
        payload: request
    }
}

export function acceptApplicantOfGroup(dataToSubmit, groupId, userId) {
    const request = axios.post('/api/groups/' + groupId + '/applicants/users/' + userId, dataToSubmit)
        .then(response => response.data)

    return {
        type: ACCEPT_APPLICANT_OF_GROUP,
        payload: request
    }
}
