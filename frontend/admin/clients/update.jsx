import React from 'react'

import Fields from './fields.jsx'
import {connect} from 'react-redux'
import {setNextPrevItem} from '../utils/api'
import {Link} from 'react-router-dom'
import ItemsBar from '../layout/itemsBar/itemsBar.jsx'
import {toggleItemsBar} from '../layout/itemsBar/actions'

@connect((store) => {
  return {
    client: store.clients.clientActive,
    nextClient: store.clients.nextClient,
    previousClient: store.clients.previousClient,
    clients: store.clients.clients
  }
})

export default class Update extends React.Component {

  componentDidMount() {
    this.props.dispatch({type: 'CLEAR_NEXT_PREV_CLIENT', payload: ''})
  }

  componentWillUpdate(nextProps) {

    const code = this.props.location.pathname.split('/').pop()

    if (nextProps.nextClient == 0 && nextProps.previousClient == 0 && nextProps.clients.length) {

      const kwargs = {
        items: [
          ...nextProps.clients
        ],
        codeField: 'code',
        code: code,
        dispatchType: 'SET_NEXT_PREV_CLIENT'
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
        <Link to={`/admin/clients/edit/${this.props.previousClient}`}>
          <span className={`previous fa fa-chevron-circle-left`} />
        </Link>
        <Link to={`/admin/clients/edit/${this.props.nextClient}`}>
          <span className='next fa fa-chevron-circle-right' />
        </Link>
        <span onClick={this.toggleBar.bind(this)} className='list fa fa-list' />
      </div>

      <Fields key={code} create={false} update location={this.props.location} />

      <ItemsBar items={this.props.clients} tittle='Lista de Clientes' codeField='code' descriptionField='name'
        descriptionField2='last_name' editPath='/admin/clients/edit/' />

    </div>

  }

}
