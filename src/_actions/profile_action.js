import axios from 'axios'
import {
    CHECK_USERNAME,
    CHECK_NICKNAME,
    SAVE_USER_PROFILE,
    GET_USER_PROFILE
} from './types'

export function checkUsername(dataToSubmit) {
    const request = axios.post('/api/users/username-redundancy', dataToSubmit)
        .then(response => response.data)

    return {
        type: CHECK_USERNAME,
        payload: request
    }
}

export function checkNickname(dataToSubmit) {
    const request = axios.post('/api/users/nickname-redundancy', dataToSubmit)
        .then(response => response.data)

    return {
        type: CHECK_NICKNAME,
        payload: request
    }
}

export function saveUserProfile(dataToSubmit, userId) {
    const request = axios.post('/api/users/' + userId, dataToSubmit)
        .then(response => response.data)

    return {
        type: SAVE_USER_PROFILE,
        payload: request
    }
}

export function getUserProfile(userId) {
    const request = axios.get('/api/users/' + userId)
        .then(response => response.data)

    return {
        type: GET_USER_PROFILE,
        payload: request
    }
}