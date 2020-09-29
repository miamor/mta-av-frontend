import React, {Component} from 'react'
import {Table} from 'reactstrap'
import {translate} from '../../services/translate'
import {bytesToSize} from '../../services/bytesToSize'
import {getListCapture} from '../../services/apis/CaptureAPI'

// import {table_event} from './sample'

class CapturePage extends Component{

    state = {
        selected: 0,
        list_capture: [],
        isLoading: false,
    }

    componentDidMount() {
        this.setState({ isLoading: true });
     
        /*fetch('http://10.10.10.19:5002/api/v1/capture')
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
        });*/
        
        let captureList = getListCapture()
        captureList.then(data => {
            data.map((item, index) => {
                if (item.detected_by == '' || item.detected_by == null) {
                    item.status = 'OK'
                } else {
                    item.detected_by_arr = item.detected_by.split(',')
                    item.num_detected_by = item.detected_by_arr.length
                    if (item.detected_by.includes('virustotal') || item.detected_by.includes('HAN_sec') || item.detected_by.includes('static')) {
                        item.status = 'DANGER'
                    } else if (item.detected_by.includes('cuckoo')) {
                        item.status = 'CRITICAL'
                    } else {
                        item.status = 'OK'
                    }
                }
            })
            this.setState({
                list_capture: data, 
                isLoading: false 
            })
        })
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

        console.log('list_capture', list_capture)

        return(
            <div className='CapturePage'>
                <h1 className='PageTitle'>{translate['Scan History']}</h1>

                <div className='Table'>
                    <Table striped>
                        <thead>
                            <tr>
                                <th width='3%'>#</th>
                                <th width='25%'>{translate['File name']}</th>
                                <th width='25%'>Hash</th>
                                <th width='8%'>{translate['Size']}</th>
                                <th width='8%'>{translate['Status']}</th>
                                <th>{translate['Source IP']}</th>
                                <th>{translate['Destination IP']}</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            list_capture.map((item, index) => (
                                <tr key={`domain-${index}`} onClick={() => this._handleSelect(index)} style={{cursor: 'pointer'}}>
                                    <td class='stt' scope='row'>{index+1}</td>
                                    <td class='file_name'>
                                        <a href={`/a/capture/${ item.capture_id }`}>
                                            {item.file_name}
                                        </a> 
                                    </td>
                                    <td>{item.hash}</td>
                                    <td>{bytesToSize(item.file_size)}</td>
                                    <th style={{color:this._getColor(item.status)}}>{item.status}</th>
                                    <td>{item.source_ip}</td>
                                    <td>{item.destination_ip}</td>
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