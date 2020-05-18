import React, {Component} from 'react'
import {Input} from 'reactstrap'
import {NavLink} from 'react-router-dom'
import {getUserData} from '../../services/AuthServices'

import {logoutUser} from '../../services/AuthServices'
import getHistory from '../../services/helpers/getHistory'
import { translate } from '../../services/translate'

class Header extends Component{

    _handleLogout = () => {
        logoutUser()
        getHistory().push('/login')
    }

    render(){
        return(
            <div className='Header'>
                <div className='LeftHeader'>
                    <div class='logo'></div>
                    <NavLink to='/a/dashboard'>
                        <div className='Item'>
                            <i className="fas fa-chart-bar"></i>
                            {translate['Dashboard']}
                        </div>
                    </NavLink>
                    <NavLink to='/a/capture'>
                        <div className='Item'>
                            <i className="fas fa-home"></i>
                            {translate['Scan History']}
                        </div>
                    </NavLink>
                    <NavLink to='/a/scan'>
                        <div className='Item'>
                            <i className="fab fa-stumbleupon-circle"></i>
                            {translate['Scan']}
                        </div>
                    </NavLink>
                    <NavLink to='/a/settings'>
                        <div className='Item'>
                            <i className="fas fa-gear"></i>
                            {translate['Settings']}
                        </div>
                    </NavLink>
                    <NavLink to='/a/about'>
                        <div className='Item'>
                            <i className="fas fa-user-friends"></i>
                            {translate['About Us']}
                        </div>
                    </NavLink>
                    {
                        getUserData().isAdmin &&
                        <NavLink to='/a/user'>
                            <div className='Item'>
                                <i className="fas fa-users"></i>
                                {translate['Users']}
                            </div>
                        </NavLink>
                    }
                </div>
                <div className='RightHeader'>
                    <div class="search-form">
                        <Input placeholder={translate['Search file name or hash code']}/>
                    </div>

                    <i className="fas fa-globe"></i>
                    <i className="fas fa-bell"></i>
                    <i className="fas fa-sign-out-alt" onClick={this._handleLogout}></i>
                </div>

            </div>
        )
    }
}

export default Header