import React from 'react'

import Fields from './fields.jsx'
import ItemsBar from '../layout/itemsBar/itemsBar.jsx'
import {connect} from 'react-redux'
import {toggleItemsBar} from '../layout/itemsBar/actions'

@connect((store) => {
  return {
    clients: store.clients.clients
  }
})
export default class Update extends React.Component {

  toggleBar() {
    toggleItemsBar()
  }

  render() {
    return <div className='create row'>
      <div className='edit-header'>
        <h1>CREAR CLIENTE</h1>
        <span onClick={this.toggleBar.bind(this)} className='list fa fa-list' />
      </div>

      <Fields create update={false} location={this.props.location} />

      <ItemsBar items={this.props.clients} tittle='Lista de Clientes' codeField='code' descriptionField='name'
        descriptionField2='last_name' editPath='/admin/clients/edit/' />

    </div>
  }
}
