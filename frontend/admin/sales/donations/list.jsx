/*
 * Module dependencies
 */
import React from 'react'

import {connect} from 'react-redux'
import {fetchItems} from '../../utils/api'
import DataTable from '../../generalComponents/dataTable/dataTable.jsx'

@connect((store) => {
  return {donations: store.sales.donations}
})
export default class List extends React.Component {

  componentWillMount() {

    const kwargs = {
      db: 'sales',
      docType: 'DONATION',
      dispatchType: 'FETCH_DONATIONS_FULFILLED',
      dispatchErrorType: 'FETCH_DONATIONS_REJECTED'
    }

    this.props.dispatch(fetchItems(kwargs)) // fetch clients before mount, send dispatch to reducer.

  }

  render() {

    const headerOrder = [
      {
        field: 'id',
        text: 'Código',
        type: 'primary'
      }, {
        field: 'date',
        text: 'Fecha',
        type: 'date'
      }, {
        field: 'amount',
        text: 'Monto',
        type: 'price'
      }, {
        field: 'document',
        text: 'Documento',
        type: 'text'
      }
    ]

    return <div className='clients-list-container'>

      <h1>Donaciones:</h1>

      <DataTable headerOrder={headerOrder} model='donations' data={this.props.donations} addLink='/admin/donations/add' />

    </div>

  }

}
