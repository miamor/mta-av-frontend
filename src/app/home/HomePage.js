import React, {Component} from 'react'
import {Table} from 'reactstrap'

// import {table_event} from './sample'

class HomePage extends Component{

    state = {
        selected: 0,
        list_capture: [],
        isLoading: false,
    }

    componentDidMount() {
        this.setState({ isLoading: true });
     
        fetch('http://192.168.126.26:5002/api/v1/capture')
        .then(response => response.json())
        .then(data => {
            data.map((item, index) => {
                if (item.detected_by == '' || item.detected_by == null) {
                    item.status = 'OK'
                } else {
                    item.status = 'DANGER'
                }
            })
            this.setState({
                list_capture: data, 
                isLoading: false 
            })
        });
    }

    _getColor = (status) => {
        if (status === 'OK') return 'green'
        if (status === 'CRITICAL') return 'orange'
        if (status === 'DANGER') return 'red'
    }

    _handleSelect = (index) => {
        this.setState({selected: index})
    }

    render() {

        const { selected, list_capture, isLoading } = this.state
 
        if (isLoading) {
          return <p>Loading ...</p>
        }

        if (list_capture.length === 0) {
            return <p>Empty</p>
        }

        return(
            <div className='HomePage row'>
                <div className='Table col'>
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
                            list_capture.map((item, index) => (
                                <tr key={`domain-${index}`} onClick={() => this._handleSelect(index)} style={{cursor: 'pointer'}}>
                                    <th scope='row'>{index+1}</th>
                                    <td class='file_name'>{item.file_name}</td>
                                    <td>{item.file_size}</td>
                                    <td>{item.time_received}</td>
                                    <th style={{color:this._getColor(item.status)}}>{item.status}</th>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </div>
                <div className='Detail col'>
                    <div className='Header'>{list_capture[selected].file_name}</div>
                    <Table striped>
                        <tbody>
                            <tr>
                                <th>Size</th>
                                <td>{list_capture[selected].file_size}</td>
                            </tr>
                            <tr>
                                <th>Time Received</th>
                                <td>{list_capture[selected].time_received}</td>
                            </tr>
                            <tr>
                                <th>Status</th>
                                <th style={{color:this._getColor(list_capture[selected].status)}}>{list_capture[selected].status}</th>
                            </tr>
                            <tr>
                                <th>MD5</th>
                                <td>{list_capture[selected].md5}</td>
                            </tr>
                            <tr>
                                <th>File Type</th>
                                <td>{list_capture[selected].file_extension}</td>
                            </tr>
                        </tbody>
                    </Table>     
                </div>
            </div>
        )
    }
}

export default HomePage