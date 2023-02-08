import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Typography, Avatar } from '@mui/material';

const TotalWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 250px;
    border-radius: 15px;
    background: #e9e3e1;
    margin: 15px;
    cursor: pointer;
`

const MasterInfo = styled.div`
    display: flex;
    margin-top: 20px;
    margin-bottom: 10px;
`

function GroupElement({ group }) {
    const navigate = useNavigate()

  return (
    <TotalWrap onClick={() => navigate('/groups/detail/' + group.groupId)} >
        <Typography variant='h5' >{group.title}</Typography>
        <MasterInfo>
            <Avatar sx={{ width: 24, height: 24, mr: 1 }}/>
            <Typography>{group.groupMaster}</Typography>
        </MasterInfo>
        {group.term === 'LONG' && <Typography>기간: 장기</Typography>}
        {group.term === 'SHORT' && <Typography>기간: 단기</Typography>}
        {group.type === 'PROJECT' && 
            <Typography>{group.term}</Typography>
        }
        {group.groupStatus === 'RECRUIT' &&
            <Typography>{'모집중인 그룹'}</Typography>
        }
        {group.groupStatus === 'END_RECRUIT' &&
            <Typography>{'모집을 종료한 그룹'}</Typography>
        }
        {group.groupStatus === 'END_GROUP' &&
            <Typography>{'종료된 그룹'}</Typography>
        }
    </TotalWrap>
  )
}

export default GroupElement