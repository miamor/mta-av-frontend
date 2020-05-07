import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import DashboardPage from '../dashboard/DashboardPage'
import ScanPage from '../scan/ScanPage'
import AboutPage from '../about/AboutPage'
import HomePage from '../home/HomePage'
import UserPage from '../user/UserPage'

class MainPage extends Component{
    render(){
        return(
            <div className='MainPage'>
                <Switch>
                    <Route exact path='/a/dashboard' component={DashboardPage} />
                    <Route exact path='/a/scan' component={ScanPage} />
                    <Route exact path='/a/about' component={AboutPage}/>
                    <Route exact path='/a/home' component={HomePage} />
                    <Route exact path='/a/user' component={UserPage} />

                    <Redirect to='/a/dashboard'/>
                </Switch>
            </div>
        )
    }
}

export default MainPage