import React from 'react'

import Fields from './fields.jsx'
import {connect} from 'react-redux'
import {setNextPrevItem} from '../../utils/api'
import {Link} from 'react-router-dom'
import ItemsBar from '../../layout/itemsBar/itemsBar.jsx'
import {toggleItemsBar} from '../../layout/itemsBar/actions'

@connect((store) => {
  return {
    department: store.products.departmentActive,
    nextDepartment: store.products.nextDepartment,
    previousDepartment: store.products.previousDepartment,
    departments: store.products.departments
  }
})

export default class Update extends React.Component {

  componentDidMount() {
    this.props.dispatch({type: 'CLEAR_NEXT_PREV_DEPARTMENT', payload: ''})
  }

  componentWillUpdate(nextProps) {
    const code = this.props.location.pathname.split('/').pop()

    if (nextProps.nextDepartment == 0 && nextProps.previousDepartment == 0 && nextProps.departments.length) {
      const kwargs = {
        items: [
          ...nextProps.departments
        ],
        codeField: 'code',
        code: code,
        dispatchType: 'SET_NEXT_PREV_DEPARTMENT'
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
        <h1>EDITAR DEPARTAMENTO</h1>
        <Link to={`/admin/products/departments/edit/${this.props.previousDepartment}`}>
          <span className={`previous fa fa-chevron-circle-left`} />
        </Link>
        <Link to={`/admin/products/departments/edit/${this.props.nextDepartment}`}>
          <span className='next fa fa-chevron-circle-right' />
        </Link>
        <span onClick={this.toggleBar.bind(this)} className='list fa fa-list' />
      </div>

      <Fields key={code} create={false} update location={this.props.location} />

      <ItemsBar items={this.props.departments} tittle='Departamentos' codeField='code' descriptionField='name'
        editPath='/admin/products/departments/edit/' />

    </div>

  }

}
