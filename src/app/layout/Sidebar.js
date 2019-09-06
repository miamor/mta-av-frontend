import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {getUserData} from '../../services/AuthServices'

class Sidebar extends Component{

    render(){

        return(
            <div className='Sidebar'>
                <div className='Title'>mtaAV Antivirus</div>
                <div className='Menu'>
                    <NavLink to='/a/home'>
                        <div className='Item'>
                            <i className="fas fa-home"></i>
                            Home
                        </div>
                    </NavLink>
                    <NavLink to='/a/dashboard'>
                        <div className='Item'>
                            <i className="fas fa-chart-bar"></i>
                            Dashboard
                        </div>
                    </NavLink>
                    <NavLink to='/a/scan'>
                        <div className='Item'>
                            <i className="fab fa-stumbleupon-circle"></i>
                            Scan
                        </div>
                    </NavLink>
                    <NavLink to='/a/about'>
                        <div className='Item'>
                            <i className="fas fa-user-friends"></i>
                            About Us
                        </div>
                    </NavLink>
                    {
                        getUserData().isAdmin &&
                        <NavLink to='/a/user'>
                            <div className='Item'>
                                <i className="fas fa-users"></i>
                                Users
                            </div>
                        </NavLink>
                    }
                </div>
            </div>
        )
    }
}

export default Sidebar