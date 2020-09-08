import React, { Component } from 'react'
import { Table } from 'reactstrap'
import { translate } from '../../services/translate'
import { bytesToSize } from '../../services/bytesToSize'
import { getListCapture } from '../../services/apis/CaptureAPI'

// import {table_event} from './sample'

class CapturePage extends Component {

    state = {
        selected: 0,
        list_capture: [],
        isLoading: false,
        mode: 0,
        filter: {}
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })

        this.getList()

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            this.getList()
        })
    }
    componentWillUnmount() {
        this.unlisten()
    }

    getList = () => {
        console.log('*** mode', this.state.mode, 'filter', this.state.filter)
        let captureList = getListCapture(this.state.mode, this.state.filter)
        this.postProcess(captureList)
    }

    postProcess = (captureList) => {
        captureList.then(data => {
            data.map((item, index) => {
                if (item.detected_by === '' || item.detected_by == null) {
                    item.status = 'OK'
                } else {
                    item.detected_by_arr = item.detected_by.split(',')
                    item.num_detected_by = item.detected_by_arr.length
                    if (item.detected_by.includes('virustotal') || item.detected_by.includes('HAN_sec') || item.detected_by.includes('static')) {
                        item.status = 'DANGER'
                    } else if (item.num_detected_by > 1) {
                        item.status = 'CRITICAL'
                    } else {
                        // item.tatus = 'OK'
                        item.status = 'CRITICAL'
                    }
                }
                // if (item.detected_by !== null && (item.detected_by.includes('HAN_sec') || item.detected_by.includes('virustotal'))) {
                //     item.status = 'DANGER'
                // }
            })
            this.setState({
                list_capture: data,
                isLoading: false
            })
        })
    }

    _getColor = (status) => {
        if (status === 'OK') return 'success'
        if (status === 'CRITICAL') return 'warning'
        if (status === 'DANGER') return 'danger'
    }

    _handleSelect = (capture_id) => {
        // this.setState({selected: index})
        // return <Redirect to='/a/capture/{capture_id}' />
        this.props.history.push(`/a/capture/${capture_id}`)
    }

    show = (mode) => {
        this.setState({ mode: mode })
        this.getList()
    }


    handleChange = (event) => {
        let filter = this.state.filter
        // console.log('***', 'event.target.name', event.target.name, filter)
        filter[event.target.name] = event.target.value
        this.setState({ filter: filter })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.getList()
    }

    updateFilter = (key, val) => {
        let filter = this.state.filter
        filter[key] = val
        this.setState({ filter: filter }, () => {
            // and update list
            this.getList()
        })
    }
    resetFilter = () => {
        this.setState({ filter: {} }, () => {
            console.log('*** reset', this.state.filter)
            this.getList()
        })
    }

    render() {

        const { selected, list_capture, isLoading } = this.state

        if (isLoading) {
            return <p>Loading ...</p>
        }

        console.log('list_capture', list_capture)

        return (
            <div className='CapturePage'>
                <h1 className='PageTitle'>{translate['Scan History']}</h1>

                <button id='show_all' onClick={() => this.show(0)}>Show all</button>
                <button id='show_mal' onClick={() => this.show(1)}>Malwares only</button>


                <div class="callout callout-info">
                    <div class="close" onClick={() => this.resetFilter()}>
                        <i class="fa fa-times"></i>
                    </div>
                    <div class="callout-content">
                        <h5 class="callout-header">{translate['Filter']}</h5>
                        <form class="filter-form" onSubmit={this.handleSubmit}>
                            <div class="row">
                                <div class="label col-3">{translate['Source IP']}</div>
                                <div class="value col-9">
                                    <input type="text" name="source_ip" value={this.state.filter['source_ip']} onChange={this.handleChange} />
                                </div>
                                <div class="clearfix"></div>
                            </div>
                            <div class="row">
                                <div class="label col-3">{translate['Destination IP']}</div>
                                <div class="value col-9">
                                    <input type="text" name="destination_ip" value={this.state.filter['destination_ip']} onChange={this.handleChange} />
                                </div>
                                <div class="clearfix"></div>
                            </div>
                            <div class="row">
                                <div class="label col-3">{translate['Protocol']}</div>
                                <div class="value col-9">
                                    <input type="text" name="protocol" value={this.state.filter['protocol']} onChange={this.handleChange} />
                                </div>
                                <div class="clearfix"></div>
                            </div>
                            <div class="row">
                                <div class="label col-3">Hash</div>
                                <div class="value col-9">
                                    <input type="text" name="hash" value={this.state.filter['hash']} onChange={this.handleChange} />
                                </div>
                                <div class="clearfix"></div>
                            </div>
                            <div class="form-submit-btns center">
                                {/* <input type="submit" value="Submit" /> */}
                                <button onClick={this.handleSubmit} class="btn btn-default">{translate['Filter']}</button>
                            </div>
                        </form>
                    </div>
                </div>

                {(list_capture.length === 0) ? 'Empty' : (
                    <div className='Table'>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th width='4%'>#</th>
                                    <th width='10%'>{translate['Source IP']}</th>
                                    <th width='10%'>{translate['Destination IP']}</th>
                                    <th width='5%' class='center'>{translate['Protocol']}</th>
                                    <th width='15%' class='center'>{translate['Time received']}</th>
                                    <th width='15%'>{translate['File name']}</th>
                                    <th width='20%' class='center'>Hash</th>
                                    <th width='8%'>{translate['Size']}</th>
                                    <th width='10%' class='center'>{translate['Status']}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list_capture.map((item, index) => (
                                        <tr key={`domain-${index}`}>
                                            <td class='stt' scope='row'>
                                                <a href={`/a/capture/${item.capture_id}`}>{item.capture_id}</a>
                                            </td>
                                            <td>
                                                <span class='filtering source_ip' onClick={() => this.updateFilter('source_ip', item.source_ip)}>
                                                    {item.source_ip}
                                                </span>
                                            </td>
                                            <td>
                                                <span class='filtering destination_ip' onClick={() => this.updateFilter('destination_ip', item.destination_ip)}>
                                                    {item.destination_ip}
                                                </span>
                                            </td>
                                            <td class='center'>
                                                <span class='filtering protocol' onClick={() => this.updateFilter('protocol', item.protocol)}>
                                                    {item.protocol}
                                                </span>
                                            </td>
                                            <td class='center'>{item.date_received} {item.time_received}</td>
                                            <td>
                                                <a class='file_name' href={`/a/capture/${item.capture_id}`}>
                                                    {item.file_name}
                                                </a>
                                            </td>
                                            <td>
                                                <span class='filtering file_hash' onClick={() => this.updateFilter('hash', item.hash)}>
                                                    {item.hash}
                                                </span>
                                            </td>
                                            <td>{bytesToSize(item.file_size)}</td>
                                            {/* <td class='center' style={{color:this._getColor(item.status)}}> */}
                                            <td class={`item-stt center text-` + this._getColor(item.status)}>
                                                <span class={(item.detected_by && item.detected_by.includes('HAN_sec') && !item.detected_by.includes('virustotal')) ? 'bold underline' : (item.detected_by && item.detected_by.includes('static')) ? 'italic' : ''}>{item.status}</span>
                                                { (item.detected_by && item.detected_by.includes('static')) ? (<span class={`badge badge-` + this._getColor(item.status)}>S</span>) : (<span class={`badge badge-` + this._getColor(item.status)}>{item.num_detected_by}</span>
                                                ) }
                                            </td>
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

export default CapturePage