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
        charts: {}
    }

    _toggle = () => {
        this.setState(({ isOpen }) => ({
            isOpen: !isOpen
        }))
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        let stat_data = getStatTotal()

        stat_data.then(data => {
            console.log(data)

            this.setState({
                statData: data,
                isLoading: false,
                charts: data['charts'],
                chartsFilesnum: {
                    series: [data['malwares_num'], data['malwares_num']],
                    options: {
                        labels: ['clean', 'malicious'],
                        colors: ['#05924c', '#da1c1c'],
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
                    series: [10, 20, 30],
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
                }

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

        const { isOpen, statData, isLoading, charts, chartsFilesnum } = this.state

        console.log(statData, chartsFilesnum)

        if (isLoading || this.isEmpty(charts)) {
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
                                <Chart options={charts['stat_by_date'].options} series={charts['stat_by_date'].series} type="line" height="250" />
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
                                                <th>IP</th>
                                                <th>{translate['Total traffic sent']} (bytes)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                charts['top_ip_send'].map((item, index) => (
                                                    <tr key={`domain-${index}`}>
                                                        <td scope='row'>{index + 1}</td>
                                                        <td>{item.ip}</td>
                                                        <td>{item.total}</td>
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
                                                <th>IP</th>
                                                <th>{translate['Total malwares detected']}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                charts['top_ip_mal'].map((item, index) => (
                                                    (item.total > 0) ?
                                                        (
                                                            <tr key={`domain-${index}`}>
                                                                <td scope='row'>{index + 1}</td>
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
                                                <th>IP</th>
                                                <th>{translate['Total malwares detected']} (bytes)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                charts['top_ip_rev_mal'].map((item, index) => (
                                                    <tr key={`domain-${index}`}>
                                                        <td scope='row'>{index + 1}</td>
                                                        <td>{item.ip}</td>
                                                        <td>{item.total}</td>
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
                                    <Table>
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
            </div>
        )
    }
}

export default DashboardPage