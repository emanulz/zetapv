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
          {item.product.code}
        </td>
        <td>
          {item.product.description}
        </td>
        <td className='right-in-table'>
          {item.qty}
        </td>
        <td className='right-in-table'>
          ₡ {parseFloat(item.product.price).formatMoney(2, ',', '.')}
        </td>
        <td className='right-in-table'>
          {item.discount}</td>
        <td className='right-in-table'>
          {taxesText}
        </td>
        <td className='right-in-table'>
          {item.lote}
        </td>
        <td className='right-in-table'>
          ₡ {item.totalWithIv.formatMoney(2, ',', '.')}
        </td>
      </tr>
    })

    return <table className='full-invoice-table table'>
      <thead>
        <tr>
          <th>Código</th>
          <th className='description-row'>Descripción</th>
          <th className='right-in-table'>Cantidad</th>
          <th className='right-in-table'>P.U</th>
          <th className='right-in-table'>Des%</th>
          <th className='right-in-table'>IV</th>
          <th className='right-in-table'>Lote</th>
          <th className='right-in-table'>Precio IVI</th>
        </tr>
      </thead>
      <tbody className=''>
        {items}
      </tbody>

    </table>

  }

}
