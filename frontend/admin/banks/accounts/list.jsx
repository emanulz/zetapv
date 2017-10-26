/*
 * Module dependencies
 */
import React from 'react'

import {connect} from 'react-redux'
import {fetchItems} from '../../utils/api'
import DataTable from '../../generalComponents/dataTable/dataTable.jsx'

@connect((store) => {
  return {accounts: store.banks.accounts}
})
export default class List extends React.Component {

  componentWillMount() {

    const kwargs = {
      db: 'general',
      docType: 'BANK_ACCOUNT',
      dispatchType: 'FETCH_BANK_ACCOUNTS_FULFILLED',
      dispatchErrorType: 'FETCH_BANK_ACCOUNTS_REJECTED'
    }

    this.props.dispatch(fetchItems(kwargs)) // fetch accounts before mount, send dispatch to reducer.

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
        field: 'bank',
        text: 'Banco'
      }, {
        field: 'number',
        text: 'Número'
      }
    ]

    return <div className='clients-list-container'>

      <h1>Cuentas bancarias:</h1>

      <DataTable
        headerOrder={headerOrder}
        model='banks/accounts' data={this.props.accounts}
        addLink='/admin/banks/accounts/add'
      />

    </div>

  }

}
