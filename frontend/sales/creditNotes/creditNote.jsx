/*
 * Module dependencies
 */
import React from 'react'

import Filters from './filters/filters.jsx'
import Sales from './sales/sales.jsx'
// components

export default class CreditNote extends React.Component {

  // Main Layout
  render() {

    return <div className='creditNote'>
      <h2>Notas de Crédito:</h2>
      <div className='creditNote-container'>
        <Filters />
        <Sales />
      </div>
    </div>

  }

}
