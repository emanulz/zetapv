/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {fetchItems} from '../../utils/api'

// components
import DataTable from '../../generalComponents/dataTable/dataTable.jsx'

@connect((store) => {
  return {
    movements: store.receivable.clientmovements
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
    this.props.dispatch(fetchItems(kwargs)) // fetch products before mount, send dispatch to reducer.
  }

  // Render the product
  render() {
    const headerOrder = [
      {
        field: 'document',
        text: 'Documento',
        type: 'primary'
      }, {
        field: 'clientId',
        text: 'Cliente',
        type: 'text'
      },
      {
        field: 'date',
        text: 'Fecha',
        type: 'date'
      },
      {
        field: 'type',
        text: 'Tipo',
        type: 'text'
      },
      {
        field: 'saleId',
        text: 'Venta',
        type: 'text'
      },
      {
        field: 'amount',
        text: 'Monto',
        type: 'text'
      }
    ]

    return <div className='list-container'>

      <h1>Movimientos:</h1>

      <DataTable headerOrder={headerOrder} model='receivable/movements' data={this.props.movements} addLink='/admin/receivable/movements/add' />

    </div>
  }
}
