import React, {Component} from 'react'
import {Table,} from 'reactstrap'
import {Redirect} from 'react-router-dom'

// import {list_user} from './asset'
import {getListUser, countUser} from '../../services/apis/UserAPI'
import {getUserData} from '../../services/AuthServices'
import { translate } from '../../services/translate'

import Pagination from '@material-ui/lab/Pagination';

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


class UserPage extends Component{

    state = {
        selected: 0,
        list_user: [],
        isLoading: true,
        isLoadingTbl: true,
        filter: {},
        totalUser: 0,
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
        let userList = getListUser(this.state.filter, page)
        this.postProcess(userList)

        countUser(this.state.filter).then(totalUser => {
            let page_size = 30
            console.log('~~~ totalUser', totalUser)
            let end_num_ = (page+1)*page_size+1
            if (end_num_ > totalUser) {
                end_num_ = totalUser
            }
            this.setState({
                totalUser: totalUser,
                num_pages: Math.ceil(totalUser/30),
                start_num: page * page_size+1,
                end_num: end_num_
            })
        })
    }

    postProcess = (userList) => {
        userList.then(data => {
            console.log('~~ [postProcess] change list_user', data)
            this.setState({
                list_user: data,
                isLoading: false,
                isLoadingTbl: false
            })
        })
    }

    _handleSelect = (user_id) => {
        // this.setState({selected: index})
        // return <Redirect to='/a/user/{user_id}' />
        this.props.history.push(`/a/user/${user_id}`)
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

    _getColor = (role) => {
        if (role === 'Admin') return 'red'
        if (role === 'User') return 'green'
    }

    render() {

        // if (!getUserData().isAdmin) return <Redirect to='/a'/>

        const { selected, list_user, isLoading, num_pages, current_page, isLoadingTbl, totalUser, start_num, end_num } = this.state

        // if (isLoading) {
        //     return <p>Loading ...</p>
        // }

        console.log('~~ list_user', list_user)
        let total_user_this_page = list_user.length

        return (
            <div className='NotiPage'>
                <h1 className='PageTitle'>{translate['Users']}</h1>

            { (isLoading) ? 'Loading ...' : (
                <div className='Table'>
                    {(num_pages <= 0) ? '' : (
                    <div class="row">
                    <div class="col-5 pag_txt">
                        {translate['Show results']} {translate['from']} {start_num} {translate['to']} {end_num} {translate['of']} {totalUser}
                    </div>
                    <div class="col-7">
                    <MuiThemeProvider theme={theme}>
                        <Pagination count={num_pages} page={current_page} onChange={this.handleChange_pagination} color="primary" />
                    </MuiThemeProvider>
                    </div>
                    </div>
                    )}

                    {(isLoadingTbl) ? 'Loading ...' : 
                    (list_user.length === 0) ? 'Empty' : (
                    <Table striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            list_user.map((item, index) => (
                                <tr key={`domain-${index}`}>
                                    <th scope='row'>{index+1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <th style={{color: this._getColor(item.role)}}>{item.role}</th>
                                    <th>
                                        <i className="fas fa-user-edit" title='Edit User'></i>
                                        <i className="fas fa-user-slash" title='Remove User'></i>
                                    </th>
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

export default UserPage