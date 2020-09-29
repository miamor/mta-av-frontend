import React, { Component } from 'react'
import { translate } from '../../services/translate'
import { bytesToSize } from '../../services/bytesToSize'
import { getListHistory } from '../../services/apis/HistoryAPI'
import { getCapture, getBehaviorReport } from '../../services/apis/CaptureAPI'


import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import getCapture from '../../services/helpers/getCapture';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#004F00',
            // dark: will be calculated from palette.primary.main,
            // contrastText: '#004F00'
        },
        secondary: {
            light: '#0066ff',
            main: '#0044ff',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },

    typography: {
        body1: {
            fontFamily: "'Muli', sans-serif",
            fontWeight: 400,
            fontSize: '0.9rem',
            color: '#212529'
        }
    }

});


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const styles = {
    AppBar: {
        background: 'transparent',
        boxShadow: 'none',
        width: '100%'
    },
};

class CaptureDetailPage extends Component {

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
            if (item.scan_time == null) {
                item.scan_time = 0
            }
            item.detector_output = JSON.parse(item.detector_output)
            this.setState({
                item_capture: item,
                // isLoading: false
            })

            // behavior report
            const { item_capture } = this.state
            console.log('~~item_capture.report_id', item_capture.report_id)
            if (item_capture.report_id != null) {
                getBehaviorReport(item_capture.report_id).then(data => {
                    console.log('~~data', data)
                    if ('behavior' in data) {
                        data.behavior.processes.map((i, key) => {
                            this.showProcModules[key] = 0
                        })
                    }
                    if ('signatures' in data) {
                        data.signatures.map((i, key) => {
                            this.showSignatureMarks[key] = 0
                            // console.log('~~data.signatures', key, data.signatures[key], data.signatures[key]['marks'])
                            // data.signatures[key]['marks'].map((j, k) => {
                            //     for (let m in j) {
                            //         console.log('~~ j[m]', m, j[m])
                            //     }
                            // })
                        })
                    }
                    this.setState({
                        behaviorConst: data,
                        showProcModules: this.showProcModules,
                        showSignatureMarks: this.showSignatureMarks,
                        showStrings: 0,
                        showHosts: 0
                    })
                })
            }

            // all submissions of this hash
            getListHistory(item.hash).then(data => {
                data.map((item_o, index) => {
                    if (item_o.detected_by === '' || item_o.detected_by == null) {
                        item_o.status = 'OK'
                    } else {
                        item_o.detected_by_arr = item_o.detected_by.split(',')
                        item_o.num_detected_by = item_o.detected_by_arr.length
                        if (item_o.detected_by.includes('virustotal') || item_o.detected_by.includes('HAN_sec') || item_o.detected_by.includes('static')) {
                            item_o.status = 'DANGER'
                        } else if (item_o.num_detected_by > 1) {
                            item_o.status = 'CRITICAL'
                        } else {
                            // item_o.tatus = 'OK'
                            item_o.status = 'CRITICAL'
                        }
                    }
                })
                this.setState({
                    list_capture: data,
                    isLoading: false
                })
            })
        });
    }

    toggle = (type, key, state) => {
        let { showProcModules, showSignatureMarks, showStrings, showHosts } = this.state
        // console.log('~~~toggle', type, key, showProcModules, 'showStrings', showStrings, 'state', state)
        if (type == 'processes') {
            showProcModules[key] = state
        } else if (type == 'signatures') {
            showSignatureMarks[key] = state
        } else if (type == 'strings') {
            showStrings = state
        } else if (type == 'hosts') {
            showHosts = state
        }
        this.setState({
            showProcModules: showProcModules,
            showSignatureMarks: showSignatureMarks,
            showStrings: showStrings,
            showHosts: showHosts
        })
    }

    SimpleTabs = () => {
        const [value, setValue] = React.useState(0);

        const handleChange = (event, newValue) => {
            setValue(newValue);
        };
        const { item_capture, list_capture, behaviorConst, isLoading, showProcModules, showSignatureMarks, showStrings, showHosts } = this.state

        if (isLoading) {
            return <p>Loading ...</p>
        }

        let behavior = behaviorConst
        if (behaviorConst == null) {
            behavior = {}
        }

        console.log('~~~ item_capture', item_capture, 'list_capture', list_capture, 'isLoading', isLoading, 'behaviorConst', behaviorConst, 'behavior', behavior, 'detector_output', item_capture.detector_output, " ~~ 'behavior' in behavior", 'behavior' in behavior)

        return (
            <ThemeProvider theme={theme}>
                <AppBar position="static" style={styles.AppBar}>
                    <Tabs indicatorColor="primary"
                        textColor="primary" variant="fullWidth"
                        value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab disableRipple label={translate['Details']} {...a11yProps(0)} />
                        <Tab label={translate['Engines']} {...a11yProps(1)} />
                        <Tab label={translate['History']} {...a11yProps(2)} />
                        <Tab label={translate['Behavior']} {...a11yProps(3)} />
                    </Tabs>
                </AppBar>
                <TabPanel style={{ width: '100%' }} value={value} index={0}>
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
                                    <div class="clearfix"></div>
                                </div>
                                <div class="rows">
                                    <a class="label">MD5</a>
                                    <div class="value">
                                        <span>{item_capture.md5}</span>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="rows">
                                    <a class="label">SHA-1</a>
                                    <div class="value">
                                        <span>{item_capture.sha1}</span>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="rows">
                                    <a class="label">SHA-256</a>
                                    <div class="value">
                                        <span>{item_capture.sha256}</span>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="rows">
                                    <a class="label">SHA-512</a>
                                    <div class="value">
                                        <span>{item_capture.sha512}</span>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="rows">
                                    <a class="label">ssdeep</a>
                                    <div class="value">
                                        <span>{item_capture.ssdeep}</span>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="cardo scan-details">
                        <div class="cardo-header">
                            <h3 id="title">{translate['Details']}</h3>
                        </div>
                        <div class="cardo-content properties">
                            <div class="property-list">
                                <div class="rows">
                                    <a class="label">{translate['File name']}</a>
                                    <div class="value">
                                        <span>{item_capture.file_name}</span>
                                    </div>
                                </div>
                                {/* <div class="rows">
                                    <a class="label">{translate['Scan time']}</a>
                                    <div class="value">
                                        <span>{item_capture.scan_time}s</span>
                                    </div>
                                </div> */}
                                <div class="rows">
                                    <a class="label">{translate['Behavior report']}</a>
                                    <div class="value">
                                        <span>{item_capture.report_id}</span>
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
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <div class="cardo basic-properties">
                        <div class="cardo-header">
                            <h3 id="title">Detector Engines</h3>
                        </div>
                        <div class="cardo-content properties">
                            <div class="property-list">
                                {(item_capture.detector_output == null) ? (
                                    <div class="rows">No output details</div>
                                ) : (
                                        <div>
                                            {Object.keys(item_capture.detector_output).map((engine, index) => (
                                                <div class={`rows detect-div detect-` + item_capture.detector_output[engine]['is_malware']}>
                                                    <h5 class="label">{engine}</h5>
                                                    <div class="valuess value">
                                                        {Object.keys(item_capture.detector_output[engine]).map((key, i) => (
                                                            <div class="rows">
                                                                <a class="label">{key}</a>
                                                                <div class="value">
                                                                    {item_capture.detector_output[engine][key]}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div class="clearfix"></div>
                                                    <hr />
                                                </div>
                                            ))}
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                </TabPanel>

                <TabPanel value={value} index={2}>
                    <div class="cardo scan-history">
                        <div class="cardo-header">
                            <h3 id="title">Submissions</h3>
                        </div>
                        <div class="cardo-content properties">
                            {
                                list_capture.map((item, index) => (
                                    <div class={`property-list detect-div detect-` + item.status} key={`domain-${index}`}>
                                        <div class="rows">
                                            <a class="label">{translate['Submission time']}</a>
                                            <div class="value">
                                                <span>{item.date_received} {item.time_received}</span>
                                            </div>
                                        </div>
                                        {
                                            (item.destination_ip === '' || item.destination_ip == null) ? (
                                                <div class="rows">
                                                    <a class="label">{translate['Submitted from']}</a>
                                                    <div class="value">
                                                        <a href={`/a/capture/${item.capture_id}`}>{item.source_ip}</a>
                                                    </div>
                                                    <div class="clearfix"></div>
                                                </div>
                                            ) : (
                                                    <div class="rows">
                                                        <a class="label">{translate['Capture ID']}</a>
                                                        <div class="value">
                                                            <a href={`/a/capture/${item.capture_id}`}>{item.capture_id}</a> (from {item.source_ip} to {item.destination_ip})
                                                        </div>
                                                        <div class="clearfix"></div>
                                                    </div>
                                                )
                                        }
                                        <div class="rows">
                                            <a class="label">{translate['File name']}</a>
                                            <div class="value">
                                                <span>{item.file_name}</span>
                                            </div>
                                            <div class="clearfix"></div>
                                        </div>
                                        {/* <div class="rows">
                                            <a class="label">{translate['File path']}</a>
                                            <div class="value">
                                                <span>{item.file_path}</span>
                                            </div>
                                            <div class="clearfix"></div>
                                        </div> */}
                                        {/* <div class="rows">
                                            <a class="label">{translate['Scan time']}</a>
                                            <div class="value">
                                                <span>{(item.scan_time ? item.scan_time : 0)}s</span>
                                            </div>
                                        </div> */}
                                        {(item.status !== 'OK') ? (
                                            <div class="rows">
                                                <a class="label">{translate['Detected by']}</a>
                                                <div class="value">
                                                    <span>{item.detected_by}</span>
                                                </div>
                                                <div class="clearfix"></div>
                                            </div>
                                        ) : ''}
                                        <div class="clearfix"></div>
                                        <hr />
                                    </div>
                                ))}

                        </div>
                    </div>
                </TabPanel>

                <TabPanel value={value} index={3}>
                    {
                        (!('behavior' in behavior)) ? (
                            <div class="rows">
                                No behavior report found
                            </div>
                        ) : (
                                <div>
                                    <div class="cardo scan-behavior">
                                        <div class="cardo-header">
                                            <h3 id="title">{translate['Processes']} <span class="badge badge-info">{behavior.behavior.processes.length}</span></h3>
                                        </div>
                                        <div class="cardo-content properties">
                                            {behavior.behavior.processes.map((i, key) => (
                                                <div class="one-process">
                                                    <div class="rows">
                                                        <a class="label">Command line</a>
                                                        <div class="value">
                                                            <div>{behavior.behavior.processes[key].command_line}</div>
                                                        </div>
                                                        <div class="clearfix"></div>
                                                    </div>
                                                    <div class="rows">
                                                        <a class="label">Process path</a>
                                                        <div class="value">
                                                            <div>{behavior.behavior.processes[key].process_path}</div>
                                                        </div>
                                                        <div class="clearfix"></div>
                                                    </div>
                                                    <div class="rows">
                                                        <a class="label">TID</a>
                                                        <div class="value">
                                                            <div>{behavior.behavior.processes[key].tid}</div>
                                                        </div>
                                                        <div class="clearfix"></div>
                                                    </div>
                                                    <div class="rows" onClick={() => this.toggle('processes', key, !showProcModules[key])}>
                                                        <a class="label">
                                                            Modules <span class="badge badge-info">{behavior.behavior.processes[key]['modules'].length}</span>
                                                        </a>
                                                        <div class={`value modules-list` + (showProcModules[key] == 0 ? ' hidden' : '')} id={`modules_list_` + key}>
                                                            <span class="modules-more">Expand... <i class="fa fa-chevron-circle-down" aria-hidden="true"></i></span>

                                                            {behavior.behavior.processes[key].modules.map((j, k) => (
                                                                <div>
                                                                    <div class="rows">
                                                                        <a class="label">baseaddr</a>
                                                                        <div class="value">
                                                                            {behavior.behavior.processes[key]['modules'][k]['baseaddr']}
                                                                        </div>
                                                                    </div>
                                                                    <div class="rows">
                                                                        <a class="label">basename</a>
                                                                        <div class="value">
                                                                            {behavior.behavior.processes[key]['modules'][k]['basename']}
                                                                        </div>
                                                                    </div>
                                                                    <div class="rows">
                                                                        <a class="label">filepath</a>
                                                                        <div class="value">
                                                                            {behavior.behavior.processes[key]['modules'][k]['filepath']}
                                                                        </div>
                                                                    </div>
                                                                    <div class="rows">
                                                                        <a class="label">imgsize</a>
                                                                        <div class="value">
                                                                            {behavior.behavior.processes[key]['modules'][k]['imgsize']}
                                                                        </div>
                                                                        <div class="clearfix"></div>
                                                                    </div>
                                                                    <hr />
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div class="clearfix"></div>
                                                    </div>
                                                    <hr />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div class="cardo scan-behavior">
                                        <div class="cardo-header">
                                            <h3 id="title">{translate['Signatures']}</h3>
                                        </div>
                                        {
                                            (!('signatures' in behavior)) ?
                                                (
                                                    <div class="cardo-content behavior-signatures">
                                                        <div class="value empty">No signatures</div>
                                                    </div>
                                                ) :
                                                (
                                                    <div class="cardo-content behavior-signatures">
                                                        {behavior.signatures.map((i, key) => (
                                                            <div class="one-signature">
                                                                <div class="rows">
                                                                    <a class="label">Severity</a>
                                                                    <div class="value">
                                                                        {(behavior.signatures[key]['severity'] > 3) ? (<span class="badge badge-danger">{behavior.signatures[key]['severity']}</span>) : (<span class="badge badge-warning">{behavior.signatures[key]['severity']}</span>)}
                                                                    </div>
                                                                    <div class="clearfix"></div>
                                                                </div>
                                                                <div class="rows">
                                                                    <a class="label">Description</a>
                                                                    <div class="value">
                                                                        {behavior.signatures[key]['description']}
                                                                    </div>
                                                                    <div class="clearfix"></div>
                                                                </div>
                                                                <div class="rows">
                                                                    <a class="label">Markcount</a>
                                                                    <div class="value">
                                                                        <span class="badge badge-info">{behavior.signatures[key]['markcount']}</span>
                                                                    </div>
                                                                    <div class="clearfix"></div>
                                                                </div>
                                                                {/*<div class="rows" onClick={() => this.toggle('signatures', key, !showSignatureMarks[key])}>
                                                                    <a class="label">
                                                                        Marks <span class="badge badge-info">{behavior.signatures[key]['markcount']}</span>
                                                                    </a>
                                                                    <div class={`value modules-list` + (showSignatureMarks[key] == 0 ? ' hidden' : '')} id={`sig_marks_list_` + key}>
                                                                        <span class="signatures-more">Expand... <i class="fa fa-chevron-circle-down" aria-hidden="true"></i></span>
                                                                        {behavior.signatures[key].marks.map((j, k) => (
                                                                            <div>{Object.entries(j).map((m, v) => (
                                                                                <div>{v}</div>
                                                                            ))
                                                                            }</div>
                                                                        )
                                                                        )}

                                                                    </div>
                                                                    <div class="clearfix"></div>
                                                                </div>*/}
                                                                <hr />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )
                                        }
                                    </div>


                                    <div class="cardo scan-behavior">
                                        <div class="cardo-header">
                                            <h3 id="title">{translate['Networks']}</h3>
                                        </div>
                                        <div class="cardo-content behavior-network">
                                            <div class="rows">
                                                <a class="label">Hosts</a>
                                                <div class={`value` + (showHosts == 0 ? ' less' : '')} onClick={() => this.toggle('hosts', 0, !showHosts)}>
                                                    <div class="display-content">
                                                        {behavior.network.hosts.join(', ')}
                                                    </div>
                                                    <span class="content-more">Expand... <i class="fa fa-chevron-circle-down" aria-hidden="true"></i></span>
                                                </div>
                                                <div class="clearfix"></div>
                                            </div>
                                            <div class="rows">
                                                <h5 class="label">Domains <span class="badge badge-info">{behavior.network.domains.length}</span></h5>
                                                <div class="valuess value">
                                                    {behavior.network.domains.map((i, key) => (
                                                        <div><span class="text-primary">{behavior.network.domains[key].domain}</span> {behavior.network.domains[key].ip}</div>
                                                    ))}
                                                </div>
                                                <div class="clearfix"></div>
                                            </div>
                                            <div class="rows">
                                                <h5 class="label">DNS <span class="badge badge-info">{behavior.network.dns.length}</span></h5>
                                                <div class="valuess value">
                                                    {behavior.network.dns.map((i, key) => (
                                                        <div>
                                                            <div class="rows">
                                                                <a class="label">Request</a>
                                                                <div class="value">
                                                                    <span class="text-primary">[{behavior.network.dns[key].type}]</span> {behavior.network.dns[key].request}
                                                                </div>
                                                            </div>
                                                            <div class="rows">
                                                                <a class="label">Answers</a>
                                                                <div class="value">
                                                                    {behavior.network.dns[key].answers.map((j, k) => (
                                                                        <div><span class="text-primary">[{behavior.network.dns[key].answers[k].type}]</span> {behavior.network.dns[key].answers[k].data}</div>
                                                                    ))}
                                                                </div>
                                                                <div class="clearfix"></div>
                                                            </div>
                                                            <hr />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div class="clearfix"></div>
                                            </div>
                                            <div class="rows">
                                                <h5 class="label">http_ex <span class="badge badge-info">{behavior.network.http_ex.length}</span></h5>
                                                <div class="valuess value">
                                                    {behavior.network.http_ex.map((i, key) => (
                                                        <div><span class="text-success">[{behavior.network.http_ex[key].status}]</span> {behavior.network.http_ex[key].src} ({behavior.network.http_ex[key].sha1})</div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div class="rows">
                                                <h5 class="label">http <span class="badge badge-info">{behavior.network.http.length}</span></h5>
                                                <div class="valuess value">
                                                    {behavior.network.http.map((i, key) => (
                                                        <div><span class="text-primary">[{behavior.network.http[key].method}]</span> (:{behavior.network.http[key].port}) {behavior.network.http[key].data}</div>
                                                    ))}
                                                </div>
                                                <div class="clearfix"></div>
                                            </div>
                                            <div class="rows">
                                                <h5 class="label">tcp <span class="badge badge-info">{behavior.network.tcp.length}</span></h5>
                                                <div class="valuess value">
                                                    {behavior.network.tcp.map((i, key) => (
                                                        <div><span class="text-primary">{behavior.network.tcp[key].src}:{behavior.network.tcp[key].sport}</span> --> <span class="text-primary">{behavior.network.tcp[key].dst}:{behavior.network.tcp[key].dport}</span> (OFFSET <span class="text-primary">{behavior.network.tcp[key].offset}</span> TIME <span class="text-primary">{behavior.network.tcp[key].time}</span>)</div>
                                                    ))}
                                                </div>
                                                <div class="clearfix"></div>
                                            </div>
                                            <div class="rows">
                                                <h5 class="label">udp <span class="badge badge-info">{behavior.network.udp.length}</span></h5>
                                                <div class="valuess value">
                                                    {behavior.network.udp.map((i, key) => (
                                                        <div><span class="text-primary">{behavior.network.udp[key].src}:{behavior.network.udp[key].sport}</span> --> <span class="text-primary">{behavior.network.udp[key].dst}:{behavior.network.udp[key].dport}</span> (OFFSET <span class="text-primary">{behavior.network.udp[key].offset}</span> TIME <span class="text-primary">{behavior.network.udp[key].time}</span>)</div>
                                                    ))}
                                                </div>
                                                <div class="clearfix"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="cardo scan-behavior">
                                        <div class="cardo-header">
                                            <h3 id="title">{translate['Others']}</h3>
                                        </div>
                                        <div class="cardo-content properties">
                                            <div class="rows">
                                                <a class="label">Strings</a>
                                                {
                                                    (!('strings' in behavior)) ?
                                                        (
                                                            <div class="value empty">No strings</div>
                                                        ) :
                                                        (
                                                            <div class={`value` + (showStrings == 0 ? ' less' : '')} onClick={() => this.toggle('strings', 0, !showStrings)}>
                                                                <div class="display-content">
                                                                    <div>
                                                                        {behavior.strings.map((i, key) => (
                                                                            <div>{behavior.strings[key]}</div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <span class="content-more">Expand... <i class="fa fa-chevron-circle-down" aria-hidden="true"></i></span>
                                                            </div>
                                                        )}
                                                <div class="clearfix"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                </TabPanel>
            </ThemeProvider>
        );
    }

    _getColor = (status) => {
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

                    <this.SimpleTabs />

                </div>

                <div class="row">
                </div>
            </div>

        )
    }
}

export default CaptureDetailPage
