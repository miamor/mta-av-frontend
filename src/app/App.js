import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import PageLayout from './layout/PageLayout'

class App extends Component{

    render(){
        return(
            <div>
                <Switch>
                    <Route path='/a' component={PageLayout}/>
                </Switch>
            </div>
        )
    }
}

export default App