import React, { useState, useEffect } from 'react'
import Auth from '../../hoc/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Typography } from '@mui/material';
import GroupMembers from './Sections/GroupMembers'
import GroupMeeting from './Sections/GroupMeeting'
import GroupManaging from './Sections/GroupManaging'
import GroupPosts from './Sections/GroupPosts'
import { getGroupStatus } from '../../_actions/group_action'

const TotalWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 100px;
`

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1000px;
    padding-top: 50px;
`

function GroupDetailPage() {
	const dispatch = useDispatch()
    let { groupId } = useParams()

    const user = useSelector(state => state.user.data)
    const groupMembers = useSelector(state => state.groupMembers.data)

    const [status, setStatus] = useState('')


    const fetchGroupStatus = async () => {
        try {
            const res = await dispatch(getGroupStatus(groupId))
            setStatus(res.payload.groupStatus)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchGroupStatus()
    }, [])
    
    return (
		<TotalWrap>
            <Layout>
                {groupMembers && user && groupMembers.some((member) => member.isMaster && member.memberId === user.userId) &&
                    <GroupManaging groupId={groupId} status={status} setStatus={setStatus} />
                }
                <Typography variant='h3' >그룹</Typography>
                {status === 'END_GROUP' &&
                    <Typography sx={{ mt: 2 }}>종료된 그룹입니다. 팀원에게 한줄평을 남겨주세요.</Typography>
                }
                <GroupMembers groupId={groupId} status={status}/>
                <GroupMeeting groupId={groupId} status={status}/>
                <GroupPosts groupId={groupId} status={status}/>
            </Layout>
		</TotalWrap>
	)
}

export default Auth(GroupDetailPage, true)