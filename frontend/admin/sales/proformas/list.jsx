/*
 * Module dependencies
 */
import React from 'react'

import {connect} from 'react-redux'
import {fetchItems} from '../../utils/api'
import DataTable from '../../generalComponents/dataTable/dataTable.jsx'

@connect((store) => {
  return {proformas: store.sales.proformas}
})
export default class List extends React.Component {

  componentWillMount() {

    this.props.dispatch({type: 'CLEAR_PROFORMA', payload: ''})

    const kwargs = {
      db: 'sales',
      docType: 'PROFORMA',
      dispatchType: 'FETCH_PROFORMAS_FULFILLED',
      dispatchErrorType: 'FETCH_PROFORMAS_REJECTED'
    }

    this.props.dispatch(fetchItems(kwargs)) // fetch clients before mount, send dispatch to reducer.

  }

  render() {

    const headerOrder = [
      {
        field: 'id',
        text: '# Proforma',
        baseLink: '/sales/proformas',
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

      <h1>Proformas:</h1>

      <DataTable headerOrder={headerOrder} model='proformas' data={this.props.proformas} addLink='/sales/proformas' />

    </div>

  }

}
