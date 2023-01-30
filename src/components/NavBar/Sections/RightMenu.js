import React from 'react'
import { Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../../../_actions/user_action'

const MenuWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
`

function RightMenu() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const logoutHandler = async () => {
        try {
            await dispatch(logoutUser())
            alert('로그아웃 되었습니다.')
            navigate('/')
        } catch (e) {
            alert('로그아웃에 실패하였습니다.')
        }
    }

    if (user.data && user.data.isAuth) {
        return (
            <MenuWrap>
                <Button onClick={logoutHandler}>logout</Button>
            </MenuWrap>
          )
    } else {
        return (
            <MenuWrap>
                <Button onClick={() => navigate('/register')}>register</Button>
                <Divider sx={{mx: 2}} orientation='vertical' variant='middle' flexItem />
                <Button onClick={() => navigate('/login')}>login</Button>
            </MenuWrap>
        )
    }
  
}
  
export default RightMenu