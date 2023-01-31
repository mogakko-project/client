import React from 'react'
import { List, ListItem, ListItemText, ListItemButton, Divider, Chip, Typography } from '@mui/material';
import styled from 'styled-components'

const PostElement = styled.div`

`

const MoreInfo = styled.div`

`
const Above = styled.div`
    display: flex;
`
const Below = styled.div`
    display: flex;
    margin-top: 5px;
    align-items: center;
    justify-content: space-between;
`
const Occupations = styled.div`
    display: flex;

`
const Languages = styled.div`
    display: flex;

`
const Locations = styled.div`
    display: flex;

`


function PostList({posts, selectHandler}) {

  return (
    <List sx={{width: 900}}>
        {posts && posts.map((elem, index) => {
            return (
            <div key={index}>
                <PostElement>
                    <ListItem>
                        <ListItemButton onClick={() => selectHandler(elem.postId)}>
                            <ListItemText primary={elem.title} secondary={elem.nickname}/>
                            <MoreInfo>
                                <Above>
                                    <Occupations>
                                        {elem.occupations.map((elem, index) => 
                                            <div key={index}>
                                                <Chip label={elem.occupationName} color="primary" sx={{ ml: 1 }} variant="outlined"  />
                                            </div>
                                        )}
                                    </Occupations>
                                    <Languages>
                                        {elem.languages.map((elem, index) => 
                                            <div key={index}>
                                                <Chip label={elem.languageName} color="success" sx={{ ml: 1 }} variant="outlined"  />
                                            </div>
                                        )}
                                    </Languages>
                                </Above>
                                <Below>
                                    <Locations>
                                        {elem.locations.map((elem, index) => 
                                            <div key={index}>
                                                <Chip label={elem.stationName} color="secondary" sx={{ ml: 1 }} variant="outlined"  />
                                            </div>
                                        )}
                                    </Locations>
                                    <Typography variant="caption" color='#A59A9A' sx={{ ml: 1 }} >{elem.updatedAt.substring(0, 10)} </Typography>
                                </Below>
                            </MoreInfo>
                            {/* <Chip icon={<PeopleIcon />} label={elem.favoriteMemberCnt} /> */}
                        
                        </ListItemButton>
                    </ListItem>
                </PostElement>
                <Divider />
            </div>
            
            )
        })}
    </List>
  )
}

export default PostList