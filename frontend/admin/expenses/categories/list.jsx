/*
 * Module dependencies
 */
import React from 'react'

import {connect} from 'react-redux'
import {fetchItems} from '../../utils/api'
import DataTable from '../../generalComponents/dataTable/dataTable.jsx'

@connect((store) => {
  return {expenseCategories: store.expenses.expenseCategories}
})
export default class List extends React.Component {

  componentWillMount() {

    const kwargs = {
      db: 'general',
      docType: 'EXPENSE_CATEGORY',
      dispatchType: 'FETCH_EXPENSE_CATEGORIES_FULFILLED',
      dispatchErrorType: 'FETCH_EXPENSE_CATEGORIES_REJECTED'
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
        field: 'type',
        text: 'Tipo'
      }, {
        field: 'name',
        text: 'Nombre'
      }, {
        field: 'supplier',
        text: 'Proveedor'
      }
    ]

    return <div className='clients-list-container'>

      <h1>Categorías de Gastos:</h1>

      <DataTable headerOrder={headerOrder} model='expenses/categories' data={this.props.expenseCategories}
        addLink='/admin/expenses/categories/add' />

    </div>

  }

}
