import React from 'react'
import ReactDOM from 'react-dom'

// UTILS
import alertify from 'alertifyjs'
// COMPONENTS
import DbSync from './dbSync/dbSync.jsx'
import TopBar from '../layout/topBar/topBar.jsx'
import SideMenu from '../layout/sideMenu/sideMenu.jsx'
import {Provider} from 'react-redux'
import store from './store.js'
import Config from './config/config.jsx'

import Filters from './filters/filters.jsx'
import Products from './products/products.jsx'
import SidePanel from './sidePanel/sidePanel.jsx'

window.alertify = alertify
// store

ReactDOM.render(
  <Provider store={store}>
    <div>
      <DbSync />
      <Config />
      <SideMenu />

      <div id='mainContainer' className='mainContainer'>
        <TopBar />
        <div className='mainContainer-content'>
          <Filters />
          <Products />
          <SidePanel />
        </div>

      </div>

    </div>
  </Provider>, document.getElementById('app-container'))
