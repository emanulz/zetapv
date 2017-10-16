/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {fetchItems, setItem, setItems} from '../../../utils/api'

@connect((store) => {
  return {
    movements: store.sales.saleMovements,
    clients: store.clients.clients,
    sale: store.sales.saleActive
  }
})
export default class MovementsList extends React.Component {

  componentWillMount() {
    this.props.dispatch({type: 'CLEAR_SALE', payload: ''})
    this.props.dispatch({type: 'CLEAR_SALE_MOVEMENTS', payload: ''})

    const kwargs = {
      db: 'general',
      docType: 'CLIENT_MOVEMENT',
      dispatchType: 'FETCH_CLIENT_MOVEMENTS_FULFILLED',
      dispatchErrorType: 'FETCH_CLIENT_MOVEMENTS_REJECTED'
    }
    this.props.dispatch(fetchItems(kwargs)) // fetch client movements before mount, send dispatch to reducer.

    const kwargs2 = {
      db: 'sales',
      docType: 'SALE',
      dispatchType: 'FETCH_SALES_FULFILLED',
      dispatchErrorType: 'FETCH_SALES_REJECTED'
    }
    this.props.dispatch(fetchItems(kwargs2)) // fetch clients before mount, send dispatch to reducer.

    const id = this.props.location.pathname.split('/').pop()

    const kwargs3 = {
      db: 'sales',
      docType: 'SALE',
      lookUpField: 'id',
      lookUpValue: parseInt(id),
      lookUpName: 'Número de Factura',
      modelName: 'Ventas',
      dispatchType: 'SET_SALE'
    }

    this.props.dispatch(setItem(kwargs3))
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.sale && !nextprops.movements.length) {
      const id = nextprops.sale._id

      const kwargs = {
        db: 'general',
        docType: 'CLIENT_MOVEMENT',
        lookUpField: 'sale_id',
        lookUpValue: id,
        lookUpName: 'Número de Factura',
        modelName: 'Movimientos',
        dispatchType: 'SET_SALE_MOVEMENTS'
      }

      this.props.dispatch(setItems(kwargs))
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
    const movements = this.props.movements
    console.log(movements)
    const sale = this.props.sale
    let debits = 0
    let credits = 0

    movements.forEach(movement => {
      if (movement.type == 'CREDIT') credits += movement.amount
      if (movement.type == 'DEBIT') debits += movement.amount
    })

    const rows = movements.length
      ? movements.map(movement => {
        return this.movementItem(movement)
      })
      : <tr>
        <td>NO HAY MOVIMIENTOS</td>
      </tr>

    return <div className='list-container'>

      <h1>Movimientos de factura # {sale.id}</h1>
      <div className='row movements'>
        <div className='col-xs-12 col-sm-8'>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>Movimiento #</th>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Monto</th>
                <th>Detalle</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
        <div className='totals-sidebar col-xs-12 col-sm-4'>
          <div className='col-xs-12'>
            <table className='table table-bordered'>
              <tbody>
                <tr>
                  <th>Céditos</th>
                  <td>₡ {credits.formatMoney(2, ',', '.')}</td>
                </tr>
                <tr>
                  <th>Débitos</th>
                  <td>₡ {debits.formatMoney(2, ',', '.')}</td>
                </tr>
                <tr>
                  <th>Saldo:</th>
                  <td>₡ {(credits - debits).formatMoney(2, ',', '.')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  }
}
