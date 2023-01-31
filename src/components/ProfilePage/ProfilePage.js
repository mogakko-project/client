import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button, Typography, Chip } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import Auth from '../../hoc/auth'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../_actions/profile_action'

const PageWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 70px;
`

const ProfileHeader = styled.div`
    display: flex;
`

const ContentWrap = styled.div`
    width: 600px;
`

const BasicInfoWrap = styled.div`
    margin-top: 40px;
`

const BasicInfoText = styled.div`
    font-size: 20px;
    line-height: 35px;
`

function ProfilePage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    let { userId } = useParams()

    const [profile, setProfile] = useState({})

    const getProfile = async () => {
        try {
            const res = await dispatch(getUserProfile(userId))
            setProfile(res.payload)
        } catch (e) {
            console.log(e)
        }
        
    }

    useEffect(() => {
        getProfile()
    }, [])
    
    const editProfile = () => {
        navigate('/editProfile')
    }


  return (
    <PageWrap>
        <ProfileHeader>
            <Typography variant="h4">{profile.nickname}님의 프로필</Typography>
            {user.data && user.data.userId === userId &&
                <Button variant="outlined" size="small" sx={{ ml: 3 }} onClick={editProfile} >수정</Button>
            }
        </ProfileHeader>

        <ContentWrap>
            <BasicInfoWrap>
                <BasicInfoText>한 줄 소개 : {profile.oneLineIntroduction}</BasicInfoText>
                <BasicInfoText>연락처 : {profile.phoneNumber}</BasicInfoText>
                <BasicInfoText>깃헙 주소 : {profile.githubAddress}</BasicInfoText>
                <BasicInfoText>사용 언어</BasicInfoText>
                {profile.languages && profile.languages.map((language, index) =>
                    <Chip key={index} sx={{ mx: 1 }} label={language.languageName} variant="outlined" />
                )}
                <BasicInfoText>선호 지역</BasicInfoText>
                {profile.locations && profile.locations.map((location, index) =>
                    <Chip key={index} sx={{ mx: 1 }} label={location.stationName} variant="outlined" />
                )}
                <BasicInfoText>선호 직무</BasicInfoText>
                {profile.occupations && profile.occupations.map((occupation, index) =>
                    <Chip key={index} sx={{ mx: 1 }} label={occupation.occupationName} variant="outlined" />
                )}
            </BasicInfoWrap>
            
        </ContentWrap>
    </PageWrap>
  )
}

export default Auth(ProfilePage, true)