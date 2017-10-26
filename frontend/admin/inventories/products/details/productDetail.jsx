/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import Data from './data.jsx'
import Movements from './movements.jsx'
import {getAmountWarehouse} from '../../../utils/inventory'

@connect((store) => {
  return {
    movements: store.inventories.productmovements,
    products: store.products.products,
    warehouses: store.inventories.warehouses

  }
})
export default class ProductDetail extends React.Component {

  // Render the product
  render() {

    const code = this.props.location.pathname.split('/').pop()
    const movements = this.props.movements
    const warehouses = this.props.warehouses
    let warehouseName = ''

    const productsFiltered = this.props.products.length
      ? this.props.products.filter(product => product.code == code)
      : []
    const product = productsFiltered.length ? productsFiltered[0] : false

    if (product) {
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
    }

    const movementsToRender = product
      ? this.props.movements.filter(movement => movement.productId == product._id)
      : []

    movementsToRender.sort((a, b) => {
      return b.document - a.document
    })

    return <div className='list-container'>

      <h1>Detalles de inventario</h1>

      <div className='row details-container'>
        <div className='col-xs-5 details-container-data'>
          <Data product={product} />
        </div>

        <div className='col-xs-7 details-container-movements'>
          <Movements movements={movementsToRender} />
        </div>
      </div>

    </div>
  }
}
