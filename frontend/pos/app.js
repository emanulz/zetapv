import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

// utils
import alertify from 'alertifyjs'
import formatMoney from '../utils/formatMoney.js'
import printDiv from '../utils/printDiv.js'

// layout components
import TopBar from './layout/topBar/topBar.jsx'
import SideMenu from './layout/sideMenu/sideMenu.jsx'
import DbSync from './generalComponents/dbSync/dbSync.jsx'

// components
import Main from './main/main.jsx'
import Sidebar from './sidebar/sidebar.jsx'
import SearchClient from './search/clients/searchPanel.jsx'
import SearchProduct from './search/products/searchPanel.jsx'
import Footer from './footer/footer.jsx'
import PayPanel from './pay/payPanel.jsx'
import InvoicePanel from './invoice/InvoicePanel/invoicePanel.jsx'

// store
import store from './store.js'

window.alertify = alertify
formatMoney()
window.printDiv = printDiv

ReactDOM.render(
  <Provider store={store}>
    <div>
      <DbSync remoteDB='http://emanuelziga:emma101421@192.168.9.108:5984' />
      <SideMenu />
      <div id='mainContainer' className='blur-div mainContainer'>
        <TopBar />
        <div className='mainContainer-content'>
          <div className='row' style={{'margin': '0'}}>
            <Main />
            <Sidebar />
          </div>
          <SearchClient />
          <SearchProduct />

        </div>

        <div className='row footer'>
          <Footer />
        </div>

        <PayPanel />
        <InvoicePanel />

      </div>

    </div>
  </Provider>, document.getElementById('app-container'))
