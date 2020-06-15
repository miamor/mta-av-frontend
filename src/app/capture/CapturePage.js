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
     
        let captureList = getListCapture()
        captureList.then(data => {
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
        })
    }

    _getColor = (status) => {
        if (status === 'OK') return 'green'
        if (status === 'CRITICAL') return 'orange'
        if (status === 'DANGER') return 'red'
    }

    _handleSelect = (capture_id) => {
        // this.setState({selected: index})
        // return <Redirect to='/a/capture/{capture_id}' />
        this.props.history.push(`/a/capture/${capture_id}`)
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
                                <th>{translate['Source IP']}</th>
                                <th>{translate['Destination IP']}</th>
                                <th>{translate['Protocol']}</th>
                                <th width='25%'>{translate['File name']}</th>
                                <th width='25%'>Hash</th>
                                <th width='8%'>{translate['Size']}</th>
                                <th width='8%'>{translate['Status']}</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            list_capture.map((item, index) => (
                                <tr key={`domain-${index}`} onClick={() => this._handleSelect(item.capture_id)} style={{cursor: 'pointer'}}>
                                    {/* <td class='stt' scope='row'>{index+1}</td> */}
                                    <td>{item.source_ip}</td>
                                    <td>{item.destination_ip}</td>
                                    <td>{item.protocol}</td>
                                    <td class='file_name'>
                                        <a href={`/a/capture/${ item.capture_id }`}>
                                            {item.file_name}
                                        </a>
                                    </td>
                                    <td>
                                        <a href={`/a/history/search/${ item.hash }`}>
                                            {item.hash}
                                        </a>
                                    </td>
                                    <td>{bytesToSize(item.file_size)}</td>
                                    <th style={{color:this._getColor(item.status)}}>{item.status}</th>
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