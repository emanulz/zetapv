import React from 'react'
import ReactDOM from 'react-dom'
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

// components
import Main from './main/main.jsx'
import Sidebar from './sidebar/sidebar.jsx'
import SearchClient from './search/clients/searchPanel.jsx'
import SearchProduct from './search/products/searchPanel.jsx'
import Footer from './footer/footer.jsx'
import PayPanel from './pay/payPanel.jsx'
import InvoicePanel from './invoice/invoicePanel/invoicePanel.jsx'

import SalesPanel from './sales/dailySales.jsx'

// store
import store from './store.js'

window.alertify = alertify
formatMoney()
window.printDiv = printDiv

ReactDOM.render(
  <Provider store={store}>
    <div>
      <DbSync />
      <Config />
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
        <SalesPanel />

      </div>

    </div>
  </Provider>, document.getElementById('app-container'))
