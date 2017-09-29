/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {getAmount} from '../../admin/utils/inventory'
import {filterProducts} from './actions'

@connect((store) => {
  return {
    products: store.products.products,
    movements: store.products.productmovements,
    departmentActive: store.products.departmentActive,
    subdepartmentActive: store.products.subdepartmentActive,
    filterText: store.products.filterText,
    movement: store.products.productmovementActive
  }
})
export default class Products extends React.Component {

  bntInputClick(product, event) {
    this.props.dispatch({type: 'SET_PRODUCT', payload: {product: product, type: 'INPUT'}})
    this.props.dispatch({type: 'TOGGLE_PANEL', payload: ''})
    const movement = {
      ...this.props.movement
    }

    movement.productId = product._id
    movement.type = 'INPUT'

    this.props.dispatch({type: 'SET_PRODUCT_MOVEMENT', payload: movement})
  }

  bntOutputClick(product, event) {
    this.props.dispatch({type: 'SET_PRODUCT', payload: {product: product, type: 'OUTPUT'}})
    this.props.dispatch({type: 'TOGGLE_PANEL', payload: ''})
    const movement = {
      ...this.props.movement
    }

    movement.productId = product._id
    movement.type = 'OUTPUT'

    this.props.dispatch({type: 'SET_PRODUCT_MOVEMENT', payload: movement})
  }
  // Main Layout
  render() {

    const products = this.props.products
    const movements = this.props.movements

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
    // Just use products that use inventory
    const filteredData = data.filter((el) => el.useInventory)
    const sortedData = filteredData.sort((a, b) => a.code - b.code)

    // filter by elements on left column
    const filtered = filterProducts(
      sortedData, this.props.filterText,
      this.props.departmentActive,
      this.props.subdepartmentActive
    )

    const body = filtered.map(product => {
      const inputBtn = <button onClick={this.bntInputClick.bind(this, product)} className='btn btn-success'>
        <span className='fa fa-plus' />
      </button>
      const outputBtn = <button onClick={this.bntOutputClick.bind(this, product)} className='fa btn btn-danger'>
        <span className='fa fa-minus' />
      </button>

      return <tr key={product._id}>
        <td>{product.code}</td>
        <td>{product.description}</td>
        <td className='center'>{product.inventory}</td>
        <td className='center'>{inputBtn}</td>
        <td className='center'>{outputBtn}</td>
      </tr>
    })

    return <div className='products'>
      <table className='products-table table col-xs-12'>
        <thead>
          <tr>
            <td className='code-row'>Código</td>
            <td className='description-row'>Descripción</td>
            <td className='existence-row center'>Existencia</td>
            <td className='input-row center'>Entrada</td>
            <td className='output-row center'>Salida</td>
          </tr>
        </thead>
        <tbody>
          {body}
        </tbody>
      </table>

    </div>

  }

}
