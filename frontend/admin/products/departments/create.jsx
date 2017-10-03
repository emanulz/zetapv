import React from 'react'

import Fields from './fields.jsx'
import {connect} from 'react-redux'
import ItemsBar from '../../layout/itemsBar/itemsBar.jsx'
import {toggleItemsBar} from '../../layout/itemsBar/actions'

@connect((store) => {
  return {
    departments: store.products.departments
  }
})
export default class Update extends React.Component {

  toggleBar() {
    toggleItemsBar()
  }

  render() {
    return <div className='create row'>
      <div className='edit-header'>
        <h1>CREAR DEPARTAMENTO</h1>
        <span onClick={this.toggleBar.bind(this)} className='list fa fa-list' />
      </div>

      <Fields create update={false} location={this.props.location} />

      <ItemsBar items={this.props.departments} tittle='Lista de Departamentos' codeField='code' descriptionField='name'
        editPath='/admin/products/departments/edit/' />

    </div>
  }
}
