import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'

// utils
import alertify from 'alertifyjs'
import formatMoney from '../utils/formatMoney.js'

// layout components
import DbSync from './generalComponents/dbSync/dbSync.jsx'
import TopBar from './layout/topBar/topBar.jsx'
import SideMenu from './layout/sideMenu/sideMenu.jsx'
import Configbar from './layout/configBar/configBar.jsx'

import {hideConfigBar} from './layout/configBar/actions'

// Store
import store from './store.js'
// Routes
import routes from './routes.js'

window.alertify = alertify
formatMoney()

ReactDOM.render(
  <Provider store={store}>

    <Router>
      <div >
        <DbSync remoteDB='http://emanuelziga:emma101421@192.168.9.108:5984' />
        <SideMenu />
        <div id='mainContainer' className='blur-div mainContainer'>
          <TopBar />
          <Configbar />
          <div onClick={hideConfigBar} className='mainContainer-content'>
            {routes}
          </div>

        </div>
      </div>
    </Router>

  </Provider>, document.getElementById('app-container'))
