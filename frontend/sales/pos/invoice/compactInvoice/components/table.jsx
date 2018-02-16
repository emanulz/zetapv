import React from 'react'
import {connect} from 'react-redux'

@connect((store) => {
  return {inCart: store.cart.cartItems, globalDiscount: store.cart.globalDiscount}
})
export default class Table extends React.Component {

  // Main Layout
  render() {

    const cartItems = this.props.inCart
    const items = cartItems.map((item) => {

      const taxesText = (item.product.useTaxes)
        ? `G`
        : `E`

      return <tr key={item.uuid}>
        <td>
          {item.qty}
        </td>
        <td>
          {item.product.description}
        </td>
        <td className='right-in-table'>
          {taxesText}
        </td>
        <td className='right-in-table'>
          ₡ {item.subTotalNoDiscount.formatMoney(2, ',', '.')}
        </td>
      </tr>
    })

    return <table className='compact-invoice-table table'>
      <thead>
        <tr>
          <th>Cant</th>
          <th className='description-row'>Articulo</th>
          <th className='right-in-table'>IV</th>
          <th className='right-in-table'>Total</th>
        </tr>
      </thead>
      <tbody className=''>
        {items}
      </tbody>

    </table>

  }

}
