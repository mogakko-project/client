import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { Autocomplete, TextField, Typography, Button, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getGroupMembers } from '../../../_actions/group_action';

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

export default function GroupMembers({ groupId }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [members, setMembers] = useState([])
    
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


    const memberClickHandler = (memberId) => {
        navigate("/profile/" + memberId)
    }

  return (
    <MembersWrap>
        {members.map((elem, index) => (
            <MemberElem key={index} onClick={() => memberClickHandler(elem.memberId)}>
                <Avatar sx={{ width: 32, height: 32, mr: 1 }} />
                {elem.nickname}
            </MemberElem>
        ))}
    </MembersWrap>
  )
}
