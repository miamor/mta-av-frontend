import React, {Component} from 'react'
import {Input} from 'reactstrap'

import {logoutUser} from '../../services/AuthServices'
import getHistory from '../../services/helpers/getHistory'

class Header extends Component{

    _handleLogout = () => {
        logoutUser()
        getHistory().push('/login')
    }

    render(){
        return(
            <div className='Header'>
                <div className='LeftHeader'>
                    <Input placeholder='Search file name or hash code'/>
                    <div className='LeftMenu'>
                        <i className="fas fa-bars"></i>
                    </div>
                    <div className='TitleHeader'>mtaAV Antivirus</div>
                </div>
                <div className='RightHeader'>
                    <i className="fas fa-globe"></i>
                    <i className="fas fa-bell"></i>
                    <i className="fas fa-sign-out-alt" onClick={this._handleLogout}></i>
                </div>

            </div>
        )
    }
}

export default Header