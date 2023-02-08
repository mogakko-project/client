import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { Typography, Button, Avatar, Modal, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getPostIdOfGroup, setGroupStatus } from '../../../_actions/group_action';
import { getApplicantsOfGroup, acceptApplicantOfGroup } from '../../../_actions/group_applicants_action';

const Buttons = styled.div`
    display: flex;
    margin-left: auto;
    margin-bottom: 50px;
`

const Applicant = styled.div`
    display: flex;
    align-items: center;
    width: 400px;
`

const UserWrap = styled.div`
    display: flex;
    cursor: pointer;
`

const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function GroupManaging({ groupId, status, setStatus }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const [open, setOpen] = useState(false)
    const [applicants, setApplicants] = useState([])


    const getApplicants = async () => {
        try {
            const res = await dispatch(getApplicantsOfGroup(groupId))
            setApplicants(res.payload)
        } catch (e) {
            console.log(e)
        }
    }

    const handleOpen = () => {
        getApplicants()
        setOpen(true)
    }
    const handleClose = () => setOpen(false);

    const changeGroupStatusHandler = async (groupStatus) => {
        let body = {
            groupStatus
        }
        try {
            const res = await dispatch(setGroupStatus(body, groupId))
            setStatus(res.payload.groupStatus)
            alert('모집 마감하였습니다.')
            // location.reload()
        } catch (e) {
			alert(e.response.data.message)
        }
    }

    const acceptHandler = async (userId, accept) => {
        try {
            let body = {
                accept
            }
            await dispatch(acceptApplicantOfGroup(body, groupId, userId))
            getApplicants()
            if (accept === true) {
                alert('승인하였습니다.')
            }
            else {
                alert('거절하였습니다.')
            }
        } catch (e) {
            console.log(e)
        }
    }

    const recruitHandler = async () => {
        try {
            const res = await dispatch(getPostIdOfGroup(groupId))
            alert('추가 모집하기 위해 게시글을 수정해주세요.')
            navigate('/posts/edit/' + res.payload.postId)
        } catch (e) {
            console.log(e)
        }
    }

    const postCheckHandler = async () => {
        try {
            const res = await dispatch(getPostIdOfGroup(groupId))
            navigate('/posts/detail/' + res.payload.postId)
        } catch (e) {
            console.log(e)
        }
    }

  return (
    <Buttons>
        <Button variant="contained" style={{backgroundColor:'#C5C0C0', marginRight: '5px' }} onClick={postCheckHandler} >게시글 확인</Button>
        {status === 'RECRUIT' &&
            <Button variant="contained" style={{backgroundColor:'#C5C0C0'}} onClick={() => changeGroupStatusHandler('END_RECRUIT')} >모집 마감</Button>
        }
        {status === 'END_RECRUIT' &&
            <Button variant="contained" style={{backgroundColor:'#C5C0C0'}} onClick={recruitHandler} >추가 모집</Button>
        }
        {status !== 'END_GROUP' && 
            <>
                <Button variant="contained" style={{backgroundColor:'#C5C0C0', marginLeft: '5px' }} onClick={() => changeGroupStatusHandler('END_GROUP')} >모임 종료</Button>
                <Button variant="contained" style={{backgroundColor:'#C5C0C0', marginLeft: '5px' }} onClick={handleOpen} >그룹 신청자</Button>
            </>
        }
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }} >
                    신청자 목록
                </Typography>
                {applicants.length === 0  && '신청자가 아직 없습니다.'}
                {applicants.map((elem, index) => (
                    <Applicant key={index}>
                        <UserWrap onClick={() => navigate('/profile/' + elem.userId)} >
                            <Avatar sx={{ width: 24, height: 24, mr: 1 }}/>
                            <Typography>{elem.nickname}</Typography>
                        </UserWrap>
                        <Button variant="contained" style={{backgroundColor:'#777777', marginLeft: 'auto' }} onClick={() => acceptHandler(elem.userId, true)} >승인</Button>
                        <Button variant="contained" style={{backgroundColor:'#C5C0C0', marginLeft: '10px'}} onClick={() => acceptHandler(elem.userId, false)} >거절</Button>
                    </Applicant>
                ))}
            </Box>
          </Modal>
    </Buttons>
  )
}
