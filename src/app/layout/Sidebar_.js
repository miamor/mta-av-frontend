import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {getUserData} from '../../services/AuthServices'
import { translate } from '../../services/translate'

class Sidebar extends Component{

    render(){

        return(
            <div className='Sidebar'>
                <div className='Title'>mtaDeepInspector</div>
                <div className='Menu'>
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
                    {
                        getUserData().isAdmin &&
                        <NavLink to='/a/settings'>
                            <div className='Item'>
                                <i className="fas fa-gear"></i>
                                {translate['Settings']}
                            </div>
                        </NavLink>
                    }
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
            </div>
        )
    }
}

export default Sidebar