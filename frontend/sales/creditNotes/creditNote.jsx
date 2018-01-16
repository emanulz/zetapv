/*
 * Module dependencies
 */
import React from 'react'

import Filters from './filters/filters.jsx'
import Sales from './sales/sales.jsx'
import SidePanel from './sidePanel/sidePanel.jsx'
// components

export default class CreditNote extends React.Component {

  // Main Layout
  render() {

    return <div className='creditNote'>
      <div className='creditNote-container'>
        <Filters />
        <Sales />
        <SidePanel />
      </div>
    </div>

  }

}
