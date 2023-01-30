import React from 'react'
import styled from 'styled-components'
import { TextField, Button } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from '../../hoc/auth'
import { useDispatch } from 'react-redux'
import { registerUser, checkRedundancy } from '../../_actions/user_action'

const PageWrap = styled.div`
  	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 80vh;
`

const LoginWrap = styled.div`
	display: flex;
	flex-direction: column;
    margin-top: 20px;
    width: 400px;
    height: 300px;
`

const IdWrap = styled.div`
	display: flex;
	align-items: center;
`

function RegisterPage() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [redundancyChecked, setRedundancyChecked] = useState(false)

	const nameChanged = (e) => {
		setUsername(e.target.value)
	}

	const passwordChanged = (e) => {
		setPassword(e.target.value)
	}

	const confirmPasswordChanged = (e) => {
		setConfirmPassword(e.target.value)
	}

	const registerHandler = async () => {
		if (!redundancyChecked) {
			return alert('아이디 중복확인을 해주세요.')
		}
		if (password !== confirmPassword) {
			return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
		}
		const regex = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{8,20}/
		if (!regex.test(password)) {
			return alert('비밀번호는 영문 대,소문자와 숫자, 특수기호가 적어도 1개 이상씩 포함된 8자 ~ 20자의 비밀번호여야 합니다.')
		}
		

		let body = {
			username,
			password
		}
		try {
			await dispatch(registerUser(body))
			alert('회원가입 완료. 상세정보를 입력해주세요.')
			navigate('/setProfile')
		} catch (e) {
			alert(e.response.data.message)
		}
	}

	const redundancyChecker = async () => {
		let body = {
			username
		}
		try {
			const res = await dispatch(checkRedundancy(body))
			console.log(res)
			if (res.payload.isExist) {
				setRedundancyChecked(false)
				alert('이미 존재하는 아이디입니다.')
			}
			else {
				setRedundancyChecked(true)
				alert('사용가능한 아이디입니다.')
			}
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<PageWrap>
			<h1>회원가입</h1>
			<LoginWrap>
				<IdWrap>
					<TextField fullWidth margin="dense" label="아이디" variant="outlined" size="small" onChange={nameChanged} />
					<Button variant="outlined" sx={{ ml: 2, fontSize: 10, height: 40}} size="small" onClick={redundancyChecker} >중복 확인</Button>
				</IdWrap>
				<TextField fullWidth='100px' type='password' margin="dense" label="비밀번호" variant="outlined" size="small" onChange={passwordChanged} />
				<TextField fullWidth type='password' margin="dense" label="비밀번호 확인" variant="outlined" size="small" onChange={confirmPasswordChanged} />
				<Button fullWidth margin="dense" variant="contained" sx={{ my: 2 }} onClick={registerHandler} >register</Button>
			</LoginWrap>
		</PageWrap>
	)
}

export default Auth(RegisterPage, false)