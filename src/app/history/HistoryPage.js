import React, { Component } from 'react'
import { Table } from 'reactstrap'
import { translate } from '../../services/translate'
import { bytesToSize } from '../../services/bytesToSize'
import { getListHistory } from '../../services/apis/HistoryAPI'
import {Link} from 'react-router-dom'

class HistoryPage extends Component {

    state = {
        selected: 0,
        list_capture: [],
        isLoading: false,
        hash: null
    }

    componentDidMount() {

        const { match } = this.props
        let hash = match.params.hash

        this.getList(hash)
    }

    componentWillMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            console.log('~~~~this.props', this.props)
            console.log("on route change", location)
            if (location.pathname.indexOf('/search/') > -1) {
                let hash = location.pathname.split('/search/')[1]
                this.getList(hash)
            } else {
                this.getList()
            }
        })
    }
    componentWillUnmount() {
        this.unlisten()
    }

    getList = (hash) => {
        this.setState({
            list_capture: [],
            isLoading: true,
            hash: hash,
        })
        console.log('hash', hash)
        let captureList = getListHistory(hash)
        captureList.then(data => {
            data.map((item, index) => {
                if (item.detected_by === '' || item.detected_by == null) {
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

    searchHash = (hash) => {
        this.props.history.push(`/a/history/search/${hash}`)
        // console.log('search hash', hash)
        // this.getList(hash)
    }

    _getColor = (status) => {
        if (status === 'OK') return 'green'
        if (status === 'CRITICAL') return 'orange'
        if (status === 'DANGER') return 'red'
    }

    _handleSelect = (capture_id) => {
        this.props.history.push(`/a/capture/${capture_id}`)
    }

    render() {

        const { selected, list_capture, isLoading } = this.state

        if (isLoading) {
            return <p>Loading ...</p>
        }

        console.log('list_capture~', list_capture)

        return (
            <div className='HistoryPage'>
                <h1 className='PageTitle'>{translate['Scan History']}</h1>

                {(list_capture.length === 0) ? (
                    <p>Empty</p>
                ) : (
                        <div className='Table'>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th width='4%'>#</th>
                                        <th width='4%'></th>
                                        <th width='25%'>{translate['File name']}</th>
                                        <th width='30%'>Hash</th>
                                        <th width='8%'>{translate['Size']}</th>
                                        <th width='8%'>{translate['Status']}</th>
                                        <th width='10%'>{translate['Source IP']}</th>
                                        <th width='15%'>{translate['Time received']}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        list_capture.map((item, index) => (
                                            <tr key={`domain-${index}`}>
                                                <td class='stt' scope='row' onClick={() => this._handleSelect(item.capture_id)}>{index + 1}</td>
                                                <td class='link' scope='row' onClick={() => this._handleSelect(item.capture_id)}>
                                                    {item.capture_id}
                                                </td>
                                                <td class='file_name link' onClick={() => this._handleSelect(item.capture_id)}>
                                                    {item.file_name}
                                                </td>
                                                <td class='file_hash link' onClick={() => this.searchHash(item.hash)} >
                                                    {item.hash}
                                                </td>
                                                <td>{bytesToSize(item.file_size)}</td>
                                                <td class='center' style={{ color: this._getColor(item.status) }}>{item.status}</td>
                                                <td>{item.source_ip}</td>
                                                <td>{item.date_received} {item.time_received}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                    )}
            </div>
        )
    }
}

export default HistoryPage