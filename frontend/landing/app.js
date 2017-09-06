import React from 'react'
import ReactDOM from 'react-dom'

// UTILS
import alertify from 'alertifyjs'
// COMPONENTS
import TopBar from './layout/topBar/topBar.jsx'
import SideMenu from '../pos/layout/sideMenu/sideMenu.jsx'
import Body from './body/body.jsx'
import {Provider} from 'react-redux'
import store from '../pos/store.js'
import Config from '../pos/config/config.jsx'

window.alertify = alertify
// store

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Config />
      <SideMenu />

      <div id='mainContainer' className='mainContainer'>
        <TopBar />
        <Body />
      </div>

    </div>
  </Provider>, document.getElementById('app-container'))
