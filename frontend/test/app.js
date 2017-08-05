import React from 'react'
import ReactDOM from 'react-dom'
//import * as PouchDB from 'pouchdb-browser'
const PouchDB = require('pouchdb')
window.PouchDB = PouchDB
var localDB = new PouchDB('hello3')
var localDB2 = new PouchDB('helloNursee')

//import DbSync from './generalComponents/dbSync/dbSync.jsx'
//import TopBar from './layout/topBar/topBar.jsx'
import SideMenu from '../admin/layout/sideMenu/sideMenu.jsx'

ReactDOM.render(
  <div>
    {/* <DbSync remoteDB='ws://localhost:8000' /> */}
    {/* <SideMenu /> */}
    {/* <div id='mainContainer' className='blur-div mainContainer'>
      <TopBar />
      <div className='mainContainer-content'>
        {routes}
      </div>

    </div> */}
  </div>, document.getElementById('app-container'))

document.getElementById('loader').classList.remove('loader')
