import React from 'react'

import Fields from './fields.jsx'
import ItemsBar from '../../layout/itemsBar/itemsBar.jsx'
import {connect} from 'react-redux'
import {toggleItemsBar} from '../../layout/itemsBar/actions'

@connect((store) => {
  return {
    accounts: store.banks.accounts
  }
})
export default class Update extends React.Component {

  toggleBar() {
    toggleItemsBar()
  }

  render() {
    return <div className='create row'>
      <div className='edit-header'>
        <h1>CREAR CUENTA</h1>
        <span onClick={this.toggleBar.bind(this)} className='list fa fa-list' />
      </div>

      <Fields create update={false} location={this.props.location} />

      <ItemsBar items={this.props.accounts} tittle='Lista de Cuentas' codeField='code' descriptionField='name'
        editPath='/admin/banks/accounts/edit/' />

    </div>
  }
}
