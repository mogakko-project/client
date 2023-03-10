import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { TextField, Button, Typography, Autocomplete } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import Auth from '../../hoc/auth'
import { useDispatch, useSelector } from 'react-redux'
import { saveUserProfile, checkNickname, getUserProfile } from '../../_actions/profile_action'
import axios from 'axios'

const PageWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 70px;
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

function EditProfilePage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
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
    const [nicknameHasChanged, setNicknameHasChanged] = useState(false)


    const nicknameChanged = (e) => {
        setNicknameHasChanged(true)
        setRedundancyChecked(false)
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
        if (nicknameHasChanged && !redundancyChecked) {
			return alert('????????? ??????????????? ????????????.')
		}
        if (!nickname) {
            return alert('???????????? ??????????????????')
        }
        if (!oneLineIntroduction) {
            return alert('??? ??? ????????? ??????????????????.')
        }
        if (!phoneNumber) {
            return alert('??????????????? ??????????????????.')
        }
        if (!githubAddress) {
            return alert('?????? ????????? ??????????????????.')
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
			alert('?????????????????????.')
            if (location.pathname === '/initProfile') {
                navigate ('/')
            }
            else {
                navigate('/profile/' + user.data.userId)
            }
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
				alert('?????? ???????????? ??????????????????.')
			}
			else {
				setRedundancyChecked(true)
				alert('??????????????? ??????????????????.')
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

    const getProfile = async () => {
        try {
            const res = await dispatch(getUserProfile(user.data.userId))
            setNickname(res.payload.nickname)
            setOneLineIntroduction(res.payload.oneLineIntroduction)
            setPhoneNumber(res.payload.phoneNumber)
            setGithubAddress(res.payload.githubAddress)
            setSelectedLanguages(res.payload.languages)
            setSelectedLocations(res.payload.locations)
            setSelectedOccupations(res.payload.occupations)
        } catch (e) {
            console.log(e)
        }
        
    }

    useEffect(() => {
        getValues()
    }, [])
    
    useEffect(() => {
        getProfile()
    }, [user])

  return (
    <PageWrap>
        {location.pathname === '/initProfile' ? (
                <>
                    <Typography variant="h4">???????????? ??????????????????.</Typography>
                    <Typography mb={5}>????????? ??? ??????????????? ?????? ???????????????.</Typography>
                </>
            ) : (
                <>
                    <Typography variant="h4">????????? ??????</Typography>
                </>
            )
        }
        
        <ContentWrap>
            <Inputs>
                <IdWrap>
                    <TextField fullWidth label='?????????' size='small' value={nickname} onChange={nicknameChanged} />
					<Button disabled={!nicknameHasChanged} variant="outlined" sx={{ ml: 2, fontSize: 10, height: 40}} size="small" onClick={redundancyChecker} >?????? ??????</Button>
				</IdWrap>
                <TextField fullWidth label='??? ??? ??????' margin='dense' size='small' onChange={oneLineIntroductionChanged} value={oneLineIntroduction} defaultValue={oneLineIntroduction} />
                <TextField fullWidth label='?????????' margin='dense' size='small' onChange={phoneNumberChanged} value={phoneNumber} defaultValue={phoneNumber} />
                <TextField fullWidth label='?????? ??????' margin='dense' size='small' onChange={githubAddressChanged} value={githubAddress} defaultValue={githubAddress} />
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={languages}
                    getOptionLabel={(option) => option.languageName}
                    isOptionEqualToValue={(option, value) => value.languageId === option.languageId}
                    sx={{ mt: 1 }}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="?????? ??????"
                        placeholder="??????"
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
                    isOptionEqualToValue={(option, value) => value.locationId === option.locationId}
                    sx={{ mt: 1 }}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="?????? ??????"
                        placeholder="??????"
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
                    isOptionEqualToValue={(option, value) => value.occupationId === option.occupationId}
                    sx={{ mt: 1 }}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="?????? ??????"
                        placeholder="??????"
                    />
                    )}
                    value={selectedOccupations}
                    onChange={(event, newValue) => setSelectedOccupations(newValue)}
                />
            </Inputs>
            
            <Button fullWidth variant='contained' onClick={submitHandler}>??????</Button>
        </ContentWrap>
    </PageWrap>
  )
}

export default Auth(EditProfilePage, true)