/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {productSelected, searchProduct} from './actions'

@connect((store) => {
  return {products: store.products.products, itemsInCart: store.cart.cartItems, inputVal: store.products.inputVal, globalDiscount: store.cart.globalDiscount}
})
export default class Product extends React.Component {

  componentDidMount() {
    this.codeInput.focus()
  }

  componentDidUpdate() {
    this.codeInput.focus()
  }

  searchProductClick() {

    this.props.dispatch(searchProduct())

  }

  inputKeyPress(ev) {
    // if Key pressed id Enter
    if (ev.key == 'Enter') {

      const code = ev.target.value.split('*')[0] // Split val [0] is code [1] is qty
      let qty = ev.target.value.split('*')[1]
      qty = (isNaN(qty))
        ? 1
        : parseFloat(qty) // if no qty sets to 1

      this.props.dispatch(productSelected(code, qty, this.props.products, this.props.itemsInCart, this.props.globalDiscount))
    } else {
      this.props.dispatch({type: 'SET_PRODUCT_FIELD_VALUE', payload: ev.target.value})
    }

  }

  // Render the product
  render() {

    return <div className='product'>
      <div className='product-title'>
        <span>
          <b>Producto:</b>
        </span>
      </div>
      <div className='product-inputs'>
        <div className='product-inputs-code'>
          <i className='fa fa-barcode' />
          <input onKeyDown={this.inputKeyPress.bind(this)} value={this.props.inputVal} onChange={this.inputKeyPress.bind(this)} ref={(input) => {
            this.codeInput = input
          }} type='text' placeholder='Ingrese el Código del Producto' className='product-inputs-code-input mousetrap form-control input-lg' />

        </div>
        <button onClick={this.searchProductClick.bind(this)} style={{
          'height': '48px',
          'width': '48px'
        }} className='product-inputs-search'>
          <span>
            <i style={{
              'paddingBottom': '8px'
            }} className='fa fa-search' />
          </span>
        </button>

      </div>

    </div>

  }

}
