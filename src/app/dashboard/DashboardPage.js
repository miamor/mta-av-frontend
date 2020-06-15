import React, { Component } from 'react'
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Table } from 'reactstrap'
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from 'recharts'

import { pie1, pie2, pie3, pie4, area, table_client, table_domain } from './assets/sample'
import { translate } from '../../services/translate'
import { getStatTotal } from '../../services/apis/StatAPI'
const color_list = ['#0C090A', '#25383C', '#463E3F', '#151B54', '#357EC7', '#254117', '#347235', '#CD7F32', '#827839', '#6F4E37', '#9F000F', '#7E354D', '#583759', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000']

class DashboardPage extends Component {

    state = {
        isOpen: false,
        statData: {},
        isLoading: false,
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
                isLoading: false
            })
        })
    }

    render() {

        const { isOpen, statData, isLoading } = this.state

        console.log(statData['top_ip_mal'])

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
                    <div className='row'>
                        <div className='Item cardo col'>
                            <div className='cardo-header'>
                                <h3>{translate['Malicious files detected']}</h3>
                            </div>
                            <div className='ItemCount'>{statData['malwares_num']}</div>
                        </div>
                        <div className='Item cardo Last col'>
                            <div className='cardo-header'>
                                <h3>{translate['IPs containing malicious files detected']}</h3>
                            </div>
                            <div className='ItemCount'>{statData['ip_malwares_num']}</div>
                        </div>
                    </div>

                    <div className='Item cardos row'>
                        <div className='cardos-header ItemTitle'>
                            <h3>{translate['Traffic sent']}</h3>
                        </div>
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
                        <div className='Item cardos col'>
                            <div className='cardos-header ItemTitle'>
                                <h3>IP sent most traffic</h3>
                            </div>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>IP</th>
                                        <th>Total traffic (bytes)</th>
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
                        <div className='Item cardos col Last'>
                            <div className='cardos-header ItemTitle'>
                                <h3>{translate['IP detected most malwares']}</h3>
                            </div>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>IP</th>
                                        <th>Total malwares detected</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        statData['top_ip_mal'].map((item, index) => (
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
                </div>
            </div>
        )
    }
}

export default DashboardPage