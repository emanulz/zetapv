/*
 * Module dependencies
 */
import React from 'react'

import {connect} from 'react-redux'
import {recalcCart} from '../../main/product/actions.js'

@connect((store) => {
  return {
    total: store.cart.cartTotal,
    client: store.clients.clientSelected,
    taxes: store.cart.cartTaxes,
    discountTotal: store.cart.discountTotal,
    subTotalNoDiscount: store.cart.cartSubtotalNoDiscount,
    itemsInCart: store.cart.cartItems,
    globalDiscount: store.cart.globalDiscount,
    disabled: store.sales.completed
  }
})
export default class Totals extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      discountVal: 0
    }
  }

  showInvoicePanel() {
    this.props.dispatch({type: 'SHOW_INVOICE_PANEL', payload: -1})
  }

  inputKeyPress(ev) {
    // if Key pressed id Enter
    if (ev.key == 'Enter') {

      const discount = (ev.target.value)
        ? ev.target.value
        : 0
      this.props.dispatch({type: 'SET_GLOBAL_DISCOUNT', payload: discount})
      this.props.dispatch(recalcCart(this.props.itemsInCart, this.state.discountVal, this.props.client))
    } else {
      this.state.discountVal = (ev.target.value)
        ? parseFloat(ev.target.value)
        : 0
    }

  }

  inputOnBlur(ev) {
    // if Key pressed id Enter

    const discount = (ev.target.value)
      ? ev.target.value
      : 0
    this.props.dispatch({type: 'SET_GLOBAL_DISCOUNT', payload: discount})
    this.props.dispatch(recalcCart(this.props.itemsInCart, this.state.discountVal, this.props.client))

  }

  // Main Layout
  render() {

    return <div className='col-xs-12 totals'>
      <div style={{
        'paddingTop': '0',
        'marginTop': '0'
      }} className='bg-white right-item'>
        <span>
          <b>Totales:</b>
        </span><br />
        <table className='table totals-table'>
          <tbody>
            <tr>
              <th>Sub-Total:</th>
              <td className='price'>₡ {this.props.subTotalNoDiscount.formatMoney(2, ',', '.')}</td>

            </tr>
            <tr>
              <th style={{
                'width': '37%'
              }}>Descuento %</th>
              <td style={{
                'padding': '0'
              }}>
                <input
                  disabled={this.props.disabled}
                  onKeyPress={this.inputKeyPress.bind(this)}
                  onChange={this.inputKeyPress.bind(this)}
                  onBlur={this.inputOnBlur.bind(this)}
                  type='number'
                  style={{
                    'width': '100%',
                    'height': '37px',
                    'padding': '0 0 0 10px',
                    'fontSize': '15px',
                    'border': '0',
                    'position': 'relative',
                    'display': 'inline-block'
                  }}
                  className='sale_global_discount_input form-control' />
              </td>

            </tr>
            <tr>
              <th>Descuento:</th>
              <td className='price'>₡ {this.props.discountTotal.formatMoney(2, ',', '.')}</td>

            </tr>

            <tr>
              <th>IV:</th>
              <td className='price'>₡ {this.props.taxes.formatMoney(2, ',', '.')}</td>
            </tr>
            <tr>
              <th>Total:</th>
              <td className='price'>₡ {this.props.total.formatMoney(2, ',', '.')}</td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>

  }

}
