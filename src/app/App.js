import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import PageLayout from './layout/PageLayout'
import LoginPage from './login/LoginPage'

class App extends Component{

    render(){
        return(
            <div className='App'>
                <Switch>
                    <Route path='/a' component={PageLayout}/>
                    <Route path='/login' component={LoginPage}/>
                    <Redirect to='/a'/>
                </Switch>
            </div>
        )
    }
}

export default App