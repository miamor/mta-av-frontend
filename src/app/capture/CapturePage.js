import React, {Component} from 'react'
import {Table} from 'reactstrap'
import {translate} from '../../services/translate'

// import {table_event} from './sample'

class CapturePage extends Component{

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
            <div className='CapturePage'>
                <h1 className='PageTitle'>{translate['Scan History']}</h1>

                <div className='Table'>
                    <Table striped>
                        <thead>
                            <tr>
                                <th width='5%'>#</th>
                                <th>{translate['File name']}</th>
                                <th>Hash</th>
                                <th width='13%'>{translate['Size']}</th>
                                <th width='13%'>{translate['Status']}</th>
                                <th>{translate['Source IP']}</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            list_capture.map((item, index) => (
                                <tr key={`domain-${index}`} onClick={() => this._handleSelect(index)} style={{cursor: 'pointer'}}>
                                    <td class='stt' scope='row'>{index+1}</td>
                                    <td class='file_name'>
                                        <a href={`/a/capture/${ item.hash }`}>
                                            {item.file_name}
                                        </a> 
                                    </td>
                                    <td>{item.hash}</td>
                                    <td>{item.file_size}</td>
                                    <th style={{color:this._getColor(item.status)}}>{item.status}</th>
                                    <td>{item.source_ip}</td>
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

export default CapturePage