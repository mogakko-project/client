import React from 'react'
import { List, ListItem, ListItemText, ListItemButton, Divider, Chip, Typography } from '@mui/material';
import styled from 'styled-components'
import { calculateDday } from '../../../CommonFunction'

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

const Values = styled.div`
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
                            {(elem.groupStatus === 'END_RECRUIT' || elem.groupStatus === 'END_GROUP') &&
                                <Chip label='마감' sx={{ ml: 1 }} variant="outlined"  />
                            }
                            {elem.groupStatus === 'RECRUIT' &&
                                <Chip label={calculateDday(elem.deadline)} sx={{ ml: 1 }} variant="outlined"  />                            
                            }
                            <MoreInfo>
                                <Above>
                                    <Values>
                                        {elem.occupations.map((elem, index) => 
                                            <div key={index}>
                                                <Chip label={elem.occupationName} color="primary" sx={{ ml: 1 }} variant="outlined"  />
                                            </div>
                                        )}
                                    </Values>
                                    <Values>
                                        {elem.languages.map((elem, index) => 
                                            <div key={index}>
                                                <Chip label={elem.languageName} color="success" sx={{ ml: 1 }} variant="outlined"  />
                                            </div>
                                        )}
                                    </Values>
                                </Above>
                                <Below>
                                    <Values>
                                        {elem.locations.map((elem, index) => 
                                            <div key={index}>
                                                <Chip label={elem.stationName} color="secondary" sx={{ ml: 1 }} variant="outlined"  />
                                            </div>
                                        )}
                                    </Values>
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