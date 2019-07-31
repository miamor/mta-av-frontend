import React, {Component} from 'react'

import Header from './Header'
import MainPage from './MainPage'
import Sidebar from './Sidebar'

class PageLayout extends Component{
    render(){
        return(
            <div>
                <Header />
                <Sidebar />
                <MainPage />
            </div>
        )
    }
}

export default PageLayout