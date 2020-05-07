import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css'
import './styles/app.scss'
import App from './app/App'
import getHistory from './services/helpers/getHistory'

ReactDOM.render(
    <Router history={getHistory()}>
        <App />
    </Router>,
    document.getElementById('root'))
