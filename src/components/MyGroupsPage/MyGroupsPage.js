import React, { useState, useEffect } from 'react'
import Auth from '../../hoc/auth'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@mui/material';
import { getGroupListOfUser } from '../../_actions/group_action'
import GroupElement from './Sections/GroupElement'

const TotalWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
`

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1000px;
    padding-top: 50px;
`

const Type = styled.div`
    width: 1000px;
    margin-top: 20px;
`

const Elemnets = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 10px;
`


function MyPostsPage() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    
    const [projects, setProjects] = useState([])
    const [mogakkos, setMogakkos] = useState([])

    const fetchGroups = async () => {
        try {
            const res = await dispatch(getGroupListOfUser(user.data.userId))
            setProjects(res.payload.filter(group => group.type === 'PROJECT'))
            setMogakkos(res.payload.filter(group => group.type === 'MOGAKKO'))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchGroups()
    }, [user])
    

  return (
    <TotalWrap>
        <Layout>
            <Typography variant='h4'>내가 속한 그룹</Typography>
            <Type >
                <Typography variant='h5'>프로젝트 ({projects.length})</Typography>
                <Elemnets>
                    {projects && projects.map((elem, index) => (
                        <GroupElement key={index} group={elem}/>
                    ))}
                </Elemnets>
            </Type>
            
            <Type >
                <Typography variant='h5'>모각코 ({mogakkos.length})</Typography>
                <Elemnets>
                    {mogakkos && mogakkos.map((elem, index) => (
                        <GroupElement key={index} group={elem}/>
                    ))}
                </Elemnets>
            </Type>
        </Layout>
    </TotalWrap>
  )
}

export default Auth(MyPostsPage, true)