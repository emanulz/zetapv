/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {fetchItems} from '../../utils/api'
import {getAmountWarehouse} from '../../utils/inventory'

// components
import DataTable from '../../generalComponents/dataTable/dataTable.jsx'

@connect((store) => {
  return {
    movements: store.inventories.productmovements,
    products: store.products.products,
    warehouses: store.inventories.warehouses
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
    const warehouses = this.props.warehouses
    let warehouseName = ''

    const data = products.length
      ? products.map(product => {
        if (product.useInventory) {
          product.inventory = {}
          let amount = 0
          warehouses.map(warehouse => {
            warehouseName = warehouse._id == this.props.warehouseActive ? warehouse.name : warehouseName
            const amountWarehouse = getAmountWarehouse(product._id, warehouse._id, movements)
            product.inventory[warehouse._id] = amountWarehouse
            amount = amount + amountWarehouse
          })
          // product.inventory = getAmount(product._id, movements)
          product.inventory.total = amount
        } else {
          product.inventory = '-'
        }
        return product
      })
      : []
    // Just use products that use inventory
    const filteredData = data.filter((el) => el.useInventory)
    const sortedData = filteredData.sort((a, b) => a.code - b.code)

    const headerOrder = [
      {
        field: 'code',
        text: 'Código',
        type: 'primaryNoEdit'
      }, {
        field: 'description',
        text: 'Descripción',
        type: 'text'
      },
      {
        field: 'inventory.total',
        text: 'Existencia Total',
        type: 'text'
      }
    ]

    return <div className='list-container'>

      <h1>Inventario de Productos:</h1>

      <DataTable headerOrder={headerOrder} model='inventories/products/detail' data={sortedData} addLink='/admin/inventories/products/movements/add' />

    </div>
  }
}
