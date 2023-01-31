import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Autocomplete, TextField, Typography, Button } from '@mui/material';
import PostList from './PostList';

const FilterWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    min-height: 500px;
    background: #D9D9D9;
    padding: 20px;
`

const Buttons = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: auto;
    padding-top: 10px;
`

export default function Filter({selectedLanguages, setSelectedLanguages, selectedLocations, setSelectedLocations, selectedOccupations, setSelectedOccupations, posts, setFilteredPosts}) {

    const [languages, setLanguages] = useState([])
    const [locations, setLocations] = useState([])
    const [occupations, setOccupations] = useState([])

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

    const applyHandler = () => {
        const filteredPosts = posts.filter(post => {
            // post.languages가 selectedLanguages의 모든 원소를 포함해야 함.
            for (var i = 0; i < selectedLanguages.length; i++) {
                var include = false;
                for (var j = 0; j < post.languages.length; j++) {
                    if (selectedLanguages[i].languageId === post.languages[j].languageId) {
                        include = true;
                        break;
                    }
                }
                if (!include) return false;
            }
            for (var i = 0; i < selectedLocations.length; i++) {
                var include = false;
                for (var j = 0; j < post.locations.length; j++) {
                    if (selectedLocations[i].locationId === post.locations[j].locationId) {
                        include = true;
                        break;
                    }
                }
                if (!include) return false;
            }
            for (var i = 0; i < selectedOccupations.length; i++) {
                var include = false;
                for (var j = 0; j < post.occupations.length; j++) {
                    if (selectedOccupations[i].occupationId === post.occupations[j].occupationId) {
                        include = true;
                        break;
                    }
                }
                if (!include) return false;
            }
            return true;
        })
        setFilteredPosts(filteredPosts)
    }

    const resetHandler = () => {
        setSelectedLanguages([])
        setSelectedLocations([])
        setSelectedOccupations([])
        setFilteredPosts(posts)
    }

  return (
    <FilterWrap>
        <Typography variant='h4' sx={{ mt: 2, ml: 1, mb: 2 }} >Filter</Typography>
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
        <Buttons>
            <Button variant="contained" style={{backgroundColor:'#777777'}} onClick={applyHandler} >적용</Button>
            <Button variant="contained" style={{backgroundColor:'#C5C0C0'}} onClick={resetHandler} >초기화</Button>
        </Buttons>
    </FilterWrap>
  )
}
