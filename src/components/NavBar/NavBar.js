import { AppBar, Toolbar, Typography, ButtonBase } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import RightMenu from './Sections/RightMenu'

function NavBar() {
    const navigate = useNavigate()


  return (
    <AppBar color='inherit' position='static'>
        <Toolbar>
            <ButtonBase edge='start' disableRipple sx={{mr: 3}}>
                <Typography variant='h5' onClick={() => navigate('/')} >
                    mogakko
                </Typography>
                <Typography sx={{ minWidth: 80, ml: 2 }} onClick={() => navigate('/posts/PROJECT')} >프로젝트</Typography>
                <Typography sx={{ minWidth: 80 }} onClick={() => navigate('/posts/MOGAKKO')} >모각코</Typography>
            </ButtonBase>
            {/* <Button onClick={() => navigate('/map')}>map</Button> */}
            <RightMenu/>
        </Toolbar>
    </AppBar>
  )
}

export default NavBar
