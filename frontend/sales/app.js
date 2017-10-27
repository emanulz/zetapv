import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'

// utils
import alertify from 'alertifyjs'
import formatMoney from '../utils/formatMoney.js'
import printDiv from '../utils/printDiv.js'

// layout components
import TopBar from '../layout/topBar/topBar.jsx'
import SideMenu from '../layout/sideMenu/sideMenu.jsx'
import DbSync from './dbSync/dbSync.jsx'
import Config from './config/config.jsx'

// Store
import store from './store.js'
// Routes
import routes from './routes.js'

window.alertify = alertify
formatMoney()
window.printDiv = printDiv

ReactDOM.render(
  <Provider store={store}>

    <Router>
      <div >
        <DbSync />
        <Config />
        <SideMenu />
        <div id='mainContainer' className='blur-div mainContainer'>
          <TopBar />
          <div className='mainContainer-content'>
            {routes}
          </div>
        </div>
      </div>
    </Router>

  </Provider>, document.getElementById('app-container'))
