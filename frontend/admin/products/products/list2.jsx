/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {fetchItems} from '../../utils/api'
// components
import ReactTable from 'react-table'

@connect((store) => {
  return {products: store.products.products}
})
export default class Product extends React.Component {
  componentWillMount() {

    const kwargs = {
      db: 'general',
      docType: 'PRODUCT',
      dispatchType: 'FETCH_PRODUCTS_FULFILLED',
      dispatchErrorType: 'FETCH_PRODUCTS_REJECTED'
    }

    this.props.dispatch(fetchItems(kwargs)) // fetch clients before mount, send dispatch to reducer.

  }

  // Render the product
  render() {
    const headerOrder = [
      {
        accessor: 'code',
        Header: 'Código'
      }, {
        accessor: 'description',
        Header: 'Descripción'
      }, {
        accessor: 'useTaxes',
        Header: 'IV?'
      }, {
        accessor: 'taxes',
        Header: 'IV %'
      }, {
        accessor: 'sellPrice',
        Header: 'Precio de venta 1'
      }, {
        accessor: 'sellPrice2',
        Header: 'Precio de venta 2'
      }
    ]

    return <div className='products-list-container'>

      <h1>Productos:</h1>
      <ReactTable
        data={this.props.products}
        columns={headerOrder}
        defaultPageSize={10}
      />

    </div>
  }
}
