import axios from 'axios'
import {
    ADD_COMMENT,
    GET_COMMENTS_OF_POST,
    DELETE_COMMENT
} from './types'

export function addComment(dataToSubmit) {
    const request = axios.post('/api/comments', dataToSubmit)
        .then(response => response.data)

    return {
        type: ADD_COMMENT,
        payload: request
    }
}

export function getCommentsOfPost(postId) {
    const request = axios.get('/api/posts/' + postId + '/comments')
        .then(response => response.data)

    return {
        type: GET_COMMENTS_OF_POST,
        payload: request
    }
}

export function deleteComment(commentId) {
    const request = axios.delete('/api/comments/' + commentId)
        .then(response => response.data)

    return {
        type: DELETE_COMMENT,
        payload: request
    }
}