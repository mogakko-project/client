import axios from 'axios'
import {
    CREATE_GROUP_MEETING,
    GET_GROUP_MEETING_LIST,
    DELETE_GROUP_MEETING,
    SET_MEETING_ATTENDANCE
} from './types'

export function createGroupMeeting(dataToSubmit, groupId) {
    const request = axios.post('/api/groups/' + groupId + '/meetings', dataToSubmit)
        .then(response => response.data)

    return {
        type: CREATE_GROUP_MEETING,
        payload: request
    }
}

export function getGroupMeetingList(groupId) {
    const request = axios.get('/api/groups/' + groupId + '/meetings')
        .then(response => response.data)

    return {
        type: GET_GROUP_MEETING_LIST,
        payload: request
    }
}

export function deleteGroupMeeting(groupId, meetingId) {
    const request = axios.delete('/api/groups/' + groupId + '/meetings/' + meetingId)
        .then(response => response.data)

    return {
        type: DELETE_GROUP_MEETING,
        payload: request
    }
}

export function setMeetingAttendance(dataToSubmit, groupId, meetingId, memberId) {
    const request = axios.post('/api/groups/' + groupId + '/meetings/' + meetingId + '/members/' + memberId, dataToSubmit)
        .then(response => response.data)

    return {
        type: SET_MEETING_ATTENDANCE,
        payload: request
    }
}