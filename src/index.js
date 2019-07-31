import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router-dom/Router'

import 'bootstrap/dist/css/bootstrap.css'
import App from './app/App'
import getHistory from './services/helpers/getHistory'

ReactDOM.render(
    <Router history={getHistory()}>
        <App />
    </Router>,
    document.getElementById('root'))
