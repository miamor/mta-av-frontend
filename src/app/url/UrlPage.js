import React, { Component } from 'react'
import { Table } from 'reactstrap'
import { translate } from '../../services/translate'
import { bytesToSize } from '../../services/bytesToSize'
import { getListUrl, countUrl } from '../../services/apis/UrlAPI'
import Pagination from '@material-ui/lab/Pagination';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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


class UrlPage extends Component {

    state = {
        selected: 0,
        list_url: [],
        isLoading: true,
        isLoadingTbl: true,
        filter: {},
        totalUrl: 0,
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


    handleChange_types = (event) => {
        // setState({ ...state, [event.target.name]: event.target.checked });
        let key = event.target.name.split('__')
        let val_0 = this.state[key[0]]
        let k = key[0]

        if (typeof val_0[key[1]] !== 'object') {
            val_0 = this.update(val_0, key[1])
        } else {
            // for (let i = 1; i < key.length - 1; i++) {
            //     val_0 = this.update(val_0[key[i]], key[i + 1], event.target.checked)
            // }
        }

        this.setState({ k: val_0 })
    }

    update = (obj, key, val) => {
        console.log('~~ update called', 'obj', obj, 'key', key, 'typeof obj[key]', typeof obj[key], '!obj[key]', !obj[key], 'val', val)

        if (typeof obj[key] !== 'object') {
            obj[key] = !obj[key]
        } else {
            console.log('~~ is obj')
        }
        return obj;
    }

    getList = (page=0) => {
        console.log('~~ *** filter', this.state.filter)
        let urlList = getListUrl(this.state.filter, page)
        this.postProcess(urlList)

        countUrl(this.state.filter).then(totalUrl => {
            let page_size = 30
            let num_pages = Math.ceil(totalUrl/30)
            console.log('~~~ totalUrl', totalUrl, 'num_pages', num_pages)
            let end_num_ = (page+1)*page_size+1
            if (end_num_ > totalUrl) {
                end_num_ = totalUrl
            }
            this.setState({
                totalUrl: totalUrl,
                num_pages: Math.ceil(totalUrl/30),
                start_num: page * page_size+1,
                end_num: end_num_
            })
        })
    }

    postProcess = (urlList) => {
        urlList.then(data => {
            console.log('~~ [postProcess] change list_url', data)
            this.setState({
                list_url: data,
                isLoading: false,
                isLoadingTbl: false
            })
        })
    }

    _handleSelect = (url_id) => {
        // this.setState({selected: index})
        // return <Redirect to='/a/url/{url_id}' />
        this.props.history.push(`/a/url/${url_id}`)
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

        const { selected, list_url, isLoading, num_pages, current_page, isLoadingTbl, totalUrl, start_num, end_num } = this.state

        // if (isLoading) {
        //     return <p>Loading ...</p>
        // }

        console.log('list_url', list_url)
        let total_url_this_page = list_url.length

        return (
            <div className='UrlPage'>
                <h1 className='PageTitle'>{translate['Malicious URLs']}</h1>

                <div class="callout callout-info">
                    <div class="close" onClick={() => this.resetFilter()}>
                        <i class="fa fa-times"></i>
                    </div>
                    <div class="callout-content">
                        <h5 class="callout-header">{translate['Filter']}</h5>
                        <form class="filter-form" onSubmit={this.handleSubmit}>
                            <div class="row">
                                <div class="label col-3">URL</div>
                                <div class="value col-9">
                                    <input type="text" name="url" value={this.state.filter['url']} onChange={this.handleChange} />
                                </div>
                                <div class="clearfix"></div>
                            </div>

                            <div class="form-submit-btns center">
                                <button onClick={this.handleSubmit} class="btn btn-default">{translate['Filter']}</button>
                            </div>
                        </form>
                    </div>
                </div>

            { (isLoading) ? 'Loading ...' : (
                <div className='Table'>
                    {(num_pages <= 0) ? '' : (
                    <div class="row">
                    <div class="col-5 pag_txt">
                        {translate['Show results']} {translate['from']} {start_num} {translate['to']} {end_num} {translate['of']} {totalUrl}
                    </div>
                    <div class="col-7">
                    <MuiThemeProvider theme={theme}>
                        <Pagination count={num_pages} page={current_page} onChange={this.handleChange_pagination} color="primary" />
                    </MuiThemeProvider>
                    </div>
                    </div>
                    )}

                    {(isLoadingTbl) ? 'Loading ...' : 
                    (list_url.length === 0) ? 'Empty' : (
                        <Table striped>
                            <thead>
                                <tr>
                                    <th width='4%'>#</th>
                                    <th>{translate['URL']}</th>
                                    <th width='18%' class='center'>{translate['Source IP']}</th>
                                    <th width='18%' class='center'>{translate['Last requested']}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list_url.map((item, index) => (
                                        <tr key={`domain-${index}`}>
                                            <td class='stt' scope='row'>
                                                <a href={`/a/url/${item.url_capture_id}`}>
                                                    {item.url_capture_id}
                                                </a>
                                            </td>
                                            <td>
                                                {/*<a class='file_name' href={`/a/url/${item.url_capture_id}`}>
                                                    {item.url}
                                                </a>*/}
                                                <span class='filtering file_name' onClick={() => this.updateFilter('url', item.url)}>
                                                    {item.url}
                                                </span>
                                            </td>
                                            <td class='center'>
                                                {item.source_ip}
                                            </td>
                                            <td class='center'>{item.date_requested} {item.time_requested}</td>
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

export default UrlPage
