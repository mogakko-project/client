import React, { useState, useEffect } from 'react'
import Auth from '../../hoc/auth'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { List, ListItem, ListItemText, ListItemButton, Divider, Chip, IconButton, Link, Typography, Button } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import DeleteIcon from '@mui/icons-material/Delete';
import PostList from './Sections/PostList'
import { getPostOfType } from '../../_actions/post_action'
import Filter from './Sections/Filter'

const TotalWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Header = styled.div`
	display: flex;
    flex-direction: column;
    height: 300px;
    background: #D1C3BF;
    margin-bottom: 30px;
    width: 100%;
`

const ContentWrap = styled.div`
    display: flex;
    width:1200px;
`

const RightWrap = styled.div`
    margin-left: 30px;
`

function PostPage() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
    let { postType } = useParams()

	const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    
    const [selectedLanguages, setSelectedLanguages] = useState([])
    const [selectedLocations, setSelectedLocations] = useState([])
    const [selectedOccupations, setSelectedOccupations] = useState([])

	const getPosts = async () => {
		try {
			const data = await dispatch(getPostOfType(postType))
			setPosts(data.payload)
            setFilteredPosts(data.payload)
		} catch (e) {
			alert(e.response.data.message)
		}
	}
	useEffect(() => {
		getPosts()
        setSelectedLanguages([])
        setSelectedLocations([])
        setSelectedOccupations([])
	}, [postType])

	const selectHandler = (postId) => {
		navigate('/posts/detail/' + postId)
	}

	
	return (
		<TotalWrap>
            <Header>
                <Typography variant='h3' color="common.white" sx={{ mb: 2, mt: 8, ml: 15 }} >{postType === 'PROJECT' ? '프로젝트' : '모각코'}</Typography>
                <Typography variant='h5' color="#A59A9A" sx={{ ml: 15 }}>{postType === 'PROJECT' ? '프로젝트' : '모각코'}에 참여해보세요.</Typography>
            </Header>
            <ContentWrap>
                <Filter
                    selectedLanguages={selectedLanguages}
                    setSelectedLanguages={setSelectedLanguages}
                    selectedLocations={selectedLocations}
                    setSelectedLocations={setSelectedLocations}
                    selectedOccupations={selectedOccupations}
                    setSelectedOccupations={setSelectedOccupations}
                    posts={posts}
                    setFilteredPosts={setFilteredPosts}
                />
                <RightWrap>
                    <Button variant="contained" style={{backgroundColor:'#C5C0C0'}} >모집하기</Button>
                    <PostList
                        posts={filteredPosts}
                        selectHandler={selectHandler}
                    />
                </RightWrap>
            </ContentWrap>
		</TotalWrap>
	)
}

export default Auth(PostPage, null)