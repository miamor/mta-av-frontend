import React, { Component } from 'react'
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Table } from 'reactstrap'
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from 'recharts'

import { pie1, pie2, pie3, pie4, area, table_client, table_domain } from './assets/sample'
import { translate } from '../../services/translate'
import { getStatTotal } from '../../services/apis/StatAPI'


import Chart from "react-apexcharts";

const color_list = ['#0C090A', '#25383C', '#463E3F', '#151B54', '#357EC7', '#254117', '#347235', '#CD7F32', '#827839', '#6F4E37', '#9F000F', '#7E354D', '#583759', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000']

class DashboardPage extends Component {

    state = {
        isOpen: false,
        statData: {},
        isLoading: false,

        charts: {
            top_ip_mal: {
                series: [{
                    data: []
                }],
                options: {
                    plotOptions: {
                    bar: {
                        horizontal: true,
                    }
                    },
                    dataLabels: {
                    enabled: false
                    },
                    xaxis: {
                    categories: [],
                    }
                },
            },
            top_ip_rev_mal: {
                series: [{
                    data: []
                }],
                options: {
                    plotOptions: {
                    bar: {
                        horizontal: true,
                    }
                    },
                    dataLabels: {
                    enabled: false
                    },
                    xaxis: {
                    categories: [],
                    }
                },
            },
            top_ip_send: {
                series: [{
                    data: []
                }],
                options: {
                    plotOptions: {
                    bar: {
                        horizontal: true,
                    }
                    },
                    dataLabels: {
                    enabled: false
                    },
                    xaxis: {
                    categories: [],
                    }
                },
            },
        },

    }

    _toggle = () => {
        this.setState(({ isOpen }) => ({
            isOpen: !isOpen
        }))
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        let stat_data = getStatTotal()

        let chartsData = this.state.charts
        // chartsData['top_ip_rev_mal'] = chartsData['top_ip_mal']
        // chartsData['top_ip_send'] = chartsData['top_ip_mal']

        stat_data.then(data => {
            console.log(data)

            data['top_ip_mal'].map((item, index) => {
                chartsData['top_ip_mal'].series[0].data.push(item['total'])
                chartsData['top_ip_mal'].options.xaxis.categories.push(item['ip'])
            })
            data['top_ip_rev_mal'].map((item, index) => {
                chartsData['top_ip_rev_mal'].series[0].data.push(item['total'])
                chartsData['top_ip_rev_mal'].options.xaxis.categories.push(item['ip'])
            })
            data['top_ip_send'].map((item, index) => {
                chartsData['top_ip_send'].series[0].data.push(item['total'])
                chartsData['top_ip_send'].options.xaxis.categories.push(item['ip'])
            })

            this.setState({
                statData: data,
                isLoading: false,
                charts: chartsData
            })
        })
    }

    render() {

        const { isOpen, statData, isLoading, series, options } = this.state

        console.log(statData['top_ip_mal'])
        console.log(series)

        if (isLoading || statData['top_ip_mal'] == undefined || statData['top_ip_send'] == undefined) {
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
                    <div className='card'>
                        <div class='card-header'><h2>At a glance</h2></div>
                        <div class='row stat-num'>
                            <div className='Item col'>
                                <div class="ItemIcon fas fa-chart-bar"></div>
                                <div className='ItemCount'>
                                    {statData['malwares_num']}
                                    <span class="small">detections of</span>
                                </div>
                                <h3>{translate['Malicious files detected']}</h3>
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
                    </div>

                    <div className='Item card row'>
                        <div className='card-header ItemTitle'>
                            <h3>{translate['Traffic sent']}</h3>
                        </div>
                        <Chart options={this.state.charts['top_ip_mal'].options} series={this.state.charts['top_ip_mal'].series} type="bar" height="250" />

                        <ResponsiveContainer height={300}>
                            <AreaChart width={600} height={400} data={area}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area type='monotone' dataKey='CRITICAL' stackId="1" stroke='#8884d8' fill='#8884d8' />
                                <Area type='monotone' dataKey='INFORMATIONAL' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className='row'>
                        <div class='col'>
                        <div className='Item card'>
                            <div className='card-header ItemTitle'>
                                <h3>{translate['IP sent most traffic']}</h3>
                            </div>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>IP</th>
                                        <th>{translate['Total traffic sent']} (bytes)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        statData['top_ip_send'].map((item, index) => (
                                            <tr key={`domain-${index}`}>
                                                <th scope='row'>{index + 1}</th>
                                                <td>{item.ip}</td>
                                                <td>{item.total}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                        </div>

                        <div class='col Last'>
                        <div className='Item card'>
                            <div className='card-header ItemTitle'>
                                <h3>{translate['IP detected most malwares']} (send out)</h3>
                            </div>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>IP</th>
                                        <th>{translate['Total malwares detected']}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        statData['top_ip_mal'].map((item, index) => (
                                            (item.total > 0) ? 
                                            (
                                            <tr key={`domain-${index}`}>
                                                <th scope='row'>{index + 1}</th>
                                                <td>{item.ip}</td>
                                                <td>{item.total}</td>
                                            </tr>
                                            ) : ''
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                        </div>
                    </div>



                    <div className='row'>
                        <div class='col'>
                        <div className='Item card'>
                            <div className='card-header ItemTitle'>
                                <h3>{translate['Top IP attacked with malware']} (receive)</h3>
                            </div>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>IP</th>
                                        <th>{translate['Total malwares detected']} (bytes)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        statData['top_ip_rev_mal'].map((item, index) => (
                                            <tr key={`domain-${index}`}>
                                                <th scope='row'>{index + 1}</th>
                                                <td>{item.ip}</td>
                                                <td>{item.total}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                        </div>

                        <div class='col Last'>
                        <div className='Item card'>
                            <div className='card-header ItemTitle'>
                                <h3>{translate['Top malicious URLs detected']}</h3>
                            </div>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>URL</th>
                                        <th>{translate['Total requests detected']}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </Table>
                        </div>
                        </div>
                    </div>

                    

                </div>
            </div>
        )
    }
}

export default DashboardPage