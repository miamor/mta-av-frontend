import React, {Component} from 'react'
import WithAuth from "./WithAuth"
import {Redirect} from "react-router-dom"

class EnsureLoggedIn extends Component {
    render() {
        return (
            <WithAuth>
                {
                    ({isAuthenticated}) => {
                        return isAuthenticated ? this.props.children : <Redirect to='/login'/>
                    }
                }
            </WithAuth>
        )
    }
}

export default EnsureLoggedIn