import React, { Component } from 'react'
import { translate } from '../../services/translate'
import { bytesToSize } from '../../services/bytesToSize'
import { getListHistory } from '../../services/apis/HistoryAPI'
import { getCapture, getBehaviorReport } from '../../services/apis/CaptureAPI'


// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
// import getCapture from '../../services/helpers/getCapture';
// import { createMuiTheme } from '@material-ui/core/styles';
// import { ThemeProvider } from '@material-ui/styles';


const styles = {
    AppBar: {
        background: 'transparent',
        boxShadow: 'none',
        width: '100%'
    },
};

class UrlDetailPage extends Component {

    state = {
        item_capture: {},
        list_capture: [],
        isLoading: true,
    }
    showProcModules = {}
    showSignatureMarks = {}

    componentDidMount() {

        const { match } = this.props

        this.setState({ isLoading: true })

        // hash = match.params.hash

        getCapture(match.params.capture_id).then(item => {
            console.log('~~ item', item)
            this.setState({
                item_capture: item,
                isLoading: false
            })

        });
    }

    render() {

        const { item_capture, isLoading } = this.state

        if (isLoading) {
            return <p>Loading ...</p>
        }

        return (
            <div class="CaptureDetailPage">
                <h1 className='PageTitle'>{item_capture.hash}</h1>

                <div class={`status alerts alert-${this._getColor(item_capture.status)}`}>
                    {/* {item_capture.status} */}
                    <span class={(item_capture.detected_by && item_capture.detected_by.includes('HAN_sec') && !item_capture.detected_by.includes('virustotal')) ? 'bold underline' : (item_capture.detected_by && item_capture.detected_by.includes('static')) ? 'italic' : ''}>{item_capture.status}</span>
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
                                <div class="ItemTitle">{item_capture.date_received} {item_capture.time_received}</div>
                                <div class="ItemNote">{translate['Time received']}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row hist-tabs">


                </div>

                <div class="row">
                </div>
            </div>

        )
    }
}

export default UrlDetailPage
