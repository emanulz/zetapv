/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {updateTotals, removeFromCart} from './actions'
import {updateItemDiscount} from '../product/actions'

@connect((store) => {
  return {inCart: store.cart.cartItems,
    client: store.clients.clientSelected,
    globalDiscount: store.cart.globalDiscount,
    disabled: store.sales.completed}
})
export default class CartItems extends React.Component {

  // On component update (The cart has been modified) calls the update totals method in actions file.
  componentDidUpdate() {
    this.props.dispatch(updateTotals(this.props.inCart))

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

  removeItem(code, ev) {

    this.props.dispatch(removeFromCart(this.props.inCart, code))

  }

  // Render the items in cart using table rows

  render() {
    const cartItems = this.props.inCart

    const items = cartItems.map((item) => {

      const taxes1 = (item.product.useTaxes)
        ? item.product.taxes
        : 0
      const taxes2 = (item.product.useTaxes2)
        ? item.product.taxes2
        : 0

      const taxesText = `${taxes1 + taxes2}%`
      return <tr key={item.product.code}>
        <td>
          {item.product.code}
        </td>
        <td>
          {item.product.description}
        </td>
        <td>
          {item.qty}
        </td>
        <td>
          ₡ {parseFloat(item.product.price).formatMoney(2, ',', '.')}
        </td>
        <td style={{
          'padding': '0'
        }}>
          <input
            disabled={this.props.disabled}
            onKeyPress={this.discountInputKeyPress.bind(this, item.product.code)}
            onBlur={this.discountInputOnBlur.bind(this, item.product.code)}
            type='number' className='form-control'
            style={{'width': '55px', 'height': '37px'}}
          />
        </td>
        <td>
          {taxesText}
        </td>
        <td>
          ₡ {item.totalWithIv.formatMoney(2, ',', '.')}
        </td>
        <td>
          <i disabled={this.props.disabled} onClick={this.removeItem.bind(this, item.product.code)} className='fa fa-minus-square' aria-hidden='true' style={{
            cursor: 'pointer'
          }} />
        </td>
      </tr>
    })

    return <tbody className='table-body'>
      {items}
    </tbody>

  }

}
