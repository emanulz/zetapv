/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'

@connect((store) => {
  return {
    warehouses: store.inventories.warehouses,
    departments: store.products.departments,
    subdepartments: store.products.subdepartments
  }
})
export default class productData extends React.Component {

  // Render the product
  render() {

    const warehouses = this.props.warehouses

    warehouses.sort((a, b) => {
      return a.code - b.code
    })

    const product = this.props.product

    const department = this.props.departments.filter(department => {
      return department._id == product.department
    })

    const subdepartment = this.props.subdepartments.filter(subdepartment => {
      return subdepartment._id == product.subdepartment
    })

    const productDepartment = department.length ? `${department[0].code} - ${department[0].name}` : '-'
    const productSubDepartment = subdepartment.length ? `${subdepartment[0].code} - ${subdepartment[0].name}` : '-'

    const table = this.props.product
      ? <table className='table table-bordered'>
        <tbody>
          <tr>
            <th>Código:</th>
            <td>{product.code}</td>
          </tr>
          <tr>
            <th>Descripción:</th>
            <td>{product.description}</td>
          </tr>
          <tr>
            <th>Familia:</th>
            <td>{productDepartment}</td>
          </tr>
          <tr>
            <th>Sub-Familia:</th>
            <td>{productSubDepartment}</td>
          </tr>
          <tr>
            <th>Existencia:</th>
            <td>{`${product.inventory.total} ${product.unit}`}</td>
          </tr>
        </tbody>
      </table>
      : <div />

    const table2Content = warehouses.map(warehouse => {
      return product.inventory
        ? <tr key={warehouse._id}>
          <th>{warehouse.code} - {warehouse.name}</th>
          <td>{product['inventory'][warehouse._id]} {product.unit}</td>
        </tr>
        : <tr key={warehouse._id}>
          <th>{warehouse.code} - {warehouse.name}</th>
          <td>-</td>
        </tr>
    })

    return <div className='details-container-data-product'>
      Datos del Producto:
      {table}
      Existencia por Bodegas:
      <table className='table table-bordered'>
        <tbody>
          {table2Content}
        </tbody>
      </table>
    </div>
  }
}
