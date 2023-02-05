import axios from 'axios'
import {
    GET_GROUP_LIST_OF_USER,
    RELEASE_GROUP_MEMBER,
    GET_GROUP_STATUS,
    SET_GROUP_STATUS
} from './types'

// group
export function getGroupListOfUser(memebrId) {
    const request = axios.get('/api/members/' + memebrId + '/groups')
        .then(response => response.data)

    return {
        type: GET_GROUP_LIST_OF_USER,
        payload: request
    }
}

export function releaseGroupMember(dataToSubmit, groupId, memberId) {
    const request = axios.post('/api/groups/' + groupId + '/release/members/' + memberId, dataToSubmit)
        .then(response => response.data)

    return {
        type: RELEASE_GROUP_MEMBER,
        payload: request
    }
}

export function getGroupStatus(groupId) {
    const request = axios.get('/api/groups/' + groupId + '/status')
        .then(response => response.data)

    return {
        type: GET_GROUP_STATUS,
        payload: request
    }
}

export function setGroupStatus(dataToSubmit, groupId) {
    const request = axios.post('/api/groups/' + groupId + '/status', dataToSubmit)
        .then(response => response.data)

    return {
        type: SET_GROUP_STATUS,
        payload: request
    }
}
