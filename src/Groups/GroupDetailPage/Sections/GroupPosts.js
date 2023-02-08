import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { List, ListItem, ListItemText, ListItemButton, Divider, Chip, IconButton, Link, Typography, Button, Avatar } from '@mui/material';
import { getPostOfType, getStudyPostsOfGroup } from '../../../_actions/post_action'

const TotalWrap = styled.div`
    margin-top: 50px;
`

const TopWrap = styled.div`
    display: flex;
    align-items: center;
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
    cursor: pointer;
`

const UserWrap = styled.div`
    display: flex;
`

function GroupPosts({ groupId, status }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [studyPosts, setStudyPosts] = useState([])


    const fetchStudyPosts = async () => {
        try {
            const res = await dispatch(getStudyPostsOfGroup(groupId))
            setStudyPosts(res.payload)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchStudyPosts()
    }, [])
    
    if (studyPosts.length !== 0) return (
    <TotalWrap>
        <TopWrap>
            <Typography variant='h4'>그룹 게시글</Typography>
            {status !== 'END_GROUP' &&
                <Button variant="contained" style={{backgroundColor:'#777777', marginLeft: '20px' }} onClick={() => navigate('/groups/' + groupId + '/posts/study/new')} >글 작성</Button>
            }
        </TopWrap>
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
  else return (
    <TotalWrap style={{ 'marginTop': '30px'}}>
        <TopWrap>
            <Typography variant='h4'>그룹 게시글</Typography>
            {status !== 'END_GROUP' &&
                <Button variant="contained" style={{backgroundColor:'#777777', marginLeft: '20px' }} onClick={() => navigate('/groups/' + groupId + '/posts/study/new')} >글 작성</Button>
            }
        </TopWrap>
        <Typography>아직 글이 없습니다.</Typography>
    </TotalWrap>
  )
}

export default GroupPosts