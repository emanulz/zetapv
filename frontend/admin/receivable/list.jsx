/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {fetchItems} from '../utils/api'
import {getClientDebt} from '../utils/receivable'

// components
import DataTable from '../generalComponents/dataTable/dataTable.jsx'

@connect((store) => {
  return {
    movements: store.receivable.clientmovements,
    clients: store.clients.clients
  }
})
export default class MovementsList extends React.Component {

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

  // Render the product
  render() {
    const movements = this.props.movements
    const clients = this.props.clients

    const data = clients.length && movements.length
      ? clients.map(client => {
        if (client.has_credit) {
          client.debt = getClientDebt(client._id, movements)
        } else {
          client.debt = '-'
        }
        return client
      })
      : []

    const dataFiltered = data.filter(el => el.has_credit)

    const headerOrder = [
      {
        field: 'code',
        text: 'Código',
        type: 'text'
      }, {
        field: 'name',
        text: 'Nombre',
        type: 'text'
      }, {
        field: 'last_name',
        text: 'Apellido',
        type: 'text'
      },
      {
        field: 'has_credit',
        text: 'Tiene Crédito',
        type: 'bool'
      },
      {
        field: 'debt',
        text: 'Saldo',
        type: 'text'
      }
    ]

    return <div className='list-container'>

      <h1>Saldos:</h1>

      <DataTable headerOrder={headerOrder} model='receivable/movements' data={dataFiltered} addLink='/admin/receivable/movements/add' />

    </div>
  }
}
