import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import DashboardPage from '../dashboard/DashboardPage'
import ScanPage from '../scan/ScanPage'

class MainPage extends Component{
    render(){
        return(
            <div>
                <Switch>
                    <Route path='/a/dashboard' component={DashboardPage} />
                    <Route path='/a/scan' component={ScanPage} />

                    <Redirect to='/a/dashboard'/>
                </Switch>
            </div>
        )
    }
}

export default MainPage