import React from 'react'
import { Button, Divider, Box, IconButton, Menu, Avatar, MenuItem, ListItemIcon } from '@mui/material';
import { Logout } from '@mui/icons-material';
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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const myGroupClicked = () => {
        navigate('/myGroups')
        handleClose()
    }
    const profileClicked = () => {
        navigate('/profile/' + user.data.userId)
        handleClose()
    }

    if (user.data && user.data.isAuth) {
        return (
            <MenuWrap>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}/>
                    </IconButton>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                        },
                        '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        },
                    },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={myGroupClicked}>
                        내 그룹
                    </MenuItem>
                    <MenuItem onClick={profileClicked}>
                        <Avatar /> 프로필
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={logoutHandler}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
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