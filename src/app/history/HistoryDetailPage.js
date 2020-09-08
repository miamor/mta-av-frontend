import React, { Component } from 'react'
import { translate } from '../../services/translate'
import { bytesToSize } from '../../services/bytesToSize'
import { getListHistory } from '../../services/apis/HistoryAPI'


import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import getHistory from '../../services/helpers/getHistory';
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

const useStyles = makeStyles((theme) => ({
    // root: {
    //     flexGrow: 1,
    //     backgroundColor: theme.palette.background.paper,
    // },
    // root: {
    //     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    //     border: 0,
    //     borderRadius: 3,
    //     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    //     color: 'white',
    //     height: 48,
    //     padding: '0 30px',
    // },

}));

const styles = {
    AppBar: {
        background: 'transparent',
        boxShadow: 'none',
        width: '100%'
    },
    // Indicator: {
    //     color: '#666',
    //     ripple: {
    //         color: 'blue'
    //     },
    //     backgroundColor: 'white',
    // }
};
// const styles = theme => ({
//     AppBar: {
//         background: 'transparent',
//         boxShadow: 'none'
//     },
//     indicator: {
//         backgroundColor: "white"
//     }
// });

class HistoryDetailPage extends Component {

    state = {
        item_history: {},
        list_history: [],
        isLoading: true,
    }

    constructor() {
        super();

        // ThemeManager.setPalette({
        //     // accent1Color: Colors.indigo50,
        //     primary1Color: "#474B4E",
        //     primary2Color: "#2173B3",
        //     primary3Color: "#A9D2EB",
        //     accent1Color: "#ED3B3B",
        //     accent2Color: "#ED2B2B",
        //     accent3Color: "#F58C8C"
        // });
    }

    componentDidMount() {

        const { match } = this.props

        this.setState({ isLoading: true })

        // hash = match.params.hash

        let historyList = getListHistory(match.params.hash)
        console.log('match.params.hash', match.params.hash)
        historyList.then(data => {
            data.map((item, index) => {
                if (item.detected_by == '' || item.detected_by == null) {
                    item.status = 'OK'
                } else {
                    item.status = 'DANGER'
                }
            })
            this.setState({
                list_history: data,
                item_history: data[0],
                isLoading: false
            })
        })
    }

    SimpleTabs = () => {
        const classes = useStyles();
        const [value, setValue] = React.useState(0);

        const handleChange = (event, newValue) => {
            setValue(newValue);
        };
        const { item_history, list_history, isLoading } = this.state
        console.log('list_history', list_history, 'isLoading', isLoading)

        if (isLoading) {
            return <p>Loading ...</p>
        }

        return (
            <ThemeProvider theme={theme}>
                <AppBar position="static" style={styles.AppBar}>
                    <Tabs classes={{ indicator: classes.indicator }} indicatorColor="primary"
                        textColor="primary" variant="fullWidth"
                        value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab disableRipple label="Details" {...a11yProps(0)} />
                        <Tab label="History" {...a11yProps(1)} />
                        <Tab label="Behavior" {...a11yProps(2)} />
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
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div class="cardo scan-details">
                        <div class="cardo-header">
                            <h3 id="title">Submissions</h3>
                        </div>
                        <div class="cardo-content properties">
                            {
                                list_history.map((item, index) => (
                                    <div class="property-list" key={`domain-${index}`}>
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
                                                        <span>{item.source_ip}</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                    <div class="rows">
                                                        <a class="label">{translate['Capture ID']}</a>
                                                        <div class="value">
                                                            <a href={`/a/capture/${item.capture_id}`}>{item.capture_id}</a> (from {item.source_ip} to {item.destination_ip})
                                                        </div>
                                                    </div>
                                                )
                                        }
                                        <div class="rows">
                                            <a class="label">{translate['File name']}</a>
                                            <div class="value">
                                                <span>{item.file_name}</span>
                                            </div>
                                        </div>
                                        {/* <div class="rows">
                                            <a class="label">{translate['File path']}</a>
                                            <div class="value">
                                                <span>{item.file_path}</span>
                                            </div>
                                        </div> */}
                                        <div class="rows">
                                            <a class="label">{translate['Scan time']}</a>
                                            <div class="value">
                                                <span>{(item.scan_time ? item.scan_time : 0)}s</span>
                                            </div>
                                        </div>
                                        {(item.status !== 'OK') ? (
                                            <div class="rows">
                                                <a class="label">{translate['Detected by']}</a>
                                                <div class="value">
                                                    <span>{item.detected_by}</span>
                                                </div>
                                            </div>
                                        ) : ''}
                                        <div class="clearfix"></div>
                                        <hr />
                                    </div>
                                ))}

                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </ThemeProvider>
        );
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
                                <div class="ItemTitle">{item_history.date_received} {item_history.time_received}</div>
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

export default HistoryDetailPage