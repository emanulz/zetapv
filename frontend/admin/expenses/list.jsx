/*
 * Module dependencies
 */
import React from 'react'

import {connect} from 'react-redux'
import {fetchItems} from '../utils/api'
import DataTable from '../generalComponents/dataTable/dataTable.jsx'

@connect((store) => {
  return {expenses: store.expenses.expenses}
})
export default class List extends React.Component {

  componentWillMount() {

    const kwargs = {
      db: 'general',
      docType: 'EXPENSE',
      dispatchType: 'FETCH_EXPENSES_FULFILLED',
      dispatchErrorType: 'FETCH_EXPENSES_REJECTED'
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
        field: 'date',
        text: 'Fecha',
        type: 'date'
      }, {
        field: 'category',
        text: 'Categoría',
        type: 'foreing'
      }, {
        field: 'document',
        text: 'Documento'
      }, {
        field: 'amount',
        text: 'Monto',
        type: 'price'
      }
    ]

    return <div className='clients-list-container'>

      <h1>Gastos:</h1>

      <DataTable headerOrder={headerOrder} model='expenses' data={this.props.expenses} addLink='/admin/expenses/add' />

    </div>

  }

}
