import React from 'react'

import Fields from './fields.jsx'
import {connect} from 'react-redux'
import {setNextPrevItem} from '../utils/api'
import {Link} from 'react-router-dom'
import ItemsBar from '../layout/itemsBar/itemsBar.jsx'
import {toggleItemsBar} from '../layout/itemsBar/actions'

@connect((store) => {
  return {
    user: store.users.userActive,
    nextUser: store.users.nextUser,
    previousUser: store.users.previousUser,
    users: store.users.users
  }
})

export default class Update extends React.Component {

  componentDidMount() {
    this.props.dispatch({type: 'CLEAR_NEXT_PREV_USER', payload: ''})
  }

  componentWillUpdate(nextProps) {

    const code = this.props.location.pathname.split('/').pop()

    if (nextProps.nextUser == 0 && nextProps.previousUser == 0 && nextProps.users.length) {

      const kwargs = {
        items: [
          ...nextProps.users
        ],
        codeField: 'username',
        code: code,
        dispatchType: 'SET_NEXT_PREV_USER'
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
        <h1>EDITAR USUARIO</h1>
        <Link to={`/admin/users/edit/${this.props.previousUser}`}>
          <span className={`previous fa fa-chevron-circle-left`} />
        </Link>
        <Link to={`/admin/users/edit/${this.props.nextUser}`}>
          <span className='next fa fa-chevron-circle-right' />
        </Link>
        <span onClick={this.toggleBar.bind(this)} className='list fa fa-list' />
      </div>

      <Fields key={code} create={false} update location={this.props.location} />

      <ItemsBar items={this.props.users} tittle='Lista de Usuarios' codeField='username' descriptionField='name'
        descriptionField2='last_name' editPath='/admin/users/edit/' />

    </div>

  }

}
