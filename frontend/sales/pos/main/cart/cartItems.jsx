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
  componentDidUpdate() {
    this.props.dispatch(updateTotals(this.props.inCart))

  }

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
      alertify.prompt(`Nueva cantidad para el producto ${__this.props.cartItemActive}`, 'Ingrese la nueva cantidad para el producto seleccionado', ''
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

    console.log(code)

    const qty = parseFloat((ev.target.value))
      ? ev.target.value
      : 0
    this.props.dispatch(updateQty(code, qty, this.props.inCart, this.props.globalDiscount, this.props.client))

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

    const items = cartItems.map((item, index) => {
      const taxes1 = (item.product.useTaxes)
        ? item.product.taxes
        : 0
      const taxes2 = (item.product.useTaxes2)
        ? item.product.taxes2
        : 0

      const taxesText = `${taxes1 + taxes2}%`

      const removeIcon = this.props.disabled
        ? ''
        : <i onClick={this.removeItem.bind(this, item.uuid)} className='fa fa-minus-square' aria-hidden='true' style={{
          cursor: 'pointer'
        }} />

      const inputField = this.props.client.saleLoaded
        ? <input
          disabled={this.props.disabled}
          onKeyPress={this.discountInputKeyPress.bind(this, item.uuid)}
          onBlur={this.discountInputOnBlur.bind(this, item.uuid)}
          onFocus={this.fieldFocus.bind(this)}
          type='number' className='form-control'
          style={{'width': '55px', 'height': '37px'}}
          value={item.discount}
        />
        : <input
          disabled={this.props.disabled}
          onKeyPress={this.discountInputKeyPress.bind(this, item.uuid)}
          onBlur={this.discountInputOnBlur.bind(this, item.uuid)}
          onFocus={this.fieldFocus.bind(this)}
          type='number' className='form-control'
          style={{'width': '55px', 'height': '37px'}}
        />

      const qtyField = <input
        disabled={this.props.disabled}
        onChange={this.qtyInputChange.bind(this, item.uuid)}
        onFocus={this.fieldFocus.bind(this)}
        type='number'
        className='form-control'
        style={{'width': '90%', 'height': '37px'}}
        value={item.qty}
      />

      const loteField = this.props.defaultConfig.cartItemUseLote || this.props.userConfig.cartItemUseLote
        ? <td style={{
          'padding': '0'
        }}>
          <input
            disabled={this.props.disabled}
            onKeyPress={this.loteInputKeyPress.bind(this, item.uuid)}
            onFocus={this.fieldFocus.bind(this)}
            onBlur={this.loteInputOnBlur.bind(this, item.uuid)}
            type='text' className='form-control'
            style={{'width': '100px', 'height': '37px'}}
          />
        </td>
        : <td />

      const activeClass = item.product.code == this.props.cartItemActive ? 'cart-activeRow' : ''

      return <tr className={activeClass} key={item.uuid} onClick={this.setCartItemActive.bind(this, item.product.code)}>
        <td>
          {item.product.code}
        </td>
        <td>
          {item.product.description}
        </td>
        <td style={{
          'padding': '0'
        }}>
          {qtyField}
        </td>
        <td>
          ₡ {parseFloat(item.priceToUse).formatMoney(2, ',', '.')}
        </td>
        <td style={{
          'padding': '0'
        }}>
          {inputField}
        </td>
        <td>
          {taxesText}
        </td>
        <td>
          ₡ {item.totalWithIv.formatMoney(2, ',', '.')}
        </td>
        {/* <td style={{
          'padding': '0'
        }}>
          <input
            disabled={this.props.disabled}
            onKeyPress={this.loteInputKeyPress.bind(this, item.uuid)}
            onBlur={this.loteInputOnBlur.bind(this, item.uuid)}
            type='text' className='form-control'
            style={{'width': '100px', 'height': '37px'}}
          />
        </td> */}
        {loteField}
        <td>
          {removeIcon}
        </td>
      </tr>
    })

    return <tbody className='table-body'>
      {items}
    </tbody>

  }

}
