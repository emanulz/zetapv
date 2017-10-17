/*
 * Module dependencies
 */
import React from 'react'

import {connect} from 'react-redux'
import {fetchItems} from '../../utils/api'
import DataTable from '../../generalComponents/dataTable/dataTable.jsx'

@connect((store) => {
  return {warehouses: store.inventories.warehouses}
})
export default class List extends React.Component {

  componentWillMount() {

    const kwargs = {
      db: 'general',
      docType: 'WAREHOUSE',
      dispatchType: 'FETCH_WAREHOUSES_FULFILLED',
      dispatchErrorType: 'FETCH_WAREHOUSES_REJECTED'
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
        field: 'location',
        text: 'Ubicación'
      }
    ]

    return <div className='warehouses-list-container'>

      <h1>Bodegas:</h1>

      <DataTable headerOrder={headerOrder} model='inventories/warehouses' data={this.props.warehouses} addLink='/admin/inventories/warehouses/add' />

    </div>

  }

}
