/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {fetchItems, setItem, setItems, setItemsQuery} from '../../utils/api'
import {checkSalesDebt} from './actions'
import {Link} from 'react-router-dom'
const moment = require('moment')

@connect((store) => {
  return {
    movements: store.receivable.clientActiveMovements,
    client: store.clients.clientActive,
    sales: store.sales.sales,
    creditSales: store.receivable.clientActiveCreditSales,
    creditSalesD: store.receivable.clientActiveCreditSalesD
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
    if (nextprops.client.code && nextprops.sales.length && !nextprops.movements.length && !nextprops.creditSales.length) {
      const id = nextprops.client._id
      const code = nextprops.client.code

      const kwargs = {
        db: 'general',
        docType: 'CLIENT_MOVEMENT',
        lookUpField: 'clientId',
        lookUpValue: id,
        lookUpName: 'Código de cliente',
        modelName: 'Movimientos',
        dispatchType: 'SET_CLIENT_ACTIVE_MOVEMENTS'
      }

      this.props.dispatch(setItems(kwargs))

      const kwargs2 = {
        db: 'sales',
        query: {'docType': {$eq: 'SALE'}, 'client._id': {$eq: id}, 'pay.payMethod': {$eq: 'CREDIT'}},
        notFoundMsg: `No se encontraron facturas de crédito con el código de cliente: ${code}`,
        successDispatchType: 'SET_CLIENT_ACTIVE_CREDIT_SALES'
      }

      this.props.dispatch(setItemsQuery(kwargs2))

    }

    if (nextprops.creditSales.length != this.props.creditSales.length) {
      this.props.dispatch(checkSalesDebt(nextprops.creditSales, 'general'))
    }
  }

  statementItem(sale, client) {

    const movClass = sale.type == 'CREDIT' ? 'credit' : 'debit'
    const date = moment(sale.created).format('DD/MM/YYYY')
    const debt = sale.debt ? sale.debt : 0
    if (debt > 0) {
      return <tr className={`${movClass}`} key={sale._id}>
        <td>{sale.id}</td>
        <td>{date}</td>
        <td>₡ {sale.cart.cartTotal ? sale.cart.cartTotal.formatMoney(2, ',', '.') : 0}</td>
        <td>₡ {sale.debits ? sale.debits.formatMoney(2, ',', '.') : 0}</td>
        <td>₡ {sale.debt ? sale.debt.formatMoney(2, ',', '.') : 0}</td>
        <td><Link to={`/admin/receivable/statement/${client.code}/billmovements/${sale.id}`}>Ver</Link></td>
      </tr>
    }
  }

  // Render the product
  render() {

    const sales = this.props.creditSalesD
    sales.sort((a, b) => {
      return new Date(a.created) - new Date(b.created)
    })
    const client = this.props.client

    const rows = sales.length
      ? sales.map(sale => {
        return this.statementItem(sale, client)
      })
      : <tr>
        <td>NO HAY MOVIMIENTOS</td>
      </tr>

    return <div className='list-container'>

      <h1>Estado de Cuenta</h1>

      <div className='row movements'>

        <div className='totals-sidebar col-xs-12 col-sm-10'>
          <table className='table table-bordered'>
            <tbody>
              <tr>
                <th>Cliente</th>
                <td>{`${this.props.client.name} ${this.props.client.last_name} - ${this.props.client.code}`}</td>
              </tr>
              <tr>
                <th>Saldo Total:</th>
                <td>₡ 0</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='col-xs-12 col-sm-10'>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>Factura #</th>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Abonos</th>
                <th>Deuda</th>
                <th>Movimientos</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  }
}
