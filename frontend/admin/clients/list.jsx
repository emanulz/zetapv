/*
 * Module dependencies
 */
import React from 'react'

import {connect} from 'react-redux'
import {fetchItems} from '../utils/api'
import DataTable from '../generalComponents/dataTable/dataTable.jsx'

@connect((store) => {
  return {clients: store.clients.clients}
})
export default class List extends React.Component {

  componentWillMount() {

    const kwargs = {
      db: 'general',
      docType: 'CLIENT',
      dispatchType: 'FETCH_CLIENTS_FULFILLED',
      dispatchErrorType: 'FETCH_CLIENTS_REJECTED'
    }

    this.props.dispatch(fetchItems(kwargs)) // fetch clients before mount, send dispatch to reducer.

  }

  render() {

    const headerOrder = [
      {
        field: 'code',
        text: 'Código',
        type: 'primary'
      }, {
        field: 'name',
        text: 'Nombre'
      }, {
        field: 'last_name',
        text: 'Apellido'
      }, {
        field: 'id',
        text: 'Identificación'
      }, {
        field: 'has_credit',
        text: 'Tiene Crédito',
        type: 'bool'
      }, {
        field: 'credit_limit',
        text: 'Límite de crédito',
        type: 'price'
      }, {
        field: 'credit_days',
        text: 'Días de crédito'
      }
    ]

    return <div className='clients-list-container'>

      <h1>Clientes:</h1>

      <DataTable headerOrder={headerOrder} model='clients' data={this.props.clients} addLink='/admin/clients/add' />

    </div>

  }

}
