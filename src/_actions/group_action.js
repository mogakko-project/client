import axios from 'axios'
import {
    GET_GROUP_MEMBERS,
    GET_GROUP_LIST_OF_USER,
    RELEASE_GROUP_MEMBER,
    GET_GROUP_STATUS,
    SET_GROUP_STATUS,

    APPLY_FOR_ADMISSION
} from './types'

// group
export function getGroupMembers(groupId) {
    const request = axios.get('/api/groups/' + groupId + '/members')
        .then(response => response.data)

    return {
        type: GET_GROUP_MEMBERS,
        payload: request
    }
}

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


export function setGroupStatus(dataToSubmit, groupId, userId) {
    const request = axios.post('/api/groups/' + groupId + '/status', dataToSubmit)
        .then(response => response.data)

    return {
        type: SET_GROUP_STATUS,
        payload: request
    }
}



// admission
export function applyForAdmission(groupId, userId) {
    const request = axios.post('/api/groups/' + groupId + '/application/users/' + userId)
        .then(response => response.data)

    return {
        type: APPLY_FOR_ADMISSION,
        payload: request
    }
}