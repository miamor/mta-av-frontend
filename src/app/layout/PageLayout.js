import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Header from './Header'
import MainPage from './MainPage'
import {getAccessToken} from '../../services/AuthServices'

class PageLayout extends Component{
    render(){

        if (!getAccessToken()) return <Redirect to='/login'/>

        return(
            <div className='PageLayout'>
                <Header />
                <MainPage />
            </div>
        )
    }
}

export default PageLayout