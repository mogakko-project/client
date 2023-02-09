import React from 'react'
import Auth from '../../hoc/auth'
import styled from 'styled-components'
import { Typography } from '@mui/material'

const TotalWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 600px;
`

function LandingPage() {
  return (
    <TotalWrap>
      <Typography>프로젝트와 모각코를 구하여 그 그룹별로 관리할 수 있는 서비스입니다.</Typography>
      <Typography>회원가입, 로그인 하시고 프로젝트/모각코를 생성 또는 참여하신 후, 오른쪽 위 메뉴의 내 그룹을 통해 그룹 페이지로 이동해보세요.</Typography>
    </TotalWrap>
  )
}

export default Auth(LandingPage, null)