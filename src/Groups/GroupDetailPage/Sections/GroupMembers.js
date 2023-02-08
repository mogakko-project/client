import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Autocomplete, TextField, Typography, Button, Avatar, Modal, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getGroupMembers } from '../../../_actions/group_members_action';
import GradeIcon from '@mui/icons-material/Grade';
import { addEvaluation } from '../../../_actions/evaluation_action';

const MembersWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    min-width: 800px;
    width: content-fit;
    background: #e9e3e1;
    border-radius: 15px;
    padding: 10px;
    margin-top: 50px;
`

const MemberElem = styled.div`
    display: flex;
    align-items: center;
    background: #d4c7c3;
    min-height: 50px;
    border-radius: 10px;
    margin: 5px;
    padding: 5px 10px;
    cursor: pointer;
`

const Buttons = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: auto;
    padding-top: 10px;
`

const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function GroupMembers({ groupId, status }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const [members, setMembers] = useState([])
    const [open, setOpen] = useState(false)
    const [evaluationContent, setEvaluationContent] = useState('')
    const [selectedMember, setSelectedMember] = useState('')
    
    const handleOpen = (member) => {
        setOpen(true)
        setSelectedMember(member)   
    };
    const handleClose = () => setOpen(false);

    const getMembers = async () => {
        try {
            const res = await dispatch(getGroupMembers(groupId))
            setMembers(res.payload)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getMembers()
    }, [])


    const contentChanged = (e) => {
        setEvaluationContent(e.target.value)
    }

    const memberClickHandler = (memberId) => {
        navigate("/profile/" + memberId)
    }

    const saveHandler = async (memberId) => {
        let body = {
            evaluatingUserId: user.data.userId,
            content: evaluationContent
        }
        try {
            const res = await dispatch(addEvaluation(body, groupId, memberId))
            alert('평가하였습니다.')
            handleClose()
        } catch (e) {
            alert(e.response.data.message)
            handleClose()
        }
    }

  return (
    <MembersWrap>
        {members.map((elem, index) => (
            <div key={index}>
                <MemberElem onClick={() => memberClickHandler(elem.memberId)}>
                    <Avatar sx={{ width: 32, height: 32, mr: 1 }} />
                    {elem.nickname}
                    {elem.isMaster && <GradeIcon />}
                    {status === 'END_GROUP' && user.data?.userId !== elem.memberId && 
                        <Button variant="contained" style={{backgroundColor:'#777777', marginLeft: '10px' }}
                            onClick={(event) => {
                                event.stopPropagation()
                                handleOpen(elem)
                            }} >평가</Button>
                    }
                </MemberElem>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {selectedMember.nickname}님을 평가해주세요.
                        </Typography>
                        <TextField fullWidth size='small' sx={{mt: 1}} onChange={contentChanged} />
                        <Buttons>
                            <Button variant="contained" style={{backgroundColor:'#777777'}} onClick={() => saveHandler(selectedMember.memberId)} >저장</Button>
                            <Button variant="contained" style={{backgroundColor:'#C5C0C0'}} sx={{ ml: 2 }} onClick={handleClose} >취소</Button>
                        </Buttons>
                    </Box>
                </Modal>
            </div>
        ))}
    </MembersWrap>
  )
}
