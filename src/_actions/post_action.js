import axios from 'axios'
import {
    GET_POST_OF_TYPE,
    GET_POST
} from './types'

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
