import React, { Component } from 'react'
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Table } from 'reactstrap'
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from 'recharts'

import { pie1, pie2, pie3, pie4, area, table_client, table_domain } from './assets/sample'
import { translate } from '../../services/translate'
import { getStatTotal, getStatUrl } from '../../services/apis/StatAPI'

import Chart from "react-apexcharts";

class DashboardPage extends Component {

    state = {
        isOpen: false,
        statData: {},
        isLoading: false,
        stat_data: {},
        stat_by_date_url: {},
        // top_url: {}
    }

    _toggle = () => {
        this.setState(({ isOpen }) => ({
            isOpen: !isOpen
        }))
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        let stat_data = getStatTotal()
        let stat_data_url = getStatUrl()


        stat_data_url.then(data => {
            this.setState({
                top_url: data['top_url'],

                stat_by_date_url: {
                    'series': data['stat_by_date']['series'],
                    // Options for line + column
                    'options': {
                      colors: ['#feb21b', '#da1c1c'],
                      // chart: {
                      //   height: 350,
                      //   type: 'line',
                      //   dropShadow: {
                      //     enabled: true,
                      //     color: '#000',
                      //     top: 18,
                      //     left: 7,
                      //     blur: 10,
                      //     opacity: 0.2
                      //   },
                      //   toolbar: {
                      //     show: false
                      //   }
                      // },
                      // dataLabels: {
                      //   enabled: true,
                      // },
                      // stroke: {
                      //   curve: 'smooth'
                      // },
                      // grid: {
                      //   borderColor: '#e7e7e7',
                      //   row: {
                      //     colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                      //     opacity: 0.5
                      //   },
                      // },
                      // markers: {
                      //   size: 1
                      // },
                      // xaxis: {
                      //   categories: data['stat_by_date']['cat'],
                      // },

                      chart: {
                        height: 350,
                        type: 'line',
                      },
                      stroke: {
                        width: [0, 4]
                      },
                      dataLabels: {
                        enabled: true,
                        enabledOnSeries: [1]
                      },
                      labels: data['stat_by_date']['cat'],
                      xaxis: {
                        // type: 'datetime'
                      },
                      yaxis: [{
                        title: {
                          text: 'Total URLs',
                        },
                      
                      }, {
                        opposite: true,
                        title: {
                          text: 'Total requests'
                        }
                      }]
                    },
                }

            })
        })


        stat_data.then(data => {
            console.log(data)
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
                stat_by_date: {
                    'series': stat_data['stat_by_date']['series'],
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
                            'categories': stat_data['stat_by_date']['cat']
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

        const { isOpen, isLoading, stat_data, chartsFilesnum, stat_by_date_url, top_url } = this.state

        console.log(chartsFilesnum, '~~ top_url', top_url)

        if (isLoading || this.isEmpty(stat_data)) {
            return <div className='DashboardPage'>Loading ...</div>
        }


        return (
            <div className='DashboardPage'>
                {/* <div className='MenuPeriod'>
                    <div>Period</div>
                    <Dropdown isOpen={isOpen} toggle={this._toggle}>
                        <DropdownToggle caret>
                            Last 30 days
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>Last 30 days</DropdownItem>
                            <DropdownItem>Last 60 days</DropdownItem>
                            <DropdownItem>Last 90 days</DropdownItem>
                            <DropdownItem>Last 120 days</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div> */}
                <div className='Main'>
                    {/* <div className='card'>
                        <div class='card-header'><h2>At a glance</h2></div>
                        <div class='row stat-num'>
                            <div className='Item col'>
                                <div class="ItemIcon fas fa-chart-bar"></div>
                                <div className='ItemCount'>
                                    {statData['malwares_num']}
                                    <span class="small">.</span>
                                </div>
                                <h3>{translate['Files captured']}</h3>
                                <Chart options={this.state.chartsProtocol.options} series={this.state.chartsProtocol.series} type="pie" width="220" />
                            </div>
                            <div className='Item Last col'>
                                <div class="ItemIcon fas fa-chart-bar"></div>
                                <div className='ItemCount'>
                                    {statData['ip_malwares_num']}
                                    <span class="small">hosts contain</span>
                                </div>
                                <h3>{translate['IPs containing malicious files detected']}</h3>
                            </div>
                        </div>

                        <div class='row stat-num'>
                            <div className='Item col'>
                                <div class="ItemIcon fas fa-chart-bar"></div>
                                <div className='ItemCount num-malware'>
                                    {statData['malwares_num']}
                                    <span class="small">detections of</span>
                                </div>
                                <h3>{translate['Malicious files detected']}</h3>

                                <Chart options={chartsFilesnum.options} series={chartsFilesnum.series} type="donut" width="220" />

                            </div>
                            <div className='Item Last col'>
                                <div class="ItemIcon fas fa-chart-bar"></div>
                                <div className='ItemCount'>
                                    {statData['ip_malwares_num']}
                                    <span class="small">.</span>
                                </div>
                                <h3>{translate['Connections to malicious URLs']}</h3>
                            </div>
                        </div>
                    </div> */}


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
                                <div className='card-header ItemTitle'>
                                    <h3>{translate['Files captured']}</h3>
                                </div>
                                <Chart options={this.state.stat_by_date.options} series={this.state.stat_by_date.series} type="bar" height="400" />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <div className='Item card'>
                                <div className='card-header ItemTitle'>
                                    <h3>{translate['Total malicious URLs requested']}</h3>
                                </div>
                                <Chart options={this.state.stat_by_date_url.options} series={this.state.stat_by_date_url.series} type="line" height="400" />
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