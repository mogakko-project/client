import axios from 'axios'
import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    AUTH_USER,
    CHECK_USERNAME,
    CHECK_NICKNAME,
    SAVE_USER_PROFILE
} from './types'

export function loginUser(dataToSubmit) {
    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {
    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function logoutUser() {
    const request = axios.post('/api/users/logout')
        .then(response => response.data)

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function auth() {
    const request = axios.get('/api/users/auth')
        .then(response => response.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}

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