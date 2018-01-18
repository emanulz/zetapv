/*
 * Module dependencies
 */
import React from 'react'
// components
import Main from '../pos/main/main.jsx'
import SearchClient from '../pos/search/clients/searchPanel.jsx'
import SearchProduct from '../pos/search/products/searchPanel.jsx'
import Footer from '../pos/footer/footer.jsx'

import Sidebar from './sidebar/sidebar.jsx'
import InvoicePanel from './invoice/invoicePanel/invoicePanel.jsx'

export default class Pos extends React.Component {

  // Main Layout
  render() {

    return <div>
      <div className='proforma-header-tittle'>Factura Proforma:</div>
      <div className='row' style={{'margin': '0'}}>
        <Main />
        <Sidebar />
        <SearchClient />
        <SearchProduct />
      </div>

      <div className='row footer'>
        <Footer />
      </div>

      <InvoicePanel />
    </div>

  }

}
