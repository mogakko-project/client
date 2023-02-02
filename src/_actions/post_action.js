import axios from 'axios'
import {
    ADD_POST,
    GET_POST_OF_TYPE,
    GET_POST
} from './types'

export function addPost(dataToSubmit) {
    const request = axios.post('/api/posts', dataToSubmit)
        .then(response => response.data)

    return {
        type: ADD_POST,
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

export function getPost(postId) {
    const request = axios.get('/api/posts/' + postId)
        .then(response => response.data)

    return {
        type: GET_POST,
        payload: request
    }
}
