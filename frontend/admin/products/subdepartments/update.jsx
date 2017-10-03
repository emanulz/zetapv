import React from 'react'

import Fields from './fields.jsx'
import {connect} from 'react-redux'
import {setNextPrevItem} from '../../utils/api'
import {Link} from 'react-router-dom'
import ItemsBar from '../../layout/itemsBar/itemsBar.jsx'
import {toggleItemsBar} from '../../layout/itemsBar/actions'

@connect((store) => {
  return {
    subdepartment: store.products.subdepartmentActive,
    nextSubdepartment: store.products.nextSubdepartment,
    previousSubdepartment: store.products.previousSubdepartment,
    subdepartments: store.products.subdepartments
  }
})
export default class Update extends React.Component {

  componentDidMount() {
    this.props.dispatch({type: 'CLEAR_NEXT_PREV_SUBDEPARTMENT', payload: ''})
  }

  componentWillUpdate(nextProps) {
    const code = this.props.location.pathname.split('/').pop()

    if (nextProps.nextSubdepartment == 0 && nextProps.previousSubdepartment == 0 && nextProps.subdepartments.length) {
      const kwargs = {
        items: [
          ...nextProps.subdepartments
        ],
        codeField: 'code',
        code: code,
        dispatchType: 'SET_NEXT_PREV_SUBDEPARTMENT'
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
        <h1>EDITAR SUB-DEPARTAMENTO</h1>
        <Link to={`/admin/products/subdepartments/edit/${this.props.previousSubdepartment}`}>
          <span className={`previous fa fa-chevron-circle-left`} />
        </Link>
        <Link to={`/admin/products/subdepartments/edit/${this.props.nextSubdepartment}`}>
          <span className='next fa fa-chevron-circle-right' />
        </Link>
        <span onClick={this.toggleBar.bind(this)} className='list fa fa-list' />
      </div>

      <Fields key={code} create={false} update location={this.props.location} />

      <ItemsBar items={this.props.subdepartments} tittle='Sub-Departamentos' codeField='code' descriptionField='name'
        editPath='/admin/products/subdepartments/edit/' />

    </div>

  }

}
