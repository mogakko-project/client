import axios from 'axios'
import {
    GET_GROUP_MEMBERS
} from './types'

export function getGroupMembers(groupId) {
    const request = axios.get('/api/groups/' + groupId + '/members')
        .then(response => response.data)

    return {
        type: GET_GROUP_MEMBERS,
        payload: request
    }
}
