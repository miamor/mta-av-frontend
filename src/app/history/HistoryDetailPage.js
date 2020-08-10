import React, { Component } from 'react'
import { translate } from '../../services/translate'
import {bytesToSize} from '../../services/bytesToSize'
import { getCapture } from '../../services/apis/CaptureAPI'

class HistoryDetailPage extends Component {

    state = {
        item_history: {},
        isLoading: false,
    }

    componentDidMount() {

        const { match } = this.props

        this.setState({ isLoading: true })

        // hash = match.params.hash

        let historyItem = getCapture(match.params.history_id)
        historyItem.then(item => {
            console.log(item)
            if (item.detected_by == '' || item.detected_by == null) {
                item.status = 'OK'
            } else {
                item.status = 'DANGER'
            }
            if (item.scan_time == null) {
                item.scan_time = 0
            }
            this.setState({
                item_history: item,
                isLoading: false
            })
        });
    }

    _getColor = (status) => {
        if (status === 'OK') return 'green'
        if (status === 'CRITICAL') return 'orange'
        if (status === 'DANGER') return 'red'
    }

    lowercase = (status) => {
        if (status === 'OK') return 'success'
        if (status === 'CRITICAL') return 'warning'
        if (status === 'DANGER') return 'danger'
        return ''
    }

    render() {

        const { item_history, isLoading } = this.state

        if (isLoading) {
            return <p>Loading ...</p>
        }

        return (
            <div class="HistoryDetailPage">
                <h1 className='PageTitle'>{item_history.hash}</h1>

                <div class={`status alerts alert-${this.lowercase(item_history.status)}`}>
                    {item_history.status}
                </div>

                <div class="row overview">
                    <div class="Item col">
                        <div class="ItemTitle">{item_history.hash}</div>
                        <div class="ItemNote">{item_history.file_name}</div>
                    </div>
                    <div class="Item Last col">
                        <div class="row file-basic-info">
                            <div class="Item col">
                                <div class="ItemTitle">{bytesToSize(item_history.file_size)}</div>
                                <div class="ItemNote">{translate['Size']}</div>
                            </div>
                            <div class="Item Last col">
                                <div class="ItemTitle">{item_capture.date_received} {item_capture.time_received}</div>
                                <div class="ItemNote">{translate['Time received']}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                        <div class="cardo basic-properties">
                            <div class="cardo-header">
                                <h3 id="title">Basic properties</h3>
                            </div>
                            <div class="cardo-content properties">
                                <div class="property-list">
                                    <div class="rows">
                                        <a class="label">{translate['File type']}</a>
                                        <div class="value"> 
                                            <span>{item_history.file_type}</span>
                                        </div> 
                                    </div>
                                    <div class="rows">
                                        <a class="label">MD5</a>
                                        <div class="value"> 
                                            <span>{item_history.md5}</span>
                                        </div> 
                                    </div>
                                    <div class="rows">
                                        <a class="label">SHA-1</a>
                                        <div class="value"> 
                                            <span>{item_history.sha1}</span>
                                        </div> 
                                    </div>
                                    <div class="rows">
                                        <a class="label">SHA-256</a>
                                        <div class="value"> 
                                            <span>{item_history.sha256}</span>
                                        </div> 
                                    </div>
                                    <div class="rows">
                                        <a class="label">SHA-512</a>
                                        <div class="value"> 
                                            <span>{item_history.sha512}</span>
                                        </div> 
                                    </div>
                                    <div class="rows">
                                        <a class="label">ssdeep</a>
                                        <div class="value"> 
                                            <span>{item_history.ssdeep}</span>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>

                <div class="row">
                        <div class="cardo scan-details">
                            <div class="cardo-header">
                                <h3 id="title">Details</h3>
                            </div>
                            <div class="cardo-content properties">
                                <div class="property-list">
                                    <div class="rows">
                                        <a class="label">{translate['File name']}</a>
                                        <div class="value"> 
                                            <span>{item_history.file_name}</span>
                                        </div> 
                                    </div>
                                    <div class="rows">
                                        <a class="label">{translate['File path']}</a>
                                        <div class="value"> 
                                            <span>{item_history.file_path}</span>
                                        </div> 
                                    </div>
                                    <div class="rows">
                                        <a class="label">{translate['Scan time']}</a>
                                        <div class="value"> 
                                            <span>{item_history.scan_time}s</span>
                                        </div> 
                                    </div>
                                    { (item_history.status !== 'OK') ? (
                                    <div class="rows">
                                        <a class="label">{translate['Detected by']}</a>
                                        <div class="value"> 
                                            <span>{item_history.detected_by}</span>
                                        </div> 
                                    </div>
                                    ) : '' }
                                    <div class="clearfix"></div>
                                </div>

                                <hr/>

                                <div class="property-list">
                                    <div class="rows">
                                        <a class="label">{translate['Source IP']}</a>
                                        <div class="value"> 
                                            <span>{item_history.source_ip}</span>
                                        </div> 
                                    </div>
                                    <div class="rows">
                                        <a class="label">{translate['Destination IP']}</a>
                                        <div class="value"> 
                                            <span>{item_history.destination_ip}</span>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>

                        )
                    }
                }
                
export default HistoryDetailPage