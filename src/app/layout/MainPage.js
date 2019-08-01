import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import DashboardPage from '../dashboard/DashboardPage'
import ScanPage from '../scan/ScanPage'
import AboutPage from '../about/AboutPage'
import HomePage from '../home/HomePage'

class MainPage extends Component{
    render(){
        return(
            <div className='MainPage'>
                <Switch>
                    <Route path='/a/dashboard' component={DashboardPage} />
                    <Route path='/a/scan' component={ScanPage} />
                    <Route path='/a/about' component={AboutPage}/>
                    <Route path='/a/home' component={HomePage} />

                    <Redirect to='/a/dashboard'/>
                </Switch>
            </div>
        )
    }
}

export default MainPage