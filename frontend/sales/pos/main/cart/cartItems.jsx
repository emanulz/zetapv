/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {updateTotals, removeFromCart} from './actions'
import {updateItemDiscount, updateItemLote, updateQty, addSubOne, updateQtyCode} from '../product/actions'
import alertify from 'alertifyjs'
const Mousetrap = require('mousetrap')

@connect((store) => {
  return {inCart: store.cart.cartItems,
    client: store.clients.clientSelected,
    globalDiscount: store.cart.globalDiscount,
    disabled: store.sales.completed,
    cartItemActive: store.cart.cartItemActive,
    defaultConfig: store.config.defaultSales,
    userConfig: store.config.userSales}
})
export default class CartItems extends React.Component {

  // On component update (The cart has been modified) calls the update totals method in actions file.
  componentDidUpdate(prevProps) {

    this.props.dispatch(updateTotals(this.props.inCart))

  }

  // componentDidUpdate(nextProps) {
  //   if (this.props.cartItemActive != nextProps.cartItemActive) {
  //     console.log(document.getElementById(`qty${nextProps.cartItemActive}`))
  //   }
  // }

  componentWillMount() {

    const _this = this
    Mousetrap.bind('mod+plus', function(e) {

      if (e.preventDefault) {
        e.preventDefault()
      } else {
      // internet explorer
        e.returnValue = false
      }

      _this.props.dispatch(addSubOne(_this.props.cartItemActive, true, _this.props.inCart, _this.props.globalDiscount,
        _this.props.client))
    })

    Mousetrap.bind('mod+f', function(e) {

      if (e.preventDefault) {
        e.preventDefault()
      } else {
      // internet explorer
        e.returnValue = false
      }

      document.getElementById(`qty${_this.props.cartItemActive}`).focus()
    })

    Mousetrap.bind('mod+-', function(e) {
      if (e.preventDefault) {
        e.preventDefault()
      } else {
      // internet explorer
        e.returnValue = false
      }
      _this.props.dispatch(addSubOne(_this.props.cartItemActive, false, _this.props.inCart, _this.props.globalDiscount,
        _this.props.client))
    })

    Mousetrap.bind('mod+*', function(e) {

      if (e.preventDefault) {
        e.preventDefault()
      } else {
      // internet explorer
        e.returnValue = false
      }

      const __this = _this
      alertify.prompt(`Nueva cantidad para el producto seleccionado`, 'Ingrese la nueva cantidad para el producto seleccionado', ''
        , function(evt, value) {
          __this.props.dispatch(updateQtyCode(__this.props.cartItemActive, value, __this.props.inCart,
            __this.props.globalDiscount, __this.props.client))
        }
        , function() {})
        .set('labels', {ok: 'Ok', cancel: 'Cancelar'})
    })
  }

  discountInputKeyPress(code, ev) {

    if (ev.key == 'Enter') {
      ev.preventDefault()
      const discount = (ev.target.value)
        ? ev.target.value
        : 0
      this.props.dispatch(updateItemDiscount(this.props.inCart, code, discount, this.props.globalDiscount,
        this.props.client))

    }

  }

  discountInputOnBlur(code, ev) {

    const discount = (ev.target.value)
      ? ev.target.value
      : 0
    this.props.dispatch(updateItemDiscount(this.props.inCart, code, discount, this.props.globalDiscount,
      this.props.client))

  }

  qtyInputChange(code, ev) {

    const qty = parseFloat((ev.target.value))
      ? ev.target.value
      : 0
    this.props.dispatch(updateQty(code, qty, this.props.inCart, this.props.globalDiscount, this.props.client))

  }

  qtyInputKeyPress(ev) {
    ev.preventDefault()
    console.log('called')
    if (ev.key == 'Enter') {
      console.log('Presssss', ev.key)
      document.getElementById('productCodeInputField').focus()
    }
  }

  loteInputKeyPress(code, ev) {

    if (ev.key == 'Enter') {
      ev.preventDefault()
      const lote = (ev.target.value)
        ? ev.target.value
        : 0
      this.props.dispatch(updateItemLote(this.props.inCart, code, lote))

    }

  }

  loteInputOnBlur(code, ev) {

    const lote = (ev.target.value)
      ? ev.target.value
      : 0
    this.props.dispatch(updateItemLote(this.props.inCart, code, lote))

  }

  setCartItemActive(code, ev) {

    this.props.dispatch({type: 'SET_PRODUCT_ACTIVE_IN_CART', payload: code})

  }

  removeItem(code, ev) {

    this.props.dispatch(removeFromCart(this.props.inCart, code))

  }

  fieldFocus(ev) {
    ev.target.select()
  }

  // Render the items in cart using table rows

  render() {

    const cartItems = this.props.inCart

    const items2 = cartItems.map((item, index) => {

      const activeClass = (item.product.code == this.props.cartItemActive || item.product.barcode == this.props.cartItemActive)
        ? 'cart-activeRow cart-body-item'
        : 'cart-body-item'

      const removeIconClass = this.props.disabled ? 'removeItemIcon disabled' : 'removeItemIcon'

      const taxes1 = (item.product.useTaxes)
        ? item.product.taxes
        : 0

      const qtyField = <input
        id={`qty${item.product.code}`}
        disabled={this.props.disabled}
        onChange={this.qtyInputChange.bind(this, item.uuid)}
        onFocus={this.fieldFocus.bind(this)}
        onKeyUp={this.qtyInputKeyPress.bind(this)}
        type='number'
        className='form-control'
        value={item.qty}
      />

      const discountField = this.props.client.saleLoaded
        ? <input
          disabled={this.props.disabled}
          onKeyPress={this.discountInputKeyPress.bind(this, item.uuid)}
          onBlur={this.discountInputOnBlur.bind(this, item.uuid)}
          onFocus={this.fieldFocus.bind(this)}
          type='number' className='form-control'
          defaultValue={parseFloat(item.discount)}
        />
        : <input
          disabled={this.props.disabled}
          onKeyPress={this.discountInputKeyPress.bind(this, item.uuid)}
          onBlur={this.discountInputOnBlur.bind(this, item.uuid)}
          onFocus={this.fieldFocus.bind(this)}
          type='number' className='form-control'
        />

      return <div className={activeClass}
        key={item.uuid}
        onClick={this.setCartItemActive.bind(this, item.product.code)}>

        <div className='cart-body-item-code'>
          <h5>Código</h5>
          {item.product.code}
        </div>
        <div className='cart-body-item-description'>
          <h5>Desc</h5>
          {item.product.description}
        </div>
        <div className='cart-body-item-qty'>
          <h5>Cantidad</h5>
          {qtyField}
        </div>
        <div className='cart-body-item-unitPrice'>
          <h5>P Unit</h5>
          ₡ {parseFloat(item.priceToUse).formatMoney(2, ',', '.')}
        </div>
        <div className='cart-body-item-discount'>
          <h5>Desc</h5>
          {discountField}
        </div>
        <div className='cart-body-item-iva'>
          <h5>IVA</h5>
          {taxes1}
        </div>
        <div className='cart-body-item-total'>
          <h5>Total</h5>
            ₡ {item.totalWithIv.formatMoney(2, ',', '.')}
        </div>

        <span className={removeIconClass}>
          <i onClick={this.removeItem.bind(this, item.uuid)} className='fa fa-times-circle' />
        </span>

      </div>
    })

    // return <tbody className='table-body'>
    //   {items}
    // </tbody>

    return <div className='cart-body'>
      {items2}
    </div>

  }

}
