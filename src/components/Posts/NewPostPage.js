import React, { useState, useEffect } from 'react'
import Auth from '../../hoc/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { List, ListItem, ListItemText, ListItemButton, Divider, Autocomplete, Chip, IconButton, Link, Typography, Button, TextField, FormControl, Select, MenuItem, InputLabel  } from '@mui/material';
import { LocalizationProvider, DatePicker, DesktopDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { addPost, getPostOfType } from '../../_actions/post_action'
import dayjs from "dayjs"
import axios from 'axios'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
const TotalWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 100px;
`

const PostProperty = styled.div`
    width: 1000px;
    margin-top: 100px;
`

const PropertyLine = styled.div`
    display: flex;
    margin-top: 30px;
`

const Deadline = styled.div`
    margin-top: 20px;
`

const TitleAndContent = styled.div`
    width: 1000px;
    margin-top: 100px;
`

const Buttons = styled.div`
    display: flex;
    margin-top: 10px;
`

function PostPage() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
    const user = useSelector(state => state.user)

    const [type, setType] = useState('')
    const [term, setTerm] = useState('')
    const [deadline, setDeadline] = useState(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    
    const [languages, setLanguages] = useState([])
    const [locations, setLocations] = useState([])
    const [occupations, setOccupations] = useState([])

    const [selectedLanguages, setSelectedLanguages] = useState([])
    const [selectedLocations, setSelectedLocations] = useState([])
    const [selectedOccupations, setSelectedOccupations] = useState([])

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

    const typeChanged = (e) => {
        if (e.target.value !== 'MOGAKKO') {
            setTerm('')
        }
        setType(e.target.value)
    }

    const termChanged = (e) => {
        setTerm(e.target.value)
    }

    const titleChanged = (e) => {
        setTitle(e.target.value)
    }

    const contentChanged = (e) => {
        setContent(e.target.value)
    }

    const submitHandler = async () => {
        if (!type) {
            return alert('게시글 타입을 선택해주세요')
        }
        if (type === 'MOGAKKO' && !term) {
            return alert('기간을 선택해주세요.')
        }
        if (!deadline) {
            return alert('모집 마감일을 선택해주세요.')
        }
        if (!title) {
            return alert('제목을 작성해주세요.')
        }
        if (!content) {
            return alert('내용을 작성해주세요.')
        }
        
        var tempTerm =  null
        if (term !== '') {
            tempTerm = term
        }
        let body = {
            userId: user.data.userId,
            type,
            title,
            content,
            deadline: deadline + 'T00:00:00',
            term: tempTerm,
            languages: selectedLanguages,
            locations: selectedLocations,
            occupations: selectedOccupations
        }
        
        try {
            const res = await dispatch(addPost(body))
			alert('저장되었습니다.')
            navigate('/posts/detail/' + res.payload.postId)
        } catch (e) {
			alert(e.response.data.message)
        }
    }


	return (
        <TotalWrap>
            <PostProperty>
                <Typography variant='h5' >기본 정보를 입력해주세요.</Typography>
                <Divider sx={{ mt: 2 }} />
                
                <PropertyLine>
                    <FormControl sx={{ width: '48%' }} >
                        <InputLabel id="demo-simple-select-label">게시글 타입</InputLabel>
                        <Select value={type} label="게시글 타입" labelId="test-select-label" onChange={typeChanged}>
                            <MenuItem value={'PROJECT'}>프로젝트</MenuItem>
                            <MenuItem value={'MOGAKKO'}>모각코</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant={type === 'MOGAKKO' ? 'outlined' : 'filled' } sx={{ width: '48%', marginLeft: 'auto' }} >
                        <InputLabel id="demo-simple-select-label">기간</InputLabel>
                        <Select disabled={type !== 'MOGAKKO'} value={term} label="기간" labelId="test-select-label" onChange={termChanged}>
                            <MenuItem disabled={type === 'MOGAKKO'} value='' >
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'LONG'}>장기</MenuItem>
                            <MenuItem value={'SHORT'}>단기</MenuItem>
                        </Select>
                    </FormControl>
                </PropertyLine>
                <Deadline>
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <DesktopDatePicker
                            label="모집 마감일"
                            value={deadline}
                            inputFormat={"yyyy-MM-dd"}
                            mask={"____-__-__"}
                            onChange={(newValue) => {
                                setDeadline(dayjs(newValue).format('YYYY-MM-DD'));
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Deadline>
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
                    isOptionEqualToValue={(option, value) => value.locationId === option.locationId}
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
                    isOptionEqualToValue={(option, value) => value.occupationId === option.occupationId}
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
            </PostProperty>
            <TitleAndContent>
                <Typography variant='h5' >설명해주세요.</Typography>
                <Divider sx={{ mt: 2 }} />
                <TextField fullWidth label='제목' onChange={titleChanged} sx={{ mt: '30px' }}></TextField>
                <TextField fullWidth label='내용' multiline rows={10} onChange={contentChanged} sx={{ mt: '20px' }}></TextField>
                <Buttons>
                    <Button variant="contained" style={{backgroundColor:'#C5C0C0'}} sx={{ ml: 'auto' }} onClick={() => navigate(-1)}>취소</Button>
                    <Button variant="contained" style={{backgroundColor:'#777777'}} sx={{ ml: 1 }} onClick={submitHandler}>글 등록</Button>
                </Buttons>
            </TitleAndContent>
        </TotalWrap>
	)
}

export default Auth(PostPage, true)