import axios from 'axios'
import {
    ADD_POST,
    UPDATE_POST,
    GET_POST,
    GET_POST_OF_USER,
    GET_POST_OF_TYPE,
    GET_STUDY_POST_OF_GROUP
} from './types'

export function addPost(dataToSubmit) {
    const request = axios.post('/api/posts', dataToSubmit)
        .then(response => response.data)

    return {
        type: ADD_POST,
        payload: request
    }
}

export function updatePost(dataToSubmit, postId) {
    const request = axios.post('/api/posts/' + postId, dataToSubmit)
        .then(response => response.data)

    return {
        type: UPDATE_POST,
        payload: request
    }
}

export function getPost(postId) {
    const request = axios.get('/api/posts/' + postId)
        .then(response => response.data)

    return {
        type: GET_POST,
        payload: request
    }
}

export function getPostOfUser(userId) {
    const request = axios.get('/api/users/' + userId + '/posts')
        .then(response => response.data)

    return {
        type: GET_POST_OF_USER,
        payload: request
    }
}

export function getPostOfType(postType) {
    const request = axios.get('/api/posts/type/' + postType)
        .then(response => response.data)

    return {
        type: GET_POST_OF_TYPE,
        payload: request
    }
}

export function getStudyPostsOfGroup(groupId) {
    const request = axios.get('/api/groups/' + groupId + '/posts/type/study')
        .then(response => response.data)

    return {
        type: GET_STUDY_POST_OF_GROUP,
        payload: request
    }
}