/*
 * Module dependencies
 */
import React from 'react'

import {connect} from 'react-redux'
import {fetchItems} from '../utils/api'
import DataTable from '../generalComponents/dataTable/dataTable.jsx'

@connect((store) => {
  return {sales: store.sales.sales, sale: store.sales.saleSelected}
})
export default class List extends React.Component {

  componentWillMount() {

    this.props.dispatch({type: 'CLEAR_SALE', payload: ''})

    const kwargs = {
      db: 'sales',
      docType: 'SALE',
      dispatchType: 'FETCH_SALES_FULFILLED',
      dispatchErrorType: 'FETCH_SALES_REJECTED'
    }

    this.props.dispatch(fetchItems(kwargs)) // fetch clients before mount, send dispatch to reducer.

  }

  render() {

    const headerOrder = [
      {
        field: 'id',
        text: 'Código'
      }, {
        field: 'created',
        text: 'Fecha',
        type: 'date'
      }, {
        field: 'cart.cartTotal',
        text: 'Monto',
        type: 'price'
      }
    ]

    return <div className='clients-list-container'>

      <h1>Ventas:</h1>

      <DataTable headerOrder={headerOrder} model='sales' data={this.props.sales} addLink='/pos' />

    </div>

  }

}
