import React, { Component } from 'react'
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Table } from 'reactstrap'
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from 'recharts'

import { pie1, pie2, pie3, pie4, area, table_client, table_domain } from './assets/sample'
import { translate } from '../../services/translate'
import { getStatTotal, getStatUrl, getStatCaptureDate, getStatUrlDate } from '../../services/apis/StatAPI'

import Chart from "react-apexcharts";

class DashboardPage extends Component {

    state = {
        isOpen: {
            capture: {
                days: false,
                split: false
            },
            url: {
                days: false,
                split: false
            }
        },
        statData: {},
        isLoading: false,
        stat_data: {},
        stat_by_date: {},
        stat_by_date_url: {},
        cf__stat_date: {
            capture: {
                days: 30,
                split: 21600 // Every 6(hour)*3600 = 21600(s)
            },
            url: {
                days: 30,
                split: 21600 // Every 6(hour)*3600 = 21600(s)
            },
        }
        // top_url: {}
    }

    _toggle = (stat_type, type) => {
        let isOpen = this.state.isOpen
        isOpen[stat_type][type] = !isOpen[stat_type][type]
        this.setState({
            isOpen: isOpen
        })
    }

    _stat_change_cf = (stat_type, type, evt) => {
        let cf__stat_date = this.state.cf__stat_date
        cf__stat_date[stat_type][type] = evt.target.value
        console.log('~~ cf__stat_date', cf__stat_date)
        this.setState({
            cf__stat_date: cf__stat_date
        })
        this.loadStat()
    }



    componentDidMount() {
        this.setState({ isLoading: true });
        this.loadStat()
    }

    loadStat = () => {
        getStatCaptureDate(this.state.cf__stat_date.capture.days, this.state.cf__stat_date.capture.split).then(data => {
            // console.log('~~', data)
            let stat_by_date = data['stat_by_date']
            this.setState({
                stat_by_date: {
                    'series': stat_by_date['series'],
                    // Options for stacked bar
                    'options': {
                        'colors': ['#05924c', '#da1c1c', '#feb21b'],
                        'chart': {
                            'type': 'bar',
                            'height': 350,
                            'stacked': true,
                            'toolbar': {
                                'show': true
                            },
                            'zoom': {
                                'enabled': true
                            }
                        },
                        'responsive': [{
                            'breakpoint': 480,
                            'options': {
                                'legend': {
                                    'position': 'bottom',
                                    'offsetX': -10,
                                    'offsetY': 0
                                }
                            }
                        }],
                        'plotOptions': {
                            'bar': {
                                'horizontal': false,
                            },
                        },
                        'xaxis': {
                            // 'type': 'datetime',
                            'categories': stat_by_date['cat']
                        },
                        'legend': {
                            'position': 'bottom',
                            'offsetY': 0
                        },
                        'fill': {
                            'opacity': 1
                        }
                    },
                },

            })
        })


        getStatUrl().then(data => {
            // console.log('~~', data)
            let stat_data = data['stat_data']
            this.setState({
                top_url: stat_data['top_url'],
            })
        })


        getStatUrlDate(this.state.cf__stat_date.url.days, this.state.cf__stat_date.url.split).then(data => {
            console.log('~~', data)
            let stat_by_date = data['stat_by_date']
            this.setState({
                stat_by_date_url: {
                    'series': stat_by_date['series'],
                    // Options for line + column
                    'options': {
                        colors: ['#feb21b', '#da1c1c'],

                        chart: {
                            height: 350,
                            type: 'line',
                        },
                        stroke: {
                            curve: 'smooth',
                            // width: [0, 4]
                        },
                        fill: {
                            type:'solid',
                            opacity: [0.35, 1],
                        },
                        dataLabels: {
                            enabled: false,
                            // enabledOnSeries: [1]
                        },
                        labels: stat_by_date['cat'],
                        // yaxis: [{
                        //     title: {
                        //         text: 'Total URLs',
                        //     },
                        // }, {
                        //     opposite: true,
                        //     title: {
                        //         text: 'Total requests'
                        //     }
                        // }]
                    },
                }
            })
        })

        getStatTotal().then(data => {
            // console.log('~~', data)
            let stat_data = data['stat_data']

            this.setState({
                // statData: data,
                stat_data: stat_data,
                chartsFilesnum: {
                    series: [stat_data['num']['benigns_num'], stat_data['num']['malwares_num'], stat_data['num']['warnings_num']],
                    options: {
                        labels: ['clean', 'malicious', 'critical'],
                        colors: ['#05924c', '#da1c1c', '#feb21b'],
                        legend: {
                            position: 'right'
                        },
                        dataLabels: {
                            enabled: false
                        },
                        plotOptions: {
                            pie: {
                                donut: {

                                    labels: {
                                        show: true,
                                        total: {
                                            show: true
                                        }
                                    }
                                }

                            }
                        },
                    },
                },
                chartsProtocol: {
                    series: [stat_data['captured_protocol']['http'], stat_data['captured_protocol']['ftp'], stat_data['captured_protocol']['smb']],
                    options: {
                        labels: ['HTTP', 'FTP', 'SMB'],
                        // colors: [],
                        legend: {
                            position: 'right'
                        },
                        dataLabels: {
                            enabled: false
                        }
                    },
                },

                isLoading: false,
            })
        })
    }

    isEmpty = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    render() {
        const { isOpen, isLoading, stat_data, chartsFilesnum, top_url, stat_by_date, stat_by_date_url } = this.state

        // console.log('~~ stat_by_date_url', this.state.stat_by_date_url)
        // console.log(chartsFilesnum, '~~ top_url', top_url)

        if (isLoading || this.isEmpty(stat_data)) {
            return <div className='DashboardPage'>Loading ...</div>
        }


        return (
            <div className='DashboardPage'>
                <div className='Main'>
                    <div className='row'>
                        <div className='col-8'>
                            <div className='Item card'>
                                <div className='card-header ItemTitle'>
                                    <h3>{translate['Files captured']}</h3>
                                </div>
                                <div className='card-body row'>
                                    <div className='col'>
                                        <Chart options={chartsFilesnum.options} series={chartsFilesnum.series} type="donut" height="200" />
                                    </div>
                                    <div className='col Last'>
                                        <Chart options={this.state.chartsProtocol.options} series={this.state.chartsProtocol.series} type="pie" height="200" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-4 Last'>
                            <div className='Item card'>
                                <div className='card-header ItemTitle'>
                                    <h3>{translate['Most attacked protocols']}</h3>
                                </div>
                                <div className='card-body row'>
                                    <Chart options={this.state.chartsProtocol.options} series={this.state.chartsProtocol.series} type="pie" height="200" />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='row'>
                        <div className='col'>
                            <div className='Item card'>
                                <div className='card-header ItemTitle with-options'>
                                    <h3 class='left'>{translate['Files captured']}</h3>
                <div className='MenuPeriod right'>
                    <select value={this.state.cf__stat_date.capture.days} onChange={(evt) => this._stat_change_cf('capture', 'days', evt)}>
                            <option value="30">Last 30 days</option>
                            <option value="60">Last 60 days</option>
                            <option value="90">Last 90 days</option>
                            <option value="120">Last 120 days</option>
                    </select>
                </div>
                <div className='MenuSplit right'>
                    <select value={this.state.cf__stat_date.capture.split} onChange={(evt) => this._stat_change_cf('capture', 'split', evt)}>
                            <option value="21600">Every 6 hours</option>
                            <option value="43200">Every 12 hours</option>
                            <option value="86400">Every 24 hours</option>
                            <option value="129600">Every 36 hours</option>
                            <option value="172800">Every 48 hours</option>
                    </select>
                </div>
                                </div>

                                <Chart options={stat_by_date.options} series={stat_by_date.series} type="bar" height="400" />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <div className='Item card'>
                                <div className='card-header ItemTitle'>
                                    <h3 class='left'>{translate['Total malicious URLs requested']}</h3>
                <div className='MenuPeriod right'>
                    <select value={this.state.cf__stat_date.url.days} onChange={(evt) => this._stat_change_cf('url', 'days', evt)}>
                            <option value="30">Last 30 days</option>
                            <option value="60">Last 60 days</option>
                            <option value="90">Last 90 days</option>
                            <option value="120">Last 120 days</option>
                    </select>
                </div>
                <div className='MenuSplit right'>
                    <select value={this.state.cf__stat_date.url.split} onChange={(evt) => this._stat_change_cf('url', 'split', evt)}>
                            <option value="21600">Every 6 hours</option>
                            <option value="43200">Every 12 hours</option>
                            <option value="86400">Every 24 hours</option>
                            <option value="129600">Every 36 hours</option>
                            <option value="172800">Every 48 hours</option>
                    </select>
                </div>
                                </div>
                                <Chart options={stat_by_date_url.options} series={stat_by_date_url.series} type="line" height="400" />
                            </div>
                        </div>
                    </div>


                    <div className='row'>
                        <div class='col'>
                            <div className='Item card'>
                                <div className='card-header ItemTitle'>
                                    <h3>{translate['IP sent most traffic']}</h3>
                                </div>
                                <div className='card-body'>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th width='40%'>IP</th>
                                                <th class='center'>{translate['Total traffic sent']} (bytes)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                stat_data['top_ip_send'].map((item, index) => (
                                                    <tr key={`domain-${index}`}>
                                                        <td scope='row'>{index + 1}</td>
                                                        <td>{item.ip}</td>
                                                        <td class='center'>{item.total}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>

                        <div class='col Last'>
                            <div className='Item card'>
                                <div className='card-header ItemTitle'>
                                    <h3>{translate['IP detected most malwares']} (send out)</h3>
                                </div>
                                <div className='card-body'>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th width='40%'>IP</th>
                                                <th class='center'>{translate['Total malwares detected']}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                stat_data['top_ip_mal'].map((item, index) => (
                                                    (item.total > 0) ?
                                                        (
                                                            <tr key={`domain-${index}`}>
                                                                <td scope='row'>{index + 1}</td>
                                                                <td>{item.ip}</td>
                                                                <td class='center'>{item.total}</td>
                                                            </tr>
                                                        ) : ''
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className='row'>
                        <div class='col'>
                            <div className='Item card'>
                                <div className='card-header ItemTitle'>
                                    <h3>{translate['Top IP attacked with malware']} (receive)</h3>
                                </div>
                                <div className='card-body'>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th width='40%'>IP</th>
                                                <th class='center'>{translate['Total malwares detected']}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                stat_data['top_ip_rev_mal'].map((item, index) => (
                                                    <tr key={`domain-${index}`}>
                                                        <td scope='row'>{index + 1}</td>
                                                        <td>{item.ip}</td>
                                                        <td class='center'>{item.total}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>

                        <div class='col Last'>
                            <div className='Item card'>
                                <div className='card-header ItemTitle'>
                                    <h3>{translate['Top malicious URLs detected']}</h3>
                                </div>
                                <div className='card-body'>
                                    <Table class='stat-url'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th width='40%'>URL</th>
                                                <th class='center'>{translate['Total requests detected']}</th>
                                            </tr>
                                        </thead>
                                        { top_url != undefined ? (
                                        <tbody>
                                            {
                                                top_url.map((item, index) => (
                                                    <tr key={`domain-${index}`}>
                                                        <td scope='row'>{index + 1}</td>
                                                        <td class='td-url'>{item.url}</td>
                                                        <td class='center'>{item.total}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                        ) : (
                                            <tbody>
                                                <tr>
                                                        <td scope='row'></td>
                                                        <td class='td-url'></td>
                                                        <td class='center'></td>
                                                </tr>
                                            </tbody>
                                        )}
                                            
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        )
    }
}

export default DashboardPage