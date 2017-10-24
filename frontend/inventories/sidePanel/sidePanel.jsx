/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import Select2 from 'react-select2-wrapper'
import { saveItem, getNextNumericCode, fetchItems } from '../../admin/utils/api'
import { checkProductMovementData } from './actions'

@connect((store) => {
  return {
    movements: store.products.productmovements,
    productActive: store.products.productActive,
    visible: store.sidePanel.visible,
    movement: store.products.productmovementActive,
    departments: store.products.departments,
    subdepartments: store.products.subdepartments,
    warehouses: store.products.warehouses,
    warehouseActive: store.products.warehouseActive,
    warehouseInputActive: store.products.warehouseInputActive,
    warehouseOutputActive: store.products.warehouseOutputActive
  }
})
export default class Products extends React.Component {

  togglePanel() {
    this.props.dispatch({type: 'TOGGLE_PANEL', payload: ''})
  }

  handleInputChange(event) {

    const target = event.target
    let value

    switch (target.type) {
      case 'number':
      {
        value = parseFloat(target.value)
          ? parseFloat(target.value)
          : ''
        break
      }
      default:
      {
        value = target.value
      }
    }

    const name = target.name

    const movement = {
      ...this.props.movement
    }

    movement[name] = value

    this.props.dispatch({type: 'SET_PRODUCT_MOVEMENT', payload: movement})
  }

  saveBtn() {
    const movement = this.props.movement
    const movements = this.props.movements

    movement.document = getNextNumericCode(movements, 'document')
    const fieldsOk = checkProductMovementData(movement, movements)
    movement.date = new Date()
    if (fieldsOk) {
      movement.created = new Date()
      const obj = {
        db: 'general',
        docType: 'PRODUCT_MOVEMENT',
        item: movement,
        sucessMessage: 'Movimiento creado correctamente',
        errorMessage: 'Hubo un error al crear el Movimiento, intente de nuevo.',
        dispatchType: 'CLEAR_PRODUCT_MOVEMENTS'
      }

      this.props.dispatch(saveItem(obj))
      this.props.dispatch({type: 'TOGGLE_PANEL', payload: ''})

      const kwargs = {
        db: 'general',
        docType: 'PRODUCT_MOVEMENT',
        dispatchType: 'FETCH_PRODUCT_MOVEMENTS_FULFILLED',
        dispatchErrorType: 'FETCH_PRODUC_TMOVEMENTS_REJECTED'
      }

      this.props.dispatch(fetchItems(kwargs))
      this.props.dispatch({type: 'CLEAR_PRODUCT', payload: ''})

    }
  }
  // Main Layout
  render() {

    const panelClass = this.props.visible
      ? 'inventory-sidePanel visible'
      : 'inventory-sidePanel'

    const product = this.props.productActive

    const department = this.props.departments.filter(department => {
      return department._id == product.department
    })

    const subdepartment = this.props.subdepartments.filter(subdepartment => {
      return subdepartment._id == product.subdepartment
    })

    const productDepartment = department.length ? `${department[0].code} - ${department[0].name}` : '-'
    const productSubDepartment = subdepartment.length ? `${subdepartment[0].code} - ${subdepartment[0].name}` : '-'

    const table = this.props.productActive
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

    const table2Content = this.props.warehouses.map(warehouse => {
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

    // ********************************************************************
    // SELECT2 DATA
    // ********************************************************************
    const warehouses = this.props.warehouses

    warehouses.sort((a, b) => {
      return a.code - b.code
    })

    const warehousesData = warehouses.map(warehouse => {
      return {text: `${warehouse.code} - ${warehouse.name}`, id: warehouse._id}
    })

    const movementTypeData = [
      {text: `1 - Entrada`, id: 'INPUT'},
      {text: `2 - Salida`, id: 'OUTPUT'},
      {text: `3 - Traslado entre bodegas`, id: 'OUTPUT-INPUT'}
    ]

    return <div className={panelClass}>
      <div className='inventory-sidePanel-container'>
        <div className='inventory-sidePanel-container-header'>
          Registrar Movimiento
          <span onClick={this.togglePanel.bind(this)} className='fa fa-close' />
        </div>
        <div className='inventory-sidePanel-container-content'>
          <div className='inventory-sidePanel-container-content-product'>
            Datos del Producto:
            {table}
            Existencia por Bodegas:
            <table className='table table-bordered'>
              <tbody>
                {table2Content}
              </tbody>
            </table>
          </div>
          <div className='inventory-sidePanel-container-content-actions'>
            Movimiento de Producto
            <Select2
              name='type'
              className='form-control'
              value={this.props.movement.type}
              onSelect={this.handleInputChange.bind(this)}
              data={movementTypeData}
              options={{
                placeholder: 'Elija una Tipo de Movimiento...',
                noResultsText: 'Sin elementos'
              }}
            />
            <Select2
              name='warehouse'
              value={this.props.movement.warehouse}
              onSelect={this.handleInputChange.bind(this)}
              className='form-control'
              data={warehousesData}
              options={{
                placeholder: 'Elija una Bodega...',
                noResultsText: 'Sin elementos'
              }}
            />
            <input value={this.props.movement.amount} name='amount' type='number' placeholder='Cantidad'
              onChange={this.handleInputChange.bind(this)} className='form-control' />
            <input value={this.props.movement.description} name='description' type='text' placeholder='Descripción'
              onChange={this.handleInputChange.bind(this)} className='form-control' />
            <button onClick={this.saveBtn.bind(this)} className='btn btn-primary'>Registrar</button>
          </div>
        </div>
      </div>
    </div>

  }

}
