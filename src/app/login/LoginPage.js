import React, {Component} from 'react'
import {FormGroup, Label, Input, Button} from 'reactstrap'
import {Redirect} from 'react-router-dom'

import {getAccessToken, setAccessToken, setUserData, tryLogin} from '../../services/AuthServices'
import getHistory from '../../services/helpers/getHistory'

// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

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

    checkLogin = (email, password) => {
        console.log('~~ [checkLogin] password', password)

        tryLogin({email: email, password: password}).then(resp => {
            console.log('~~ resp', resp)
            if (!resp['status']) { // error
                this.setState({'error': resp['message']})
            } else {
                // let user_info = resp['data']
                setAccessToken(resp['data']['Authorization'])
                setUserData({isAdmin: true})
                return  getHistory().push({pathname: '/a'})
            }
        });

        // if (email === 'admin@mail.com' && password === '123456a@'){
        //     setAccessToken('thisisademoaccesstoken')
        //     setUserData({isAdmin: true})
        //     return  getHistory().push({pathname: '/a'})
        // }
        // else if (email === 'user@mail.com' && password === '123456a@'){
        //     setAccessToken('thisisademoaccesstoken')
        //     setUserData({isAdmin: false})
        //     return  getHistory().push({pathname: '/a'})
        // }
        // else {
        //     this.setState({
        //         error: 'Tên tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại!'
        //     }, () => setTimeout(() => this.setState({error: ''}), 2000))
        // }
    }

    _handleClickLogin = () => {
        const {email, password} = this.state

        // bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        //     this.checkLogin(email, hash)
        // });

        this.checkLogin(email, password)
    }

    render(){

        if (getAccessToken()) return <Redirect to='/a'/>
        const {email, password, error} = this.state

        return(
            <div className='LoginPage'>
                <div className='HeaderLogin'>MTA Deep Inspector</div>
                <FormGroup>
                    <Label>Tài Khoản</Label>
                    <Input type='email' placeholder='Email' value={email} onChange={this._handleChangeEmail}/>
                </FormGroup>
                <FormGroup>
                    <Label>Mật Khẩu</Label>
                    <Input type='password' placeholder='Password' value={password} onChange={this._handleChangePassword}/>
                </FormGroup>
                <div className='Message'>
                    {error}
                </div>
                <Button className='ButtonLogin' onClick={this._handleClickLogin}>
                    Đăng nhập
                </Button>
            </div>
        )
    }
}

export default LoginPage