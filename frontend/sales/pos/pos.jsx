/*
 * Module dependencies
 */
import React from 'react'
// components
import Main from './main/main.jsx'
import Sidebar from './sidebar/sidebar.jsx'
import SearchClient from './search/clients/searchPanel.jsx'
import SearchProduct from './search/products/searchPanel.jsx'
import Footer from './footer/footer.jsx'
import PayPanel from './pay/payPanel.jsx'
import InvoicePanel from './invoice/invoicePanel/invoicePanel.jsx'

import SalesPanel from './sales/dailySales.jsx'

export default class Pos extends React.Component {

  // Main Layout
  render() {

    return <div>
      <div className='row' style={{'margin': '0'}}>
        <Main />
        <Sidebar />
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

  }

}
