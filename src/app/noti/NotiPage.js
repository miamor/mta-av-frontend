import React, { Component } from 'react'
import { Table } from 'reactstrap'
import { translate } from '../../services/translate'
import { bytesToSize } from '../../services/bytesToSize'
import { getListNoti, countNoti } from '../../services/apis/NotiAPI'
import Pagination from '@material-ui/lab/Pagination';

// import {table_event} from './sample'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#004F00',
            contrastText: '#fff',
        },

    },
    status: {
        danger: 'orange',
    },
});


class NotiPage extends Component {

    state = {
        selected: 0,
        list_noti: [],
        isLoading: true,
        isLoadingTbl: true,
        filter: {},
        totalNoti: 0,
        num_pages: 0,
        current_page: 1,
        start_num: 0,
        end_num: 0
    }

    componentDidMount() {
        this.getList()
        // setInterval(() => {
        //     console.log('~~ F5')
        //     this.getList()
        // }, 20000)

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            this.getList()
        })
    }
    componentWillUnmount() {
        this.unlisten()
    }

    handleChange_pagination = (event, value) => {
        console.log('~~[handleChange_pagination]', value)
        this.getList(value-1)
        this.setState({
            isLoadingTbl: true,
            current_page: value
        })
    };


    getList = (page=0) => {
        console.log('~~ *** filter', this.state.filter)
        let notiList = getListNoti(this.state.filter, page)
        this.postProcess(notiList)

        countNoti(this.state.filter).then(totalNoti => {
            let page_size = 30
            console.log('~~~ totalNoti', totalNoti)
            let end_num_ = (page+1)*page_size+1
            if (end_num_ > totalNoti) {
                end_num_ = totalNoti
            }
            this.setState({
                totalNoti: totalNoti,
                num_pages: Math.ceil(totalNoti/30),
                start_num: page * page_size+1,
                end_num: end_num_
            })
        })
    }

    postProcess = (notiList) => {
        notiList.then(data => {
            console.log('~~ [postProcess] change list_noti', data)
            this.setState({
                list_noti: data,
                isLoading: false,
                isLoadingTbl: false
            })
        })
    }

    _handleSelect = (noti_id) => {
        // this.setState({selected: index})
        // return <Redirect to='/a/noti/{noti_id}' />
        this.props.history.push(`/a/noti/${noti_id}`)
    }


    
    handleChange = (event) => {
        let filter = this.state.filter
        console.log('~~ ***', 'event.target.name', event.target.name, filter)
        filter[event.target.name] = event.target.value
        this.setState({ filter: filter })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.getList()
    }

    updateFilter = (key, val) => {
        let filter = this.state.filter
        filter[key] = val
        this.setState({ filter: filter }, () => {
            // and update list
            this.getList()
        })
    }
    resetFilter = () => {
        this.setState({ filter: {} }, () => {
            console.log('*** reset', this.state.filter)
            this.getList()
        })
    }

    render() {

        const { selected, list_noti, isLoading, num_pages, current_page, isLoadingTbl, totalNoti, start_num, end_num } = this.state

        // if (isLoading) {
        //     return <p>Loading ...</p>
        // }

        console.log('list_noti', list_noti)
        let total_noti_this_page = list_noti.length

        return (
            <div className='NotiPage'>
                <h1 className='PageTitle'>{translate['Notifications']}</h1>

            { (isLoading) ? 'Loading ...' : (
                <div className='Table'>
                    {(num_pages <= 0) ? '' : (
                    <div class="row">
                    <div class="col-5 pag_txt">
                        {translate['Show results']} {translate['from']} {start_num} {translate['to']} {end_num} {translate['of']} {totalNoti}
                    </div>
                    <div class="col-7">
                    <MuiThemeProvider theme={theme}>
                        <Pagination count={num_pages} page={current_page} onChange={this.handleChange_pagination} color="primary" />
                    </MuiThemeProvider>
                    </div>
                    </div>
                    )}

                    {(isLoadingTbl) ? 'Loading ...' : 
                    (list_noti.length === 0) ? 'Empty' : (
                        <Table striped>
                            <thead>
                                <tr>
                                    <th width='4%'>#</th>
                                    <th>{translate['Message']}</th>
                                    <th width='15%' class='center'>{translate['Date created']}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list_noti.map((item, index) => (
                                        <tr key={`domain-${index}`}>
                                            <td class='stt' scope='row'>
                                                <a href={`/a/noti/${item.noti_id}`}>
                                                    {item.noti_id}
                                                </a>
                                            </td>
                                            <td>
                                                {item.message}
                                            </td>
                                            <td class='center'>{item.date_created}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    )}
                </div>
            )}
            </div>
        )
    }
}

export default NotiPage
