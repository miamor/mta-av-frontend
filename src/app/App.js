import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import PageLayout from './layout/PageLayout'
import LoginPage from './login/LoginPage'
import WithAuth from './shared/WithAuth'

class Navigator extends Component {
    render() {
        return (
            <WithAuth>
                {
                    ({isAuthenticated}) => {
                        const redirectTo = isAuthenticated ? '/a' : '/login'
                        return <Redirect to={redirectTo}/>
                    }
                }
            </WithAuth>
        )
    }
}

class App extends Component{

    render(){
        return(
            <div className='App'>
                <Switch>
                    <Route exact path='/' component={Navigator} />
                    <Route path='/a' component={PageLayout}/>
                    <Route path='/login' component={LoginPage}/>
                    <Redirect to='/a'/>
                </Switch>
            </div>
        )
    }
}

export default App