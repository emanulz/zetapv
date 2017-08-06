import React from 'react'
import ReactDOM from 'react-dom'

// UTILS
import alertify from 'alertifyjs'
// COMPONENTS
import TopBar from './layout/topBar/topBar.jsx'
import SideMenu from '../pos/layout/sideMenu/sideMenu.jsx'
import Body from './body/body.jsx'

window.alertify = alertify

ReactDOM.render(
  <div>
    <SideMenu />

    <div id='mainContainer' className='mainContainer'>
      <TopBar />
      <Body />
    </div>

  </div>, document.getElementById('app-container'))
