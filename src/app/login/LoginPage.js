import React, {Component} from 'react'
import {FormGroup, Label, Input, Button} from 'reactstrap'

class LoginPage extends Component{
    render(){
        return(
            <div className='LoginPage'>
                <div className='HeaderLogin'>MTA Antivirus</div>
                <FormGroup>
                    <Label>Email</Label>
                    <Input type='email' placeholder='Email'/>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input type='password' placeholder='Password'/>
                </FormGroup>
                <Button className='ButtonLogin'>
                    Login
                </Button>
            </div>
        )
    }
}

export default LoginPage