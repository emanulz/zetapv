import React from 'react'

import Fields from './fields.jsx'
import {connect} from 'react-redux'
import {setNextPrevItem} from '../../utils/api'
import {Link} from 'react-router-dom'
import ItemsBar from '../../layout/itemsBar/itemsBar.jsx'
import {toggleItemsBar} from '../../layout/itemsBar/actions'

@connect((store) => {
  return {
    warehouse: store.inventories.warehouseActive,
    nextWarehouse: store.inventories.nextWarehouse,
    previousWarehouse: store.inventories.previousWarehouse,
    warehouses: store.inventories.warehouses
  }
})

export default class Update extends React.Component {

  componentDidMount() {
    this.props.dispatch({type: 'CLEAR_NEXT_PREV_WAREHOUSE', payload: ''})
  }

  componentWillUpdate(nextProps) {

    const code = this.props.location.pathname.split('/').pop()

    if (nextProps.nextWarehouse == 0 && nextProps.previousWarehouse == 0 && nextProps.warehouses.length) {

      const kwargs = {
        items: [
          ...nextProps.warehouses
        ],
        codeField: 'code',
        code: code,
        dispatchType: 'SET_NEXT_PREV_WAREHOUSE'
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
        <Link to={`/admin/inventories/warehouses/edit/${this.props.previousWarehouse}`}>
          <span className={`previous fa fa-chevron-circle-left`} />
        </Link>
        <Link to={`/admin/inventories/warehouses/edit/${this.props.nextWarehouse}`}>
          <span className='next fa fa-chevron-circle-right' />
        </Link>
        <span onClick={this.toggleBar.bind(this)} className='list fa fa-list' />
      </div>

      <Fields key={code} create={false} update location={this.props.location} />

      <ItemsBar items={this.props.warehouses} tittle='Lista de Bodegas' codeField='code' descriptionField='name'
        editPath='/admin/inventories/warehouses/edit/' />

    </div>

  }

}
