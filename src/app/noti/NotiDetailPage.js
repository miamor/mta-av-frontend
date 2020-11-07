import React, { Component } from 'react'
import { translate } from '../../services/translate'
// import { bytesToSize } from '../../services/bytesToSize'
// import { getListHistory } from '../../services/apis/HistoryAPI'
import { getNoti } from '../../services/apis/NotiAPI'


// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
// import getNoti from '../../services/helpers/getNoti';
// import { createMuiTheme } from '@material-ui/core/styles';
// import { ThemeProvider } from '@material-ui/styles';


// const styles = {
//     AppBar: {
//         background: 'transparent',
//         boxShadow: 'none',
//         width: '100%'
//     },
// };

class NotiDetailPage extends Component {

    state = {
        item_noti: {},
        isLoading: true,
    }

    componentDidMount() {

        const { match } = this.props

        this.setState({ isLoading: true })

        // hash = match.params.hash

        getNoti(match.params.noti_id).then(item => {
            console.log('~~ item', item)
            this.setState({
                item_noti: item,
                isLoading: false
            })

        });
    }

    render() {

        const { item_noti, isLoading } = this.state

        if (isLoading) {
            return <p>Loading ...</p>
        }

        return (
            <div class="NotiDetailPage">
                <h1 className='PageTitle'>{translate['Notifications']}</h1>

                <div class="row overview">
                    <div class="Item card Last col">
                        <div class="card-header">{item_noti['date_created']}</div>
                        <div class="card-body row">
                                <div class="ItemNote">{item_noti['message']}</div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}

export default NotiDetailPage
