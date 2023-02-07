import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { List, ListItem, ListItemText, ListItemButton, Divider, Chip, IconButton, Link, Typography, Button, Avatar } from '@mui/material';
import { getPostOfType, getPost } from '../../_actions/post_action'
import Comments from '../../components/PostDetailPage/Sections/Comments'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const TotalWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const PostWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 1000px;
    padding-top: 100px;
`

const PostHeader = styled.div`

`

const TitleWrap = styled.div`
    display: flex;
    align-items: center;
`

const AdditionalInfo = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
`

const Writer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`

const Content = styled.div`

`

const GoBack = styled.div`
    display: flex;
    cursor: pointer;
    width: fit-content;
`

function StudyPostDetailPage() {
    const dispatch = useDispatch()
	const navigate = useNavigate()
    let { postId } = useParams()

    const [post, setPost] = useState({})

    const fetchPost = async () => {
        try {
            const res = await dispatch(getPost(postId))
            setPost(res.payload)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchPost()
    }, [])

  return (
    <TotalWrap>
        <PostWrap>
            <PostHeader>
                <GoBack onClick={() => navigate(-1)} >
                    <ArrowBackIosNewIcon fontSize="small" sx={{ color: '#A59A9A' }} />
                    <Typography color='#A59A9A' >그룹</Typography>
                </GoBack>
                <TitleWrap>
                    <Typography variant='h3' >{post.title}</Typography>
                </TitleWrap>
                <AdditionalInfo>
                    <Writer onClick={() => navigate('/profile/' + post.userId)}>
                        <Avatar sx={{ width: 32, height: 32 }}/>
                        <Typography sx={{ ml: 1 }}>{post.nickname}</Typography>
                    </Writer>
                    <Divider sx={{ml: 2}} orientation='vertical' flexItem />
                    <Typography sx={{ ml: 2 }} color='#A59A9A' >{post.updatedAt?.substring(0, 10)}</Typography>
                </AdditionalInfo>
                <Divider sx={{ my: 3 }}/>
            </PostHeader>
            <Content>
                <Typography>{post.content}</Typography>
            </Content>
        </PostWrap>
        <Comments postId={postId}/>
    </TotalWrap>
  )
}

export default StudyPostDetailPage