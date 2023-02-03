import React, { useState, useEffect } from 'react'
import Auth from '../../hoc/auth'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { List, ListItem, ListItemText, ListItemButton, Divider, Chip, IconButton, Link, Typography, Button } from '@mui/material';
import GroupMembers from './Sections/GroupMembers'
import GroupMeeting from './Sections/GroupMeeting'

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
    padding-top: 100px;
`

const Posts = styled.div`

`

function GroupDetailPage() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
    let { groupId } = useParams()
    
	const [posts, setPosts] = useState([])
    
	useEffect(() => {
        
	}, [])
    
	return (
		<TotalWrap>
            <Layout>
                <Typography variant='h4' >그룹</Typography>
                <GroupMembers groupId={groupId}/>
                <GroupMeeting groupId={groupId}/>
                <Posts>
                    
                </Posts>
            </Layout>
		</TotalWrap>
	)
}

export default Auth(GroupDetailPage, true)