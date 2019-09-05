import React, {Component} from 'react'
import {Table} from 'reactstrap'

import {table_event} from './sample'

class HomePage extends Component{

    state = {
        selected: 0,
    }


    _getColor = (status) => {
        if (status === 'OK') return 'green'
        if (status === 'CRITICAL') return 'orange'
        if (status === 'DANGER') return 'red'
    }

    _handleSelect = (index) => {
        this.setState({selected: index})
    }

    render(){

        const {selected} = this.state

        return(
            <div className='HomePage'>
                <div className='Table'>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>File Name</th>
                                <th>Size</th>
                                <th>Received Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            table_event.map((item, index) => (
                                <tr key={`domain-${index}`} onClick={() => this._handleSelect(index)} style={{cursor: 'pointer'}}>
                                    <th scope='row'>{index+1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.size}</td>
                                    <td>{item.time_received}</td>
                                    <th style={{color: this._getColor(item.status)}}>{item.status}</th>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </div>
                <div className='Detail'>
                    <div className='Header'>{table_event[selected].name}</div>
                    <Table striped>
                        <tbody>
                            <tr>
                                <th>Size</th>
                                <td>{table_event[selected].size}</td>
                            </tr>
                            <tr>
                                <th>Time Received</th>
                                <td>{table_event[selected].time_received}</td>
                            </tr>
                            <tr>
                                <th>Status</th>
                                <th style={{color: this._getColor(table_event[selected].status)}}>{table_event[selected].status}</th>
                            </tr>
                            <tr>
                                <th>MD5</th>
                                <td>{table_event[selected].MD5}</td>
                            </tr>
                            <tr>
                                <th>SHA-1</th>
                                <td>{table_event[selected].SHA}</td>
                            </tr>
                            <tr>
                                <th>File Type</th>
                                <td>{table_event[selected].type}</td>
                            </tr>
                        </tbody>
                    </Table>     
                </div>
            </div>
        )
    }
}

export default HomePage