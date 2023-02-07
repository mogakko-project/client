import React, { useState, useEffect } from 'react'
import Auth from '../../hoc/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { List, ListItem, ListItemText, ListItemButton, Divider, Chip, IconButton, Link, Typography, Button } from '@mui/material';
import GroupMembers from './Sections/GroupMembers'
import GroupMeeting from './Sections/GroupMeeting'
import GroupManaging from './Sections/GroupManaging'
import GroupPosts from './Sections/GroupPosts'

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
	const navigate = useNavigate()
    let { groupId } = useParams()

    const user = useSelector(state => state.user.data)
    const groupMembers = useSelector(state => state.groupMembers.data)

	return (
		<TotalWrap>
            <Layout>
                {groupMembers && user && groupMembers.some((member) => member.isMaster && member.memberId === user.userId) &&
                    <GroupManaging groupId={groupId}/>
                }
                <Typography variant='h4' >그룹</Typography>
                <GroupMembers groupId={groupId}/>
                <GroupMeeting groupId={groupId}/>
                <GroupPosts groupId={groupId}/>
            </Layout>
		</TotalWrap>
	)
}

export default Auth(GroupDetailPage, true)