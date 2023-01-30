import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { TextField, Button, Typography, Autocomplete } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Auth from '../../hoc/auth'
import { useDispatch, useSelector } from 'react-redux'
import { saveUserProfile, checkNickname } from '../../_actions/user_action'
import axios from 'axios'

const PageWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 90vh;
`

const ContentWrap = styled.div`
    width: 600px;
`

const Inputs = styled.div`
    margin-bottom: 20px;
`

const IdWrap = styled.div`
	display: flex;
	align-items: center;
`

function SetProfilePage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const [nickname, setNickname] = useState('')
    const [oneLineIntroduction, setOneLineIntroduction] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [githubAddress, setGithubAddress] = useState('')

    const [languages, setLanguages] = useState([])
    const [locations, setLocations] = useState([])
    const [occupations, setOccupations] = useState([])

    const [selectedLanguages, setSelectedLanguages] = useState([])
    const [selectedLocations, setSelectedLocations] = useState([])
    const [selectedOccupations, setSelectedOccupations] = useState([])
    
	const [redundancyChecked, setRedundancyChecked] = useState(false)

    const nicknameChanged = (e) => {
        setNickname(e.target.value)
    }

    const oneLineIntroductionChanged = (e) => {
        setOneLineIntroduction(e.target.value)
    }

    const phoneNumberChanged = (e) => {
        setPhoneNumber(e.target.value)
    }

    const githubAddressChanged = (e) => {
        setGithubAddress(e.target.value)
    }

    const submitHandler = async () => {
        if (!redundancyChecked) {
			return alert('닉네임 중복확인을 해주세요.')
		}
        let body = {
            nickname,
            oneLineIntroduction,
            phoneNumber,
            githubAddress,
            languages: selectedLanguages,
            locations: selectedLocations,
            occupations: selectedOccupations
        }
        
        try {
            await dispatch(saveUserProfile(body, user.data.userId))
			alert('저장되었습니다.')
            navigate ('/')
        } catch (e) {
			alert(e.response.data.message)
        }
    }

    const redundancyChecker = async () => {
		let body = {
			nickname
		}
		try {
			const res = await dispatch(checkNickname(body))
			if (res.payload.isExist) {
				setRedundancyChecked(false)
				alert('이미 존재하는 닉네임입니다.')
			}
			else {
				setRedundancyChecked(true)
				alert('사용가능한 닉네임입니다.')
			}
		} catch (e) {
			console.log(e)
		}
	}

    const getValues = async () => {
        try {
            const languagesResult = await axios.get('/api/languages')
            setLanguages(languagesResult.data.languages)
            
            const locationsResult = await axios.get('/api/locations')
            setLocations(locationsResult.data.locations)
            
            const occupationsResult = await axios.get('/api/occupations')
            setOccupations(occupationsResult.data.occupations)
        } catch (e) {
            console.log(e)
        }
        
    }

    useEffect(() => {
        getValues()
    }, [])
    

  return (
    <PageWrap>
        <Typography variant="h4">프로필을 완성해주세요.</Typography>
        <Typography mb={5}>추후에 내 프로필에서 변경 가능합니다.</Typography>
        <ContentWrap>
            <Inputs>
                <IdWrap>
                    <TextField fullWidth label='닉네임' size='small' onChange={nicknameChanged}/>
					<Button variant="outlined" sx={{ ml: 2, fontSize: 10, height: 40}} size="small" onClick={redundancyChecker} >중복 확인</Button>
				</IdWrap>
                <TextField fullWidth label='한 줄 소개' margin='dense' size='small' onChange={oneLineIntroductionChanged} />
                <TextField fullWidth label='연락처' margin='dense' size='small' onChange={phoneNumberChanged} />
                <TextField fullWidth label='깃헙 주소' margin='dense' size='small' onChange={githubAddressChanged} />
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={languages}
                    getOptionLabel={(option) => option.languageName}
                    // defaultValue={[top100Films[13]]}
                    sx={{ mt: 1 }}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="사용 언어"
                        placeholder="검색"
                    />
                    )}
                    value={selectedLanguages}
                    onChange={(event, newValue) => setSelectedLanguages(newValue)}
                />
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    // options={locations}
                    options={locations.sort((a, b) => -b.lineNumber.localeCompare(a.lineNumber))}
                    groupBy={(option) => option.lineNumber}
                    getOptionLabel={(option) => option.stationName}
                    // defaultValue={[top100Films[13]]}
                    sx={{ mt: 1 }}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="선호 지역"
                        placeholder="검색"
                    />
                    )}
                    value={selectedLocations}
                    onChange={(event, newValue) => setSelectedLocations(newValue)}
                />
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={occupations}
                    getOptionLabel={(option) => option.occupationName}
                    // defaultValue={[top100Films[13]]}
                    sx={{ mt: 1 }}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="선호 직무"
                        placeholder="검색"
                    />
                    )}
                    value={selectedOccupations}
                    onChange={(event, newValue) => setSelectedOccupations(newValue)}
                />
            </Inputs>
            
            <Button fullWidth variant='contained' onClick={submitHandler}>저장</Button>
        </ContentWrap>
    </PageWrap>
  )
}

export default Auth(SetProfilePage, true)