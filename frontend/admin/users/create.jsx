import React from 'react'

import Fields from './fields.jsx'
import ItemsBar from '../layout/itemsBar/itemsBar.jsx'
import {connect} from 'react-redux'
import {toggleItemsBar} from '../layout/itemsBar/actions'

@connect((store) => {
  return {
    users: store.users.users
  }
})
export default class Update extends React.Component {

  toggleBar() {
    toggleItemsBar()
  }

  render() {
    return <div className='create row'>
      <div className='edit-header'>
        <h1>CREAR USUARIO</h1>
        <span onClick={this.toggleBar.bind(this)} className='list fa fa-list' />
      </div>

      <Fields create update={false} location={this.props.location} />

      <ItemsBar items={this.props.users} tittle='Lista de Usuarios' codeField='username' descriptionField='name'
        descriptionField2='last_name' editPath='/admin/users/edit/' />

    </div>
  }
}
