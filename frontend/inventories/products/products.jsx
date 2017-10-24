/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {getAmountWarehouse} from '../../admin/utils/inventory'
import {filterProducts} from './actions'

@connect((store) => {
  return {
    products: store.products.products,
    warehouses: store.products.warehouses,
    warehouseActive: store.products.warehouseActive,
    movements: store.products.productmovements,
    departmentActive: store.products.departmentActive,
    subdepartmentActive: store.products.subdepartmentActive,
    filterText: store.products.filterText,
    movement: store.products.productmovementActive,
    productActive: store.products.productActive,
    isPhysicalTake: store.products.isPhysicalTake
  }
})
export default class Products extends React.Component {

  bntMovementClick(product, event) {
    this.props.dispatch({type: 'SET_PRODUCT', payload: product})
    this.props.dispatch({type: 'TOGGLE_PANEL', payload: ''})
    const movement = {
      ...this.props.movement
    }

    movement.productId = product._id
    this.props.dispatch({type: 'SET_PRODUCT_MOVEMENT', payload: movement})
  }

  // Main Layout
  render() {

    const products = this.props.products
    const movements = [...this.props.movements]
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

    // filter by elements on left column
    const filtered = filterProducts(
      sortedData, this.props.filterText,
      this.props.departmentActive,
      this.props.subdepartmentActive
    )

    const warehouseText = warehouseName ? `Bodega ${warehouseName}` : 'Existencia'

    // HEADER OF THE TABLE BASE OF WHETER IS PHYSICAL TAKE OR NOT
    const header = this.props.isPhysicalTake
      ? <tr>
        <td className='code-row'>Código</td>
        <td className='description-row'>Descripción</td>
        <td className='existence-row center'>Existencia</td>
        <td className='input-row center'>Cantidad</td>
        <td className='output-row center'>Registrar</td>
      </tr>
      : <tr>
        <td className='code-row'>Código</td>
        <td className='description-row'>Descripción</td>
        <td className='existence-row center'>{warehouseText}</td>
        <td className='input-row center'>Movimiento</td>
      </tr>

    // BODY OF THE TABLE BASE OF WHETER IS PHYSICAL TAKE OR NOT
    const body = filtered.map(product => {
      const movementBtn = <button onClick={this.bntMovementClick.bind(this, product)} className='btn btn-success'>
        <span className='fa fa-exchange' />
      </button>

      const inventory = this.props.warehouseActive
        ? product.inventory[this.props.warehouseActive]
        : product.inventory.total

      return <tr key={product._id}>
        <td>{product.code}</td>
        <td>{product.description}</td>
        <td className='center'>{inventory}</td>
        <td className='center'>{movementBtn}</td>
      </tr>
    })

    // RETURN BLOCK
    return <div className='products'>
      <table className='products-table table col-xs-12'>
        <thead>
          {header}
        </thead>
        <tbody>
          {body}
        </tbody>
      </table>

    </div>

  }

}
