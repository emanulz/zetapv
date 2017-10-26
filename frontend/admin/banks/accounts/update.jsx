import React from 'react'

import Fields from './fields.jsx'
import {connect} from 'react-redux'
import {setNextPrevItem} from '../../utils/api'
import {Link} from 'react-router-dom'
import ItemsBar from '../../layout/itemsBar/itemsBar.jsx'
import {toggleItemsBar} from '../../layout/itemsBar/actions'

@connect((store) => {
  return {
    account: store.banks.accountActive,
    nextAccount: store.banks.nextAccount,
    previousAccount: store.banks.previousAccount,
    accounts: store.banks.accounts
  }
})

export default class Update extends React.Component {

  componentDidMount() {
    this.props.dispatch({type: 'CLEAR_NEXT_PREV_BANK_ACCOUNT', payload: ''})
  }

  componentWillUpdate(nextProps) {

    const code = this.props.location.pathname.split('/').pop()

    if (nextProps.nextAccount == 0 && nextProps.previousAccount == 0 && nextProps.accounts.length) {

      const kwargs = {
        items: [
          ...nextProps.accounts
        ],
        codeField: 'code',
        code: code,
        dispatchType: 'SET_NEXT_PREV_BANK_ACCOUNT'
      }

      this.props.dispatch(setNextPrevItem(kwargs))

    }
  }
  toggleBar() {
    toggleItemsBar()
  }

  render() {

    const code = this.props.location.pathname.split('/').pop()

    return <div className='create row'>

      <div className='edit-header'>
        <h1>EDITAR CLIENTE</h1>
        <Link to={`/admin/banks/accounts/edit/${this.props.previousAccount}`}>
          <span className={`previous fa fa-chevron-circle-left`} />
        </Link>
        <Link to={`/admin/banks/accounts/edit/${this.props.nextAccount}`}>
          <span className='next fa fa-chevron-circle-right' />
        </Link>
        <span onClick={this.toggleBar.bind(this)} className='list fa fa-list' />
      </div>

      <Fields key={code} create={false} update location={this.props.location} />

      <ItemsBar items={this.props.accounts} tittle='Lista de Cuentas' codeField='code' descriptionField='name'
        editPath='/admin/banks/accounts/edit/' />

    </div>

  }

}
