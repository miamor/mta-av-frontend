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
import UrlPage from '../url/UrlPage'
import UrlDetailPage from '../url/UrlDetailPage'
import NotiPage from '../noti/NotiPage'
import NotiDetailPage from '../noti/NotiDetailPage'

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
                    // <Route exact path='/a/capture/search/:hash' component={CapturePage} />
                    // <Route exact path='/a/capture/search' component={CapturePage} />

                    <Route exact path='/a/history' component={HistoryPage} />
                    <Route exact path="/a/history/:capture_id" component={HistoryDetailPage} />
                    // <Route exact path='/a/history/search/:hash' component={HistoryPage} />
                    <Route exact path='/a/url' component={UrlPage} />
                    <Route exact path="/a/url/:url_capture_id" component={UrlDetailPage} />

                    <Route exact path='/a/noti' component={NotiPage} />
                    <Route exact path="/a/noti/:noti_id" component={NotiDetailPage} />

                    <Redirect to='/a/dashboard'/>
                </Switch>
            </div>
        )
    }
}

export default MainPage