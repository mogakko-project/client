import React, { useState } from 'react'
import { Typography, Button, IconButton, Avatar, Box, Menu, MenuItem, Divider, Modal, TextField } from '@mui/material';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { createGroupMeeting } from '../../../_actions/meeting_action';

const TotalWrap = styled.div`
    display: flex;
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

function MeetingForm({ groupId, getMeetings }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const [open, setOpen] = useState(false)
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [place, setPlace] = useState('')

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const dateChanged = (e) => {
        setDate(e.target.value)
    }

    const timeChanged = (e) => {
        setTime(e.target.value)
    }

    const placeChanged = (e) => {
        setPlace(e.target.value)
    }

    const createHandler = async () => {
        if (!date) {
            return alert('날짜를 입력해주세요')
        }
        if (!time) {
            return alert('시간을 입력해주세요')
        }
        if (!place) {
            return alert('장소를 입력해주세요')
        }
        let body = {
            memberId: user.data.userId,
            date,
            time,
            place
        }
        try {
            const res = await dispatch(createGroupMeeting(body, groupId))
            alert('모임을 생성하였습니다.')
            getMeetings()
            setOpen(false);
        } catch (e) {
			alert(e.response.data.message)
        }
    }

    return (
        <TotalWrap>
            <Button variant="contained" style={{backgroundColor:'#777777'}} onClick={handleOpen} sx={{ ml: 'auto', mt: 1 }}>모임 생성</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    모임 생성
                </Typography>
                <TextField label='날짜' size='small' sx={{mt: 1}} onChange={dateChanged} />
                <TextField label='시간' size='small' sx={{mt: 1}} onChange={timeChanged} />
                <TextField label='장소' size='small' sx={{mt: 1}} onChange={placeChanged} />
                <Buttons>
                    <Button variant="contained" style={{backgroundColor:'#777777'}} onClick={createHandler} >생성</Button>
                    <Button variant="contained" style={{backgroundColor:'#C5C0C0'}} sx={{ ml: 2 }} onClick={handleClose} >취소</Button>
                </Buttons>
            </Box>
          </Modal>
        </TotalWrap>
      );
}

export default MeetingForm