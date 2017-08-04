import React from 'react'
import ReactDOM from 'react-dom'

import TopBar from '../pos/layout/topBar/topBar.jsx'
import SideMenu from '../pos/layout/sideMenu/sideMenu.jsx'
import Body from './body/body.jsx'

ReactDOM.render(
  <div>
    <SideMenu />

    <div id='mainContainer' className='mainContainer'>
      <TopBar />
      <Body />
    </div>

  </div>, document.getElementById('app-container'))
