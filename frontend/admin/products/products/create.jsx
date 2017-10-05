import React from 'react'

import Fields from './fields.jsx'
import {connect} from 'react-redux'
import ItemsBar from '../../layout/itemsBar/itemsBar.jsx'
import {toggleItemsBar} from '../../layout/itemsBar/actions'
import { getNextNumericCode } from '../../utils/api'

@connect((store) => {
  return {
    product: store.products.productActive,
    products: store.products.products,
    userProductConfig: store.config.userProducts
  }
})
export default class Update extends React.Component {

  toggleBar() {
    toggleItemsBar()
  }

  getNextNum() {
    const code = getNextNumericCode(this.props.products, 'code')
    const product = {
      ...this.props.product
    }

    product['code'] = code

    this.props.dispatch({type: 'SET_PRODUCT', payload: product})
  }

  render() {

    let nextNumField = <div />
    if (this.props.userProductConfig) {
      const renderNextNum = 'nextNumericAuto' in this.props.userProductConfig ? this.props.userProductConfig.nextNumericAuto : false

      if (renderNextNum) {
        nextNumField = <span title='Obtener el siguiente código' onClick={this.getNextNum.bind(this)}
          className='list fa fa-sort-numeric-desc'
        />
      }
    }

    return <div className='create row'>
      <div className='edit-header'>
        <h1>CREAR PRODUCTO</h1>
        <span title='Lista de Productos' onClick={this.toggleBar.bind(this)} className='list fa fa-list' />
        {nextNumField}
      </div>

      <Fields create update={false} location={this.props.location} />

      <ItemsBar items={this.props.products} tittle='Lista de Productos' codeField='code' descriptionField='description'
        editPath='/admin/products/edit/' />

    </div>
  }
}
