import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import DashboardPage from '../dashboard/DashboardPage'
import ScanPage from '../scan/ScanPage'
import SettingsPage from '../settings/SettingsPage'
import AboutPage from '../about/AboutPage'
import CapturePage from '../capture/CapturePage'
import CaptureDetailPage from '../capture/CaptureDetailPage'
import UserPage from '../user/UserPage'
import HistoryPage from '../history/HistoryPage'
import HistoryDetailPage from '../history/HistoryDetailPage'

class MainPage extends Component{
    render(){
        return(
            <div className='MainPage'>
                <Switch>
                    <Route exact path='/a/dashboard' component={DashboardPage} />
                    <Route exact path='/a/scan' component={ScanPage} />
                    <Route exact path='/a/settings' component={SettingsPage}/>
                    <Route exact path='/a/about' component={AboutPage}/>
                    <Route exact path='/a/user' component={UserPage} />

                    <Route exact path='/a/capture' component={CapturePage} />
                    <Route exact path="/a/capture/:capture_id" component={CaptureDetailPage} />
                    <Route exact path='/a/capture/search/:hash' component={CapturePage} />
                    <Route exact path='/a/capture/search' component={CapturePage} />

                    <Route exact path='/a/history' component={HistoryPage} />
                    <Route exact path="/a/history/:hash" component={HistoryDetailPage} />
                    <Route exact path='/a/history/search/:hash' component={HistoryPage} />

                    <Redirect to='/a/dashboard'/>
                </Switch>
            </div>
        )
    }
}

export default MainPage