import axios from 'axios'
import {
    GET_POST_OF_TYPE
} from './types'

export function getPostOfType(postType) {
    const request = axios.get('/api/posts/type/' + postType)
        .then(response => response.data)

    return {
        type: GET_POST_OF_TYPE,
        payload: request
    }
}