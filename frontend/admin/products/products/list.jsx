/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {fetchItems} from '../../utils/api'
// components
import DataTable from '../../generalComponents/dataTable/dataTable.jsx'

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
        field: 'code',
        text: 'Código',
        type: 'primary'
      }, {
        field: 'description',
        text: 'Descripción',
        type: 'text'
      }, {
        field: 'cost',
        text: 'Costo',
        type: 'price'
      }, {
        field: 'usetaxes',
        text: 'IV?',
        type: 'bool'
      }, {
        field: 'taxes',
        text: 'IV %'
      }, {
        field: 'sellprice',
        text: 'Precio de venta',
        type: 'price'
      }
    ]

    return <div className='products-list-container'>

      <h1>Productos:</h1>

      <DataTable headerOrder={headerOrder} model='products' addLink='/admin/products/add' data={this.props.products} />

    </div>
  }
}
