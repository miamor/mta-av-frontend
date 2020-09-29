import React, { Component } from 'react'
import { Table } from 'reactstrap'
import { translate } from '../../services/translate'
import { bytesToSize } from '../../services/bytesToSize'
import { getListCapture } from '../../services/apis/CaptureAPI'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// import {table_event} from './sample'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#004F00',
            contrastText: '#fff',
        },

    },
    status: {
        danger: 'orange',
    },
});


class CapturePage extends Component {

    state = {
        selected: 0,
        list_capture: [],
        isLoading: false,
        filter: {},
        types: {
            malware: true,
            critical: true,
            benign: true
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })

        this.getList()
        setInterval(() => {
            console.log('~~ F5')
            this.getList()
        }, 20000)

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

    handleChange_types = (event) => {
        // setState({ ...state, [event.target.name]: event.target.checked });
        let key = event.target.name.split('__')
        let val_0 = this.state[key[0]]
        let k = key[0]

        if (typeof val_0[key[1]] !== 'object') {
            val_0 = this.update(val_0, key[1])
        } else {
            // for (let i = 1; i < key.length - 1; i++) {
            //     val_0 = this.update(val_0[key[i]], key[i + 1], event.target.checked)
            // }
        }

        this.setState({ k: val_0 })
    }

    update = (obj, key, val) => {
        console.log('~~ update called', 'obj', obj, 'key', key, 'typeof obj[key]', typeof obj[key], '!obj[key]', !obj[key], 'val', val)

        if (typeof obj[key] !== 'object') {
            obj[key] = !obj[key]
        } else {
            console.log('~~ is obj')
        }
        return obj;
    }

    getList = () => {
        let modes = []
        for (let k in this.state.types) {
            if (this.state.types[k] === true) {
                modes.push(k)
            }
        }
        console.log('~~ *** modes', modes, 'filter', this.state.filter)
        let captureList = getListCapture(modes, this.state.filter)
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
                    } else if (item.detected_by.includes('cuckoo')) {
                        item.status = 'CRITICAL'
                    } else {
                        item.status = 'OK'
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
        let total_capture_this_page = list_capture.length

        return (
            <div className='CapturePage'>
                <h1 className='PageTitle'>{translate['Scan History']}</h1>

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

                            <div class="row">
                                <a class="label col-3">{translate['Show']}</a>
                                <div class="value col-9">
                                    <MuiThemeProvider theme={theme}>
                                        <FormControlLabel control={<Checkbox checked={this.state.types['malware']} onChange={this.handleChange_types} disabled={false} name="types__malware" color="primary" />} label="Malware" />

                                        <FormControlLabel control={<Checkbox checked={this.state.types['critical']} onChange={this.handleChange_types} disabled={false} name="types__critical" color="primary" />} label="Critical" />

                                        <FormControlLabel control={<Checkbox checked={this.state.types['benign']} onChange={this.handleChange_types} disabled={false} name="types__benign" color="primary" />} label="Benign" />
                                    </MuiThemeProvider>
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
                                    <th width='14%'>{translate['Source IP']}</th>
                                    <th width='14%'>{translate['Destination IP']}</th>
                                    <th width='4%' class='center'>{translate['Protocol']}</th>
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
                                                <a href={`/a/capture/${item.capture_id}`}>
                                                    {item.capture_id}
                                                    {/* {total_capture_this_page-index} */}
                                                </a>
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
                                            { (item.status != 'OK') ?
                                                (
                                                    <td class={`item-stt center text-` + this._getColor(item.status)}>
                                                        <span class={(item.detected_by && item.detected_by.includes('HAN_sec') && !item.detected_by.includes('virustotal')) ? 'bold underline' : (item.detected_by && item.detected_by.includes('static')) ? 'italic' : ''}>{item.status}</span>
                                                        { (item.detected_by && item.detected_by.includes('static')) ? (<span class={`badge badge-` + this._getColor(item.status)}>S</span>) : (<span class={`badge badge-` + this._getColor(item.status)}>{item.num_detected_by}</span>
                                                        )}
                                                    </td>
                                                ) : (
                                                    <td class={`item-stt center text-` + this._getColor(item.status)}>
                                                        <span>{item.status}</span>
                                                    </td>
                                                )
                                            }
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
