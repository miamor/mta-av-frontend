import React, {Component} from 'react'
import {FormGroup, Label, Input, Button} from 'reactstrap'
import {Redirect} from 'react-router-dom'

import {getAccessToken, setAccessToken, setUserData} from '../../services/AuthServices'
import getHistory from '../../services/helpers/getHistory'

class LoginPage extends Component{

    state = {
        email: '',
        password: '',
        error: '',
    }

    _handleChangeEmail = e => {
        this.setState({email: e.target.value})
    }

    _handleChangePassword = e => {
        this.setState({password: e.target.value})
    }

    _handleClickLogin = () => {
        const {email, password} = this.state

        if (email === 'admin@mail.com' && password === '123456a@'){
            setAccessToken('thisisademoaccesstoken')
            setUserData({isAdmin: true})
            return  getHistory().push({pathname: '/a'})
        }
        else if (email === 'user@mail.com' && password === '123456a@'){
            setAccessToken('thisisademoaccesstoken')
            setUserData({isAdmin: false})
            return  getHistory().push({pathname: '/a'})
        }
        else{
            this.setState({
                error: 'Wrong username or password'
            }, () => setTimeout(() => this.setState({error: ''}), 2000))
        }
    }

    render(){

        if (getAccessToken()) return <Redirect to='/a'/>
        const {email, password, error} = this.state

        return(
            <div className='LoginPage'>
                <div className='HeaderLogin'>MTA Deep Inspector</div>
                <FormGroup>
                    <Label>Email</Label>
                    <Input type='email' placeholder='Email' value={email} onChange={this._handleChangeEmail}/>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input type='password' placeholder='Password' value={password} onChange={this._handleChangePassword}/>
                </FormGroup>
                <div className='Message'>
                    {error}
                </div>
                <Button className='ButtonLogin' onClick={this._handleClickLogin}>
                    Login
                </Button>
            </div>
        )
    }
}

export default LoginPage