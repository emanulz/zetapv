/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import { saveItem, getNextNumericCode, fetchItems } from '../../admin/utils/api'
import { checkProductMovementData } from './actions'

@connect((store) => {
  return {
    movements: store.products.productmovements,
    productActive: store.products.productActive,
    visible: store.sidePanel.visible,
    movement: store.products.productmovementActive
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
        dispatchType: 'CLEAR_PRODUCT_MOVEMENT'
      }

      this.props.dispatch(saveItem(obj))
      this.props.dispatch({type: 'TOGGLE_PANEL', payload: ''})

      const kwargs = {
        db: 'general',
        docType: 'PRODUCT_MOVEMENT',
        dispatchType: 'FETCH_PRODUCTMOVEMENTS_FULFILLED',
        dispatchErrorType: 'FETCH_PRODUCTMOVEMENTS_REJECTED'
      }

      this.props.dispatch(fetchItems(kwargs))
    }
  }
  // Main Layout
  render() {

    const panelClass = this.props.visible
      ? 'inventory-sidePanel visible'
      : 'inventory-sidePanel'

    const product = this.props.productActive.product
    const type = this.props.productActive.type

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
            <td>{product.department}</td>
          </tr>
          <tr>
            <th>Sub-Familia:</th>
            <td>{product.subdepartment}</td>
          </tr>
          <tr>
            <th>Existencia:</th>
            <td>{`${product.inventory} ${product.unit}`}</td>
          </tr>
        </tbody>
      </table>
      : <div />

    const movText = (type == 'INPUT') ? 'Entrada de producto:' : (type == 'OUTPUT' ? 'Salida de Producto:' : 'Movimiento:')

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
          </div>
          <div className='inventory-sidePanel-container-content-actions'>
            {movText}
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
