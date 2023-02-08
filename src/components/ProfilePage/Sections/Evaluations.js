import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { List, ListItem, ListItemText, ListItemButton, Divider, Chip, IconButton, Link, Typography, Button, Avatar } from '@mui/material';
import { getPostOfType, getStudyPostsOfGroup } from '../../../_actions/post_action'
import { getEvaluation } from '../../../_actions/evaluation_action';

const TotalWrap = styled.div`
    margin-top: 20px;
`

const Evaluation = styled.div`
    display: flex;
    align-items: center;
    border-radius: 10px;
    background: #e9e3e1;
    height: 40px;
    padding: 0 10px;
    margin-top: 5px;
`

function Evaluations({ userId }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const [evaluations, setEvaluations] = useState([])

    const fetchEvaluations = async () => {
        try {
            const res = await dispatch(getEvaluation(userId))
            setEvaluations(res.payload)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchEvaluations()
    }, [])
    
  return (
    <TotalWrap>
        <Typography variant='h6'>다른 유저의 한줄평</Typography>
        {evaluations.map((elem, index) => (
            <Evaluation key={index}>
                <Avatar sx={{ width: 24, height: 24, mr: 1 }}/>
                <Typography>{elem.evaluatingUserNickname}</Typography>
                <Divider orientation="vertical" variant="middle" sx={{ mx: 2 }} />
                <Typography>{elem.content}</Typography>
            </Evaluation>
        ))}
    </TotalWrap>
  )
}

export default Evaluations