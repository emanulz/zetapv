/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../actions'
// components
import DataTable from '../../generalComponents/dataTable/dataTable.jsx'

@connect((store) => {
  return {products: store.products.products}
})
export default class Product extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchProducts()) // fetch products before mount, send dispatch to reducer.
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
