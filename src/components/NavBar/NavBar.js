import { AppBar, Toolbar, Button, Typography, ButtonBase } from '@mui/material';
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
            </ButtonBase>
            {/* <Button onClick={() => navigate('/map')}>map</Button> */}
            <RightMenu/>
        </Toolbar>
    </AppBar>
  )
}

export default NavBar
