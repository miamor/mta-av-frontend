import React, {Component} from 'react'
import {Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Table} from 'reactstrap'
import {PieChart, Pie, Tooltip, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis} from 'recharts'

import {pie1, pie2, pie3, pie4, area, table_client, table_domain} from './assets/sample'
const color_list = ['#0C090A', '#25383C', '#463E3F', '#151B54', '#357EC7', '#254117', '#347235', '#CD7F32', '#827839', '#6F4E37', '#9F000F', '#7E354D', '#583759', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000']

class DashboardPage extends Component{

    state = {
        isOpen: false
    }

    _toggle = () => {   
        this.setState(({isOpen}) => ({
            isOpen: !isOpen
        }))
    }

    render(){

        const {isOpen} = this.state

        return(
            <div className='DashboardPage'>
                <div className='MenuPeriod'>
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
                </div>
                <div className='Main'>
                    <div className='Item'>
                        <div className='ItemTitle'>DDI Dash</div>
                    </div>
                    <div className='Row'>
                        <div className='Item'>
                            <div className='ItemTitle'>Malicious DNS Queries Blocked</div>
                            <div className='ItemCount'>510,263</div>
                        </div>
                        <div className='Item Last'>
                            <div className='ItemTitle'>DNS Attack Event</div>
                            <div className='ItemCount'>37,276</div>
                        </div>
                    </div>
                    <div className='Row'>
                        <div className='Item'>
                            <div className='ItemTitle'>DNS Firewall Attack Categories</div>
                            <ResponsiveContainer height={300}>
                                <PieChart>
                                    <Pie data={pie1} isAnimationActive={true} cx={'50%'} cy={'50%'} outerRadius={80} label>
                                        {
                                            pie1.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={color_list[index]}/>
                                            ))
                                        }
                                    </Pie>
                                    <Tooltip/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className='Item'>
                            <div className='ItemTitle'>DNS Firewall Threat Levels</div>
                            <ResponsiveContainer height={300}>
                                <PieChart>
                                    <Pie data={pie2} isAnimationActive={true} cx={'50%'} cy={'50%'} outerRadius={80} label>
                                        {
                                            pie2.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={color_list[index]}/>
                                            ))
                                        }
                                    </Pie>
                                    <Tooltip/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className='Item'>
                            <div className='ItemTitle'>Top DNS Clients</div>
                            <ResponsiveContainer height={300}>
                                <PieChart>
                                    <Pie data={pie3} isAnimationActive={true} cx={'50%'} cy={'50%'} outerRadius={80} label>
                                        {
                                            pie3.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={color_list[index]}/>
                                            ))
                                        }
                                    </Pie>
                                    <Tooltip/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className='Item Last'>
                            <div className='ItemTitle'>Top DNS Domains</div>
                            <ResponsiveContainer height={300}>
                                <PieChart>
                                    <Pie data={pie4} isAnimationActive={true} cx={'50%'} cy={'50%'} outerRadius={80} label>
                                        {
                                            pie4.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={color_list[index]}/>
                                            ))
                                        }
                                    </Pie>
                                    <Tooltip/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>                        
                    </div>
                    <div className='Item'>
                        <div className='ItemTitle'>DNS Firewall</div>
                    </div>
                    <div className='Item'>
                        <div className='ItemTitle'>DNS Attack Trend</div>
                        <ResponsiveContainer height={300}>
                            <AreaChart width={600} height={400} data={area}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Area type='monotone' dataKey='CRITICAL' stackId="1" stroke='#8884d8' fill='#8884d8' />
                                <Area type='monotone' dataKey='INFORMATIONAL' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className='Row'>
                        <div className='Item'>
                            <div className='ItemTitle'>Top RPZ L2 Domains</div>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Domain</th>
                                        <th>Total Hits</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        table_domain.map((item, index) => (
                                            <tr key={`domain-index`}>
                                                <th scope='row'>{index+1}</th>
                                                <td>{item.domain}</td>
                                                <td>{item.value}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                        <div className='Item'>
                            <div className='ItemTitle'>DNS Firewall Top Clients</div>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Client ID</th>
                                        <th>Total Client Hits</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        table_client.map((item, index) => (
                                            <tr key={`domain-index`}>
                                                <th scope='row'>{index+1}</th>
                                                <td>{item.client}</td>
                                                <td>{item.value}</td>
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