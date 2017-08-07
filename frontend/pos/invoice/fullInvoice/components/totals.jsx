import React from 'react'
import {connect} from 'react-redux'

@connect((store) => {
  return {
    total: store.cart.cartTotal,
    taxes: store.cart.cartTaxes,
    discountTotal: store.cart.discountTotal,
    subTotalNoDiscount: store.cart.cartSubtotalNoDiscount,
    itemsInCart: store.cart.cartItems,
    globalDiscount: store.cart.globalDiscount
  }
})
export default class Totals extends React.Component {

  render() {

    return <div className='full-invoice-totals'>

      <table>
        <tbody>
          <tr>
            <th>Sub-total</th>
            <td>₡ {this.props.subTotalNoDiscount.formatMoney(2, ',', '.')}</td>

          </tr>
          <tr>
            <th>Descuento</th>
            <td>₡ {this.props.discountTotal.formatMoney(2, ',', '.')}</td>
          </tr>
          <tr>
            <th>IV</th>
            <td>₡ {this.props.taxes.formatMoney(2, ',', '.')}</td>
          </tr>
          <tr className='total-row'>
            <th>Total</th>
            <td>₡ {this.props.total.formatMoney(2, ',', '.')}</td>
          </tr>
        </tbody>
      </table>

    </div>

  }

}
