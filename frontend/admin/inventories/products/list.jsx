/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {fetchItems} from '../../utils/api'
import {getAmount} from '../../utils/inventory'

// components
import DataTable from '../../generalComponents/dataTable/dataTable.jsx'

@connect((store) => {
  return {
    movements: store.inventories.productmovements,
    products: store.products.products
  }
})
export default class MovementsList extends React.Component {

  componentWillMount() {
    const kwargs = {
      db: 'general',
      docType: 'PRODUCT_MOVEMENT',
      dispatchType: 'FETCH_PRODUCT_MOVEMENTS_FULFILLED',
      dispatchErrorType: 'FETCH_PRODUCT_MOVEMENTS_REJECTED'
    }
    this.props.dispatch(fetchItems(kwargs)) // fetch products before mount, send dispatch to reducer.

    const kwargs2 = {
      db: 'general',
      docType: 'PRODUCT',
      dispatchType: 'FETCH_PRODUCTS_FULFILLED',
      dispatchErrorType: 'FETCH_PRODUCTS_REJECTED'
    }
    this.props.dispatch(fetchItems(kwargs2)) // fetch products before mount, send dispatch to reducer.
  }

  // Render the product
  render() {
    const movements = this.props.movements
    const products = this.props.products

    const data = products.length && movements.length
      ? products.map(product => {
        if (product.useInventory) {
          product.inventory = getAmount(product._id, movements)
        } else {
          product.inventory = '-'
        }
        return product
      })
      : []
    const dataFiltered = data.filter(el => el.useInventory)

    const headerOrder = [
      {
        field: 'code',
        text: 'Código',
        type: 'text'
      }, {
        field: 'description',
        text: 'Descripción',
        type: 'text'
      },
      {
        field: 'useInventory',
        text: 'Usa Inventarios',
        type: 'bool'
      },
      {
        field: 'inventory',
        text: 'Existencia',
        type: 'text'
      }
    ]

    return <div className='list-container'>

      <h1>Movimientos:</h1>

      <DataTable headerOrder={headerOrder} model='inventories/products/movements' data={dataFiltered} addLink='/admin/inventories/products/movements/add' />

    </div>
  }
}
