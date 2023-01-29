import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action'

export default function (SpecificComponent, option, adminRoute = null) {
    
    //option:
    //null  =>  아무나 출입이 가능한 페이지
    //true  =>  로그인한 유저만 출입이 가능한 페이지
    //false =>  로그인한 유저는 출입 불가능한 페이지
    
    //adminRoute => admin 유저만 출입이 가능한 페이지

    function AuthenticationCheck() {
        const navigate = useNavigate()
        const dispatch = useDispatch()

        useEffect(() => {
            dispatch(auth())
                .then((res) => {
                    // console.log(res)
                    if (res.payload.isAuth) {
                        // 로그인 한 유저
                        if (option === false) {
                            navigate('/')
                        }
                    } else {
                        // 로그인 안 한 유저
                        if (option) {
                            navigate('/login')
                        }
                    }
                })
        }, [])
        
        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}