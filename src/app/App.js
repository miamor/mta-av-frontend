import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import PageLayout from './layout/PageLayout'

class App extends Component{

    render(){
        return(
            <div className='App'>
                <Switch>
                    <Route path='/a' component={PageLayout}/>
                    <Redirect to='/a'/>
                </Switch>
            </div>
        )
    }
}

export default App