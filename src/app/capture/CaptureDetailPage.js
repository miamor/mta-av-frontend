import React, { Component } from 'react'
import { translate } from '../../services/translate'
import { bytesToSize } from '../../services/bytesToSize'
import { getCapture } from '../../services/apis/CaptureAPI'

class CaptureDetailPage extends Component {

    state = {
        item_capture: {},
        isLoading: false,
    }

    componentDidMount() {

        const { match } = this.props

        this.setState({ isLoading: true })

        // hash = match.params.hash

        let captureItem = getCapture(match.params.capture_id)
        captureItem.then(item => {
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
                item_capture: item,
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

        const { item_capture, isLoading } = this.state

        if (isLoading) {
            return <p>Loading ...</p>
        }

        return (
            <div class="CaptureDetailPage">
                <h1 className='PageTitle'>{item_capture.hash}</h1>

                <div class={`status alerts alert-${this.lowercase(item_capture.status)}`}>
                    {item_capture.status}
                </div>

                <div class="row overview">
                    <div class="Item col">
                        <div class="ItemTitle">{item_capture.hash}</div>
                        <div class="ItemNote">{item_capture.file_name}</div>
                    </div>
                    <div class="Item Last col">
                        <div class="row file-basic-info">
                            <div class="Item col">
                                <div class="ItemTitle">{bytesToSize(item_capture.file_size)}</div>
                                <div class="ItemNote">{translate['Size']}</div>
                            </div>
                            <div class="Item Last col">
                                <div class="ItemTitle">{item_capture.time_received}</div>
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
                                        <span>{item_capture.file_type}</span>
                                    </div>
                                </div>
                                <div class="rows">
                                    <a class="label">MD5</a>
                                    <div class="value">
                                        <span>{item_capture.md5}</span>
                                    </div>
                                </div>
                                <div class="rows">
                                    <a class="label">SHA-1</a>
                                    <div class="value">
                                        <span>{item_capture.sha1}</span>
                                    </div>
                                </div>
                                <div class="rows">
                                    <a class="label">SHA-256</a>
                                    <div class="value">
                                        <span>{item_capture.sha256}</span>
                                    </div>
                                </div>
                                <div class="rows">
                                    <a class="label">SHA-512</a>
                                    <div class="value">
                                        <span>{item_capture.sha512}</span>
                                    </div>
                                </div>
                                <div class="rows">
                                    <a class="label">ssdeep</a>
                                    <div class="value">
                                        <span>{item_capture.ssdeep}</span>
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
                                        <span>{item_capture.file_name}</span>
                                    </div>
                                </div>
                                <div class="rows">
                                    <a class="label">{translate['File path']}</a>
                                    <div class="value">
                                        <span>{item_capture.file_path}</span>
                                    </div>
                                </div>
                                <div class="rows">
                                    <a class="label">{translate['Scan time']}</a>
                                    <div class="value">
                                        <span>{item_capture.scan_time}s</span>
                                    </div>
                                </div>
                                {(item_capture.status !== 'OK') ? (
                                    <div class="rows">
                                        <a class="label">{translate['Detected by']}</a>
                                        <div class="value">
                                            <span>{item_capture.detected_by}</span>
                                        </div>
                                    </div>
                                ) : ''}
                                <div class="clearfix"></div>
                            </div>

                            <hr />

                            <div class="property-list">
                                <div class="rows">
                                    <a class="label">{translate['Source IP']}</a>
                                    <div class="value">
                                        <span>{item_capture.source_ip}</span>
                                    </div>
                                </div>
                                <div class="rows">
                                    <a class="label">{translate['Destination IP']}</a>
                                    <div class="value">
                                        <span>{item_capture.destination_ip}</span>
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

export default CaptureDetailPage