import React from 'react'

import Fields from './fields.jsx'
import {connect} from 'react-redux'
import {setNextPrevItem} from '../../utils/api'
import {Link} from 'react-router-dom'
import ItemsBar from '../../layout/itemsBar/itemsBar.jsx'
import {toggleItemsBar} from '../../layout/itemsBar/actions'

@connect((store) => {
  return {
    product: store.products.productActive,
    nextProduct: store.products.nextProduct,
    previousProduct: store.products.previousProduct,
    products: store.products.products
  }
})
export default class Update extends React.Component {

  componentDidMount() {
    this.props.dispatch({type: 'CLEAR_NEXT_PREV_PRODUCT', payload: ''})
  }

  componentWillUpdate(nextProps) {
    const code = this.props.location.pathname.split('/').pop()

    if (nextProps.nextProduct == 0 && nextProps.previousProduct == 0 && nextProps.products.length) {
      console.log(nextProps.products)
      const kwargs = {
        items: [
          ...nextProps.products
        ],
        codeField: 'code',
        code: code,
        dispatchType: 'SET_NEXT_PREV_PRODUCT'
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
        <h1>EDITAR PRODUCTO</h1>
        <Link to={`/admin/products/edit/${this.props.previousProduct}`}>
          <span className={`previous fa fa-chevron-circle-left`} />
        </Link>
        <Link to={`/admin/products/edit/${this.props.nextProduct}`}>
          <span className='next fa fa-chevron-circle-right' />
        </Link>
        <span onClick={this.toggleBar.bind(this)} className='list fa fa-list' />
      </div>

      <Fields key={code} create={false} update location={this.props.location} />

      <ItemsBar items={this.props.products} tittle='Productos' codeField='code' descriptionField='description'
        editPath='/admin/products/edit/' />

    </div>

  }

}
