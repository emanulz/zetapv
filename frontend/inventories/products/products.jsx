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
    filterText: store.products.filterText
  }
})
export default class Products extends React.Component {

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
      return <tr key={product._id}>
        <td>{product.code}</td>
        <td>{product.description}</td>
        <td className='center'>{product.inventory}</td>
        <td className='center'>0</td>
        <td className='center'>0</td>
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
