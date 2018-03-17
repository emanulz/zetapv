/*
 * Module dependencies
 */
import React from 'react'

import {connect} from 'react-redux'
import {fetchItems} from '../../utils/api'
import DataTable from '../../generalComponents/dataTable/dataTable.jsx'

@connect((store) => {
  return {presales: store.sales.presales}
})
export default class List extends React.Component {

  componentWillMount() {

    this.props.dispatch({type: 'CLEAR_PRESALE', payload: ''})

    const kwargs = {
      db: 'sales',
      docType: 'PRESALE',
      dispatchType: 'FETCH_PRESALES_FULFILLED',
      dispatchErrorType: 'FETCH_PRESALES_REJECTED'
    }

    this.props.dispatch(fetchItems(kwargs)) // fetch clients before mount, send dispatch to reducer.

  }

  render() {

    const headerOrder = [
      {
        field: 'id',
        text: '# Preventa',
        baseLink: '/sales/presale',
        type: 'link'
      }, {
        field: 'created',
        text: 'Fecha',
        type: 'date'
      }, {
        field: 'client.name',
        field2: 'client.last_name',
        text: 'Nombre Cliente',
        type: 'composed'
      }, {
        field: 'cart.cartTotal',
        text: 'Monto',
        type: 'price'
      }
    ]

    return <div className='clients-list-container'>

      <h1>Pre-Ventas:</h1>

      <DataTable headerOrder={headerOrder} model='presales' data={this.props.presales} addLink='/sales/presale' />

    </div>

  }

}
