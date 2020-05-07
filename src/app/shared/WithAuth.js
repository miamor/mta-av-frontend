import {Component} from 'react'
import PropTypes from 'prop-types'
import {getUserData, isAuthenticated, subscribe, unsubscribe} from "../../services/AuthServices"

class WithAuthentication extends Component {
    state = {
        isAuthenticated: isAuthenticated(),
        user: getUserData()
    }

    componentDidMount() {
        subscribe(this._handleAuthChange)
    }

    componentWillUnmount() {
        unsubscribe(this._handleAuthChange)
    }

    _handleAuthChange = () => {
        this.setState({
            isAuthenticated: isAuthenticated(),
            user: getUserData()
        })
    }

    render() {
        return this.props.children(this.state)
    }
}

WithAuthentication.propTypes = {
    children: PropTypes.func.isRequired,
}

export default WithAuthentication