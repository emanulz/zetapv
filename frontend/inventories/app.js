import React from 'react'
import ReactDOM from 'react-dom'

// UTILS
import alertify from 'alertifyjs'
// COMPONENTS
import TopBar from '../layout/topBar/topBar.jsx'
import SideMenu from '../layout/sideMenu/sideMenu.jsx'
import {Provider} from 'react-redux'
import store from './store.js'
import Config from './config/config.jsx'

window.alertify = alertify
// store

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Config />
      <SideMenu />

      <div id='mainContainer' className='mainContainer'>
        <TopBar />

      </div>

    </div>
  </Provider>, document.getElementById('app-container'))
