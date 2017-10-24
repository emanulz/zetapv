/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {getAmount} from '../../admin/utils/inventory'
import { saveItem, getNextNumericCode, fetchItems } from '../../admin/utils/api'
import { checkProductMovementData } from '../sidePanel/actions'
import {filterProducts} from './actions'

@connect((store) => {
  return {
    products: store.products.products,
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

      const kwargs = {
        db: 'general',
        docType: 'PRODUCT_MOVEMENT',
        dispatchType: 'FETCH_PRODUCTMOVEMENTS_FULFILLED',
        dispatchErrorType: 'FETCH_PRODUCTMOVEMENTS_REJECTED'
      }

      this.props.dispatch(fetchItems(kwargs))
      this.props.dispatch({type: 'CLEAR_PRODUCT', payload: ''})
    }
  }

  setProductActive(product, event) {

    const movement = {
      ...this.props.movement
    }

    if (product._id != movement.productId) {
      this.props.dispatch({type: 'CLEAR_PRODUCT_MOVEMENT', payload: ''})
      this.props.dispatch({type: 'SET_PRODUCT', payload: {product: product, type: 'ADJUST'}})

      movement.productId = product._id
      movement.type = 'ADJUST'
      movement.description = 'Ajuste por toma física.'

      this.props.dispatch({type: 'SET_PRODUCT_MOVEMENT', payload: movement})
    }
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
        <td className='existence-row center'>Existencia</td>
        <td className='input-row center'>Entrada</td>
        <td className='output-row center'>Salida</td>
      </tr>

    // BODY OF THE TABLE BASE OF WHETER IS PHYSICAL TAKE OR NOT
    const body = this.props.isPhysicalTake
      ? filtered.map(product => {
        const productActiveId = this.props.productActive ? this.props.productActive.product._id : 0
        const activeClass = productActiveId == product._id ? 'active-row' : ''
        const value = productActiveId == product._id ? this.props.movement.amount : ''
        const amountField = <input type='number' name='amount' onChange={this.handleInputChange.bind(this)}
          disabled={!(productActiveId == product._id)}
          className='form-control'
          value={value}
        />

        const savePhysicalBtn = <button onClick={this.saveBtn.bind(this)} disabled={!(productActiveId == product._id)} className='btn btn-primary'>
          <span className='fa fa-check' />
        </button>

        return <tr className={activeClass} onClick={this.setProductActive.bind(this, product)} key={product._id}>
          <td>{product.code}</td>
          <td>{product.description}</td>
          <td className='center'>{product.inventory}</td>
          <td className='center'>{amountField}</td>
          <td className='center'>{savePhysicalBtn}</td>
        </tr>
      })
      : filtered.map(product => {
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
