import axios from 'axios'
import {
    ADD_EVALUATION,
    GET_EVALUATION,
    DELETE_EVALUATION,
    UPDATE_EVALUATION
} from './types'

export function addEvaluation(dataToSubmit, groupId, userId) {
    const request = axios.post('/api/groups/' + groupId + '/users/' + userId + '/evaluations', dataToSubmit)
        .then(response => response.data)

    return {
        type: ADD_EVALUATION,
        payload: request
    }
}

export function getEvaluation(userId) {
    const request = axios.get('/api/users/'+ userId + '/evaluations')
        .then(response => response.data)

    return {
        type: GET_EVALUATION,
        payload: request
    }
}

export function deleteEvaluation(evaluationId) {
    const request = axios.delete('/api/evaluations/' + evaluationId)
        .then(response => response.data)

    return {
        type: DELETE_EVALUATION,
        payload: request
    }
}

export function updateEvaluation(evaluationId) {
    const request = axios.patch('/api/evaluations/' + evaluationId)
        .then(response => response.data)

    return {
        type: UPDATE_EVALUATION,
        payload: request
    }
}