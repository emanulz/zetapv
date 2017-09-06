import React from 'react'
import {connect} from 'react-redux'
import Select2 from 'react-select2-wrapper'
import {fetchItems, setItemsQuery} from '../../utils/api'
import {checkSalesDebt} from '../statement/actions'
import alertify from 'alertifyjs'

const moment = require('moment')

@connect((store) => {
  return {
    movement: store.receivable.clientmovementActive,
    clients: store.clients.clients,
    clientId: store.receivable.paymentClientSelected,
    creditSales: store.receivable.clientActiveCreditSales,
    creditSalesD: store.receivable.clientActiveCreditSalesD
  }
})
export default class Update extends React.Component {

  componentWillMount() {
    const kwargs = {
      db: 'general',
      docType: 'CLIENT_MOVEMENT',
      dispatchType: 'FETCH_CLIENT_MOVEMENTS_FULFILLED',
      dispatchErrorType: 'FETCH_CLIENT_MOVEMENTS_REJECTED'
    }
    this.props.dispatch(fetchItems(kwargs)) // fetch client movements before mount, send dispatch to reducer.

    const kwargs2 = {
      db: 'general',
      docType: 'CLIENT',
      dispatchType: 'FETCH_CLIENTS_FULFILLED',
      dispatchErrorType: 'FETCH_CLIENTS_REJECTED'
    }
    this.props.dispatch(fetchItems(kwargs2)) // fetch clients before mount, send dispatch to reducer.
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.creditSales.length != this.props.creditSales.length) {
      this.props.dispatch(checkSalesDebt(nextprops.creditSales, 'general'))
    }
  }

  selectClient(event) {

    const target = event.target
    const value = target.value

    this.props.dispatch({type: 'SET_PAYMENT_CLIENT_SELECTED', payload: value})
  }

  onConsultBtn() {
    const clientId = this.props.clientId
    if (clientId) {

      this.props.dispatch({type: 'CLEAR_CLIENT_ACTIVE_CREDIT_SALES', payload: ''})

      const kwargs2 = {
        db: 'sales',
        query: {'docType': {$eq: 'SALE'}, 'client._id': {$eq: clientId}, 'pay.payMethod': {$eq: 'CREDIT'}},
        notFoundMsg: `No se encontraron facturas de crédito con el código del cliente`,
        successDispatchType: 'SET_CLIENT_ACTIVE_CREDIT_SALES'
      }

      this.props.dispatch(setItemsQuery(kwargs2))
    } else {
      alertify.alert('Error', 'Debe Seleccionar un cliente primero')
    }
  }

  paymentTableItem(sale) {

    const movClass = sale.type == 'CREDIT' ? 'credit' : 'debit'
    const date = moment(sale.created).format('DD/MM/YYYY')
    const debt = sale.debt ? sale.debt : 0
    if (debt > 0) {
      return <tr className={`${movClass}`} key={sale._id}>
        <td>{sale.id}</td>
        <td>{date}</td>
        <td>₡ {sale.cart.cartTotal ? sale.cart.cartTotal.formatMoney(2, ',', '.') : 0}</td>
        <td>₡ {sale.debt ? sale.debt.formatMoney(2, ',', '.') : 0}</td>
        <td>
          <input
            type='checkbox'
          />
        </td>
        <td>
          <input
            type='checkbox'
          />
        </td>
        <td>
          <input
            type='number'
          />
        </td>
      </tr>
    }
  }

  render() {

    // ********************************************************************
    // CLIENTS FOR SELECT
    // ********************************************************************
    const clients = this.props.clients

    const productsWithCredit = clients.length
      ? clients.filter(product => product.has_credit)
      : []

    const clientsSelect = productsWithCredit.map(client => {
      return {text: `${client.code} - ${client.name} ${client.last_name}`, id: client._id}
    })

    const sales = this.props.creditSalesD
    sales.sort((a, b) => {
      return new Date(a.created) - new Date(b.created)
    })

    const rows = sales.length
      ? sales.map(sale => {
        return this.paymentTableItem(sale)
      })
      : <tr>
        <td>-</td>
      </tr>

    return <div className='create'>
      <h1>Registrar pago a Facturas:</h1>

      <div className='row'>

        <div className='col-xs-12'>
          <div className='form-group row create-input-block'>

            <div className='col-xs-12 col-sm-4 paymentBlock'>
              <Select2
                name='clientId'
                data={clientsSelect}
                className='form-control'
                onSelect={this.selectClient.bind(this)}
                value={this.props.clientId}
                options={{
                  placeholder: 'Elija un cliente...'
                }}
              />
            </div>
            <div className='col-xs-12 col-sm-4 col-sm-offset-1 paymentBlock'>
              <button className='form-control btn btn-primary' onClick={this.onConsultBtn.bind(this)}>
                Consultar
              </button>
            </div>

            <div className='col-xs-12 col-sm-4 paymentBlock'>
              <table className='table table-bordered'>
                <tbody>
                  <tr>
                    <th>Saldo Anterior</th>
                    <td>₡ 0</td>
                  </tr>
                  <tr>
                    <th>Abono:</th>
                    <td>₡ 0</td>
                  </tr>
                  <tr>
                    <th>Saldo:</th>
                    <td>₡ 0</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className='col-xs-12 col-sm-4 col-sm-offset-1 paymentBlock'>
              <button className='form-control btn-success'>
                Registrar
              </button>
            </div>

          </div>
        </div>

        <div className='col-xs-12 tableBlock'>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>Fact #</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Deuda</th>
                <th>Completa</th>
                <th>Otro</th>
                <th>Monto</th>
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
