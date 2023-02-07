import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { List, ListItem, ListItemText, ListItemButton, Divider, Chip, IconButton, Link, Typography, Button, Avatar } from '@mui/material';
import { getPostOfType } from '../../../_actions/post_action'

const TotalWrap = styled.div`

`

const StudyPost = styled.div`
    display: flex;
    align-items: center;
    width: 800px;
    height: 60px;
    border-radius: 10px;
    background: #e9e3e1;
    margin-top: 10px;
    padding: 0px 10px;
`

const UserWrap = styled.div`
    display: flex;
`

function GroupPosts({ groupId }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [studyPosts, setStudyPosts] = useState([])


    const fetchStudyPosts = async () => {
        try {
            const res = await dispatch(getPostOfType('STUDY'))
            setStudyPosts(res.payload)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchStudyPosts()
    }, [])
    

  return (
    <TotalWrap>
        <Button variant="contained" style={{backgroundColor:'#777777', marginLeft: 'auto' }} onClick={() => navigate('/groups/' + groupId + '/posts/study/new')} >글 작성</Button>
        {studyPosts && studyPosts.map((elem, index) => (
            <StudyPost key={index} onClick={() => navigate('/posts/study/detail/' + elem.postId)} >
                <UserWrap >
                    <Avatar sx={{ width: 24, height: 24, mr: 1 }}/>
                    <Typography>{elem.nickname}</Typography>
                </UserWrap>
                <Divider orientation="vertical" variant="middle" sx={{ mx: 2 }} />
                <Typography>{elem.title}</Typography>
                <Typography sx={{ ml: 'auto', color: 'grey' }} >{elem.updatedAt?.substring(0, 10)}</Typography>
            </StudyPost>
        ))}
    </TotalWrap>
  )
}

export default GroupPosts