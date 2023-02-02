import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { getCommentsOfPost, addComment } from '../../../_actions/comment_action'
import { useNavigate } from 'react-router-dom'
import { List, ListItem, ListItemText, ListItemButton, Divider, Chip, IconButton, Link, Avatar, Typography, Button, TextField } from '@mui/material';


const TotalWrap = styled.div`
    margin-top: 100px;
    margin-bottom: 100px;
    width: 1000px;
`

const Writer = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
    cursor: pointer;
`

const WriterInfo = styled.div`
    margin-left: 10px;
`

const WriteComment = styled.div`
    display: flex;
`

function Comments({ postId }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const [comments, setComments] = useState([])
    const [input, setInput] = useState('')

    const fetchComments = async () => {
        try {
            const res = await dispatch(getCommentsOfPost(postId))
            setComments(res.payload)
        } catch (e) {
            console.log(e)
        }
        
    }

    useEffect(() => {
        fetchComments()
    }, [])


    const inputChanged = (e) => {
        setInput(e.target.value)
    }
    
    const saveCommentHandler = async () => {
        if (input === '') {
            alert('내용을 입력해주세요.')
            return
        }
        let body = {
            postId,
            userId: user.data.userId,
            content: input
        }
        try {
            await dispatch(addComment(body))
            alert('댓글이 저장되었습니다.')
            window.location.reload();
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    
    const userProfileHandler = (userId) => {
        navigate('/profile/' + userId)
    }

  return (
    <TotalWrap>
        <Typography variant='h5' sx={{ mb: 1 }} fontWeight='600' >{comments.length}개의 댓글</Typography>
        {comments && comments.map((elem, index) => 
            <div key={index}>
                <Divider sx={{ mb: 2 }}/>
                <Writer onClick={() => userProfileHandler(elem.userId)} >
                    <Avatar sx={{ width: 32, height: 32 }} />
                    <WriterInfo>
                        <Typography>{elem.nickname}</Typography>
                        <Typography color='#A59A9A' fontSize={12} >{elem.updatedAt?.substring(0, 19).replace('T', ' ')}</Typography>
                    </WriterInfo>
                </Writer>
                <Typography sx={{ my: 3 }} >{elem.content}</Typography>
            </div>
        )}
        <WriteComment>
            <TextField fullWidth multiline rows={4} onChange={inputChanged}></TextField>
            <Button variant="contained" style={{backgroundColor:'#777777'}} sx={{ width: '150px', ml: 2 }} onClick={saveCommentHandler}>입력</Button>
        </WriteComment>
    </TotalWrap>
  )
}

export default Comments