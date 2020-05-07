import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Header from './Header'
import MainPage from './MainPage'
import Sidebar from './Sidebar'
import {getAccessToken} from '../../services/AuthServices'

class PageLayout extends Component{
    render(){

        if (!getAccessToken()) return <Redirect to='/login'/>

        return(
            <div className='d-flex PageLayout'>
                <Sidebar />
                <div className='Right'>
                    <Header />
                    <MainPage />
                </div>
            </div>
        )
    }
}

export default PageLayout