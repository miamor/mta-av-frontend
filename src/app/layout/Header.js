import React, { Component } from 'react'
import { Input } from 'reactstrap'
import { NavLink, Link } from 'react-router-dom'
import { getUserData } from '../../services/AuthServices'

import { logoutUser } from '../../services/AuthServices'
import getHistory from '../../services/helpers/getHistory'
import { translate } from '../../services/translate'
import HistoryPage from '../history/HistoryPage'

class Header extends Component {

    constructor() {
        super();

        this.state = {
            showMenu: false,
        };

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    _handleLogout = () => {
        logoutUser()
        getHistory().push('/login')
    }

    reloadHistory = () => {
        // let list = HistoryPage.getList()
        // this.props.history.push(`/a/history/search/${hash}`)
        // HistoryPage.getList()
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu(event) {

        // if (!this.dropdownMenu.contains(event.target)) {
            this.setState({ showMenu: false }, () => {
                document.removeEventListener('click', this.closeMenu);
            });
        // }
    }

    render() {
        return (
            <div className='Header'>
                <div className='LeftHeader'>
                    <div class='logo'></div>
                    <div class="wide-screen-menu">
                        <NavLink to='/a/dashboard'>
                            <div className='Item'>
                                <i className="fas fa-chart-bar"></i>
                                {translate['Dashboard']}
                            </div>
                        </NavLink>
                        <NavLink to='/a/capture'>
                            <div className='Item'>
                                <i className="fas fa-home"></i>
                                {translate['Live Capture']}
                            </div>
                        </NavLink>
                        {/* <NavLink as={Link} to='/a/history'>
                            <div className='Item'>
                                <i className="fas fa-home"></i>
                                {translate['Scan History']}
                            </div>
                        </NavLink> */}
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
                    <div class="sm-screen-menu">
                        <div className="menu-wrapper">
                            <a class={this.state.showMenu ? 'active' : ''} onClick={this.showMenu}>
                                <div className='Item item-menu'>
                                    <i className="fas fa-bars"></i> Menu
                                </div>
                            </a>

                            {
                                this.state.showMenu
                                    ? (
                                        <div
                                            className="menu-dd"
                                            ref={(element) => {
                                                this.dropdownMenu = element;
                                            }}
                                        >
                                            <NavLink to='/a/dashboard'>
                                                <div className='Item'>
                                                    <i className="fas fa-chart-bar"></i>
                                                    {translate['Dashboard']}
                                                </div>
                                            </NavLink>
                                            <NavLink to='/a/capture'>
                                                <div className='Item'>
                                                    <i className="fas fa-home"></i>
                                                    {translate['Live Capture']}
                                                </div>
                                            </NavLink>
                                            <NavLink as={Link} to='/a/history'>
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
                                    )
                                    : (
                                        null
                                    )
                            }
                        </div>
                    </div>
                </div>
                <div className='RightHeader'>
                    <div class="search-form">
                        <Input placeholder={translate['Search file name or hash code']} />
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