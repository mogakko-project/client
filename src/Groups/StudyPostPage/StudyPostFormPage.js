import React, { useState } from 'react'
import Auth from '../../hoc/auth'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Typography, Button, TextField } from '@mui/material';
import { addPost } from '../../_actions/post_action'

const TotalWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Layout = styled.div`
    width: 1000px;
    padding-top: 50px;
`

const Buttons = styled.div`
    display: flex;
    margin-top: 10px;
`

function StudyPostFormPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    let { groupId } = useParams()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')


    const titleChanged = (e) => {
        setTitle(e.target.value)
    }

    const contentChanged = (e) => {
        setContent(e.target.value)
    }

    const submitHandler = async () => {
        if (!title) {
            return alert('제목을 입력해주세요.')
        }
        if (!content) {
            return alert('내용을 입력해주세요.')
        }
        let body = {
            userId: user.data.userId,
            title,
            content,
            groupId,
            type: 'STUDY'
        }
        try {
            await dispatch(addPost(body))
            alert('등록되었습니다.')
            navigate('/groups/detail/' + groupId)
        } catch (e) {
            console.log(e)
        }
    }

  return (
    <TotalWrap>
        <Layout>
            <Typography variant='h4' >학습한 내용을 작성해주세요.</Typography>
            <TextField fullWidth label='제목' onChange={titleChanged} sx={{ mt: '30px' }}></TextField>
            <TextField fullWidth label='내용' multiline rows={10} onChange={contentChanged} sx={{ mt: '20px' }}></TextField>
            <Buttons>
                <Button variant="contained" style={{backgroundColor:'#C5C0C0'}} sx={{ ml: 'auto' }} onClick={() => navigate(-1)}>취소</Button>
                <Button variant="contained" style={{backgroundColor:'#777777'}} sx={{ ml: 1 }} onClick={submitHandler}>글 등록</Button>
            </Buttons>
        </Layout>
    </TotalWrap>
  )
}

export default Auth(StudyPostFormPage, true)