/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {fetchItems, setItem, setItems} from '../../utils/api'

@connect((store) => {
  return {
    movements: store.receivable.clientActiveMovements,
    client: store.clients.clientActive,
    creditSales: store.receivable.clientActiveCreditSales
  }
})
export default class Statement extends React.Component {

  componentWillMount() {

    this.props.dispatch({type: 'CLEAR_CLIENT', payload: ''})
    this.props.dispatch({type: 'CLEAR_CLIENT_ACTIVE_MOVEMENTS', payload: ''})
    this.props.dispatch({type: 'CLEAR_CLIENT_ACTIVE_CREDIT_SALES', payload: ''})

    const kwargs = {
      db: 'sales',
      docType: 'SALE',
      dispatchType: 'FETCH_SALES_FULFILLED',
      dispatchErrorType: 'FETCH_SALES_REJECTED'
    }
    this.props.dispatch(fetchItems(kwargs)) // fetch clients before mount, send dispatch to reducer.

    const id = this.props.location.pathname.split('/').pop()
    const kwargs2 = {
      db: 'general',
      docType: 'CLIENT',
      lookUpField: 'code',
      lookUpValue: id,
      lookUpName: 'Código',
      modelName: 'Cleintes',
      dispatchType: 'SET_CLIENT'
    }
    this.props.dispatch(setItem(kwargs2))

  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.client && !nextprops.movements.length && !nextprops.creditSales.length) {
      const id = nextprops.client._id

      const kwargs = {
        db: 'general',
        docType: 'CLIENT_MOVEMENT',
        lookUpField: 'client._id',
        lookUpValue: id,
        lookUpName: 'Código de cliente',
        modelName: 'Movimientos',
        dispatchType: 'SET_CLIENT_ACTIVE_MOVEMENTS'
      }

      this.props.dispatch(setItems(kwargs))

      const kwargs2 = {
        db: 'sales',
        docType: 'SALE',
        lookUpField: 'client._id',
        lookUpValue: id,
        lookUpName: 'código de cliente',
        modelName: 'Facturas',
        dispatchType: 'SET_CLIENT_ACTIVE_CREDIT_SALES'
      }

      this.props.dispatch(setItems(kwargs2))

    }
  }

  movementItem(movement) {
    const movClass = movement.type == 'CREDIT' ? 'credit' : 'debit'
    const typeText = movement.type == 'CREDIT' ? 'Crédito' : 'Débito'
    const date = new Date(movement.date)

    return <tr className={`${movClass}`} key={movement._id}>
      <td>{movement.document}</td>
      <td>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</td>
      <td>{typeText}</td>
      <td>₡ {movement.amount.formatMoney(2, ',', '.')}</td>
      <td>{movement.description}</td>
    </tr>
  }

  // Render the product
  render() {

    return <div className='list-container'>

      <h1>Estado de Cuenta</h1>

    </div>
  }
}
