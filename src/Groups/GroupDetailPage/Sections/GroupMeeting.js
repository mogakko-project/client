import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Button, IconButton, Avatar, Box, Menu, MenuItem, Divider} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getGroupMeetingList, setMeetingAttendance } from '../../../_actions/meeting_action';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GradeIcon from '@mui/icons-material/Grade';
import MeetingForm from './MeetingForm';

const TotalWrap = styled.div`
    display: flex;
    flex-direction: column;
`

const MeetingWrap = styled.div`
    display: flex;
    margin-top: 50px;
    align-items: center;
`

const MeetingBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 400px;
    height: 170px;
    background: #e9e3e1;
    border-radius: 15px;
`

const BasicInfoAndButtons = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: auto 0;
    padding-top: 40px;
`

const BasicInfo = styled.div`

`

const Buttons = styled.div`
    margin-left: 20px;
`

const AttendanceList = styled.div`
    display: flex;
    margin-left: auto;
    padding: 5px;
`

const MenuWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
`

export default function GroupMeeting({ groupId }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const [meetings, setMeetings] = useState([])
    const [meetingIndex, setMeetingIndex] = useState(0)
    const [modalOpen, setModalOpen] = useState(false);
    
    const getMeetings = async () => {
        try {
            const res = await dispatch(getGroupMeetingList(groupId))
            setMeetings(res.payload)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getMeetings()
    }, [])


    const attendHandler = async (attendance) => {
        if (attendance && meetings[meetingIndex]?.attendanceList.some((value, index) => value.memberId === user.data.userId)) {
            alert('이미 참석투표하셨습니다.')
            return
        }
        if (!attendance && meetings[meetingIndex]?.attendanceList.every((value, index) => value.memberId !== user.data.userId)) {
            alert('이미 불참석투표하셨습니다.')
            return
        }

        let body = {
            attendance
        }
        try {
            const res = await dispatch(setMeetingAttendance(body, groupId, meetings[meetingIndex].meetingId, user.data.userId))
            if (attendance) {
                alert('참석 투표하셨습니다.')
            }
            else {
                alert('불참석 투표하셨습니다.')
            }
            getMeetings()
        } catch (e) {
            console.log(e)
        }
    }

    const indexHandler = (i) => {
        setMeetingIndex(meetingIndex + i)
    }
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    if (meetings.length !== 0) return (
    <TotalWrap>
        <MeetingWrap>
            <IconButton disabled={meetingIndex === 0} onClick={() => indexHandler(-1)} sx={{ cursor: 'pointer' }} >
                <ArrowBackIosNewIcon fontSize='large' />
            </IconButton>
                <MeetingBox>
                    <BasicInfoAndButtons>
                        <BasicInfo>
                            <Typography>{meetings[meetingIndex]?.date}</Typography>
                            <Typography>{meetings[meetingIndex]?.time}</Typography>
                            <Typography>{meetings[meetingIndex]?.place}</Typography>
                        </BasicInfo>
                        <Buttons>
                            <Button variant="contained" style={{backgroundColor:'#777777'}} onClick={() => attendHandler(true)} >참석</Button>
                            <Button disabled={meetings[meetingIndex]?.attendanceList.some((value, index) =>
                                value.memberId === user.data?.userId && value.isMaster
                            )} variant="contained" style={{backgroundColor:'#C5C0C0'}} onClick={() => attendHandler(false)} sx={{ ml: 1 }} >불참석</Button>
                        </Buttons>
                    </BasicInfoAndButtons>
                    <AttendanceList onClick={handleClick} sx={{ cursor: 'pointer' }} >
                        <Typography>참가자 목록</Typography>
                        <KeyboardArrowDownIcon/>
                    </AttendanceList>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                                },
                                '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                                },
                            },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            {meetings[meetingIndex]?.attendanceList.map((elem, index) => (
                                <MenuItem key={index} onClick={() => navigate('/profile/' + elem.memberId)}>
                                    <Avatar /> {elem.nickname}
                                    {elem.isMaster && <GradeIcon />}
                                </MenuItem>
                            ))}
                        </Menu>
                </MeetingBox>
            <IconButton disabled={meetingIndex === meetings.length - 1} onClick={() => indexHandler(1)} >
                <ArrowForwardIosIcon fontSize='large' />
            </IconButton>
        </MeetingWrap>
        <MeetingForm groupId={groupId} getMeetings={getMeetings}/>
    </TotalWrap>
  )
  else return (
    <div style={{ 'marginTop': '30px'}}>
        <Typography>아직 모임이 없습니다.</Typography>
        <MeetingForm groupId={groupId} getMeetings={getMeetings}/>
    </div>
  )
}
