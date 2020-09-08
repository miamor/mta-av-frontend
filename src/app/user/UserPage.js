import React, {Component} from 'react'
import {Table,} from 'reactstrap'
import {Redirect} from 'react-router-dom'

import {list_user} from './asset'
import {getUserData} from '../../services/AuthServices'
import { translate } from '../../services/translate'

class UserPage extends Component{


    _getColor = (role) => {
        if (role === 'Admin') return 'red'
        if (role === 'User') return 'green'
    }

    render(){

        if (!getUserData().isAdmin) return <Redirect to='/a'/>

        return(
            <div className='UserPage'>
                <h1 className='PageTitle'>{translate['Users']}</h1>

                <div className='Table row'>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            list_user.map((item, index) => (
                                <tr key={`domain-${index}`}>
                                    <th scope='row'>{index+1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                    <td>{item.phone}</td>
                                    <th style={{color: this._getColor(item.role)}}>{item.role}</th>
                                    <th>
                                        <i className="fas fa-user-edit" title='Edit User'></i>
                                        <i className="fas fa-user-slash" title='Remove User'></i>
                                    </th>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default UserPage