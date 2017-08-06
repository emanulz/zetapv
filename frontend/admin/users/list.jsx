/*
 * Module dependencies
 */
import React from 'react'

import {connect} from 'react-redux'
import {fetchItems} from '../utils/api'
import DataTable from '../generalComponents/dataTable/dataTable.jsx'

@connect((store) => {
  return {users: store.users.users}
})
export default class List extends React.Component {

  componentWillMount() {

    const kwargs = {
      db: 'users',
      docType: 'USER',
      dispatchType: 'FETCH_USERS_FULFILLED',
      dispatchErrorType: 'FETCH_USERS_REJECTED'
    }

    this.props.dispatch(fetchItems(kwargs)) // fetch clients before mount, send dispatch to reducer.

  }

  render() {

    const headerOrder = [
      {
        field: 'username',
        text: 'Usuario',
        type: 'primary'
      }, {
        field: 'name',
        text: 'Nombre',
        type: 'text'
      }, {
        field: 'last_name',
        text: 'Apellido',
        type: 'text'
      }, {
        field: 'id',
        text: 'Identificación',
        type: 'text'
      }, {
        field: 'is_admin',
        text: 'Es Administrador',
        type: 'bool'
      }
    ]

    return <div className='clients-list-container'>

      <h1>Usuarios:</h1>

      <DataTable headerOrder={headerOrder} model='users' data={this.props.users} addLink='/admin/users/add' />

    </div>

  }

}
