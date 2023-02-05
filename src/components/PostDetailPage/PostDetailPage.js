import React, { useState, useEffect } from 'react'
import Auth from '../../hoc/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { List, ListItem, ListItemText, ListItemButton, Divider, Chip, IconButton, Link, Avatar, Typography, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { getPost } from '../../_actions/post_action'
import { CalendarViewDay } from '@mui/icons-material'
import Comments from './Sections/Comments'
import { applyForAdmission } from '../../_actions/group_applicants_action'
import { calculateDday } from '../../CommonFunction'

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

const Values = styled.div`
    display: flex;

`

const ValuesWraper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
`

const Term = styled.div`
    display: flex;
    margin-top: 10px;
`

const GoBack = styled.div`
    display: flex;
    cursor: pointer;
    width: fit-content;
`

function PostDetailPage() {
    const dispatch = useDispatch()
	const navigate = useNavigate()
    const user = useSelector(state => state.user)
    let { postId } = useParams()

    const [post, setPost] = useState({})
    const [dday, setDday] = useState('')

    const fetchPost = async () => {
        try {
            const res = await dispatch(getPost(postId))
            setPost(res.payload)
            setDday(calculateDday(res.payload.deadline))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchPost()
    }, [])


    const applyHandler = async () => {
        try {
            const res = await dispatch(applyForAdmission(post.groupId, user.data.userId))
            alert('지원하였습니다.')
        } catch (e) {
            alert(e.response.data.message)
        }
        
    }

    const userProfileHandler = () => {
        navigate('/profile/' + post.userId)
    }

  return (
    <TotalWrap>
        <PostWrap>
            <PostHeader>
                <GoBack onClick={() => navigate('/posts/' + post.type)} >
                    <ArrowBackIosNewIcon fontSize="small" sx={{ color: '#A59A9A' }} />
                    <Typography color='#A59A9A' >{post.type === 'PROJECT' ? '프로젝트' : '모각코'}</Typography>
                </GoBack>
                <TitleWrap>
                    <Typography variant='h3' >{post.title}</Typography>
                    <Chip label={dday} sx={{ ml: 2 }} />
                </TitleWrap>
                <AdditionalInfo>
                    <Writer onClick={userProfileHandler}>
                        <Avatar sx={{ width: 32, height: 32 }}/>
                        <Typography sx={{ ml: 1 }}>{post.nickname}</Typography>
                    </Writer>
                    <Divider sx={{ml: 2}} orientation='vertical' flexItem />
                    <Typography sx={{ ml: 2 }} color='#A59A9A' >{post.updatedAt?.substring(0, 10)}</Typography>
                </AdditionalInfo>
                <Divider sx={{ my: 3 }}/>
                <ValuesWraper>
                    <Typography color='#A59A9A' fontWeight='600' >직무</Typography>
                    <Values>
                        {post.occupations?.map((elem, index) => 
                            <div key={index}>
                                <Chip label={elem.occupationName} color="primary" sx={{ ml: 1 }} variant="outlined"  />
                            </div>
                        )}
                    </Values>
                </ValuesWraper>
                <ValuesWraper>
                    <Typography color='#A59A9A' fontWeight='600' >언어</Typography>
                    <Values>
                        {post.languages?.map((elem, index) => 
                            <div key={index}>
                                <Chip label={elem.languageName} color="success" sx={{ ml: 1 }} variant="outlined"  />
                            </div>
                        )}
                    </Values>
                </ValuesWraper>
                <ValuesWraper>
                    <Typography color='#A59A9A' fontWeight='600' >지역</Typography>
                    <Values>
                        {post.locations?.map((elem, index) => 
                            <div key={index}>
                                <Chip label={elem.stationName} color="secondary" sx={{ ml: 1 }} variant="outlined"  />
                            </div>
                        )}
                    </Values>
                </ValuesWraper>
                {post.type === 'MOGAKKO' && 
                    <Term>
                        <Typography color='#A59A9A' fontWeight='600' >기간</Typography>
                        <Typography sx={{ ml: 2 }}>{post.term === 'LONG' ? '장기' : '단기'}</Typography>
                    </Term>
                }
                <Divider sx={{ my: 3 }}/>

            </PostHeader>
            <Content>
                <Typography>{post.content}</Typography>
            </Content>
            {user && user.data.userId !== post.userId && 
                <Button variant="contained" style={{backgroundColor:'#777777'}} sx={{ mt: 3, width: 100 }} onClick={applyHandler} >지원하기</Button>
            }
        </PostWrap>
        <Comments postId={postId}/>
    </TotalWrap>
  )
}

export default Auth(PostDetailPage, null)