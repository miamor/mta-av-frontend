import React, {Component} from 'react'

import Header from './Header'
import MainPage from './MainPage'
import Sidebar from './Sidebar'

class PageLayout extends Component{
    render(){
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