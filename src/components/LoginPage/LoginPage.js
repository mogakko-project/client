import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { Link, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Auth from '../../hoc/auth'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../_actions/user_action'

const PageWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 70px;
`

const LoginWrap = styled.div`
    width: 400px;
    height: 300px;
`

const Inputs = styled.div`
    margin-bottom: 20px;
`

function LoginPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const usernameChanged = (e) => {
        setUsername(e.target.value)
    }

    const passwordChanged = (e) => {
        setPassword(e.target.value)
    }

    const loginHandler = async () => {
        let body = {
            username,
            password
        }
        
        try {
            await dispatch(loginUser(body))
            navigate ('/')
        } catch (e) {
			alert(e.response.data.message)
        }
    }

  return (
    <PageWrap>
        <h1>로그인</h1>
        <LoginWrap>
            <Inputs>
                <TextField fullWidth label='아이디' size='small' onChange={usernameChanged}/>
                <TextField fullWidth label='비밀번호' type='password' margin='dense' size='small' onChange={passwordChanged} />
            </Inputs>
            
            <Button fullWidth variant='contained' onClick={loginHandler}>Login</Button>
            <Link href='/register'>register now!</Link>
        </LoginWrap>
    </PageWrap>
  )
}

export default Auth(LoginPage, false)