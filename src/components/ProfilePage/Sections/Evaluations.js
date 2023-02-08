import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Divider, Typography, Avatar } from '@mui/material';
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
    const dispatch = useDispatch()

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