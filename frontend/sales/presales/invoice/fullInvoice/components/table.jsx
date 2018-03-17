import React from 'react'
import {connect} from 'react-redux'

@connect((store) => {
  return {inCart: store.cart.cartItems, globalDiscount: store.cart.globalDiscount}
})
export default class Table extends React.Component {

  // Main Layout
  render() {

    const cartItems = this.props.inCart
    const globalDiscount = (this.props.globalDiscount)
      ? <td className='right-in-table'>{this.props.globalDiscount}</td>
      : ''
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
          ₡ {parseFloat(item.priceToUse).formatMoney(2, ',', '.')}
        </td>
        <td className='right-in-table'>
          {item.discount}</td>
        {globalDiscount}
        <td className='right-in-table'>
          {taxesText}
        </td>
        {/* <td className='right-in-table'>
          {item.lote}
        </td> */}
        <td className='right-in-table'>
          ₡ {item.subTotalNoDiscount.formatMoney(2, ',', '.')}
        </td>
      </tr>
    })

    const globalDiscountRow = this.props.globalDiscount ? <th className='right-in-table'>Des2 %</th> : ''

    return <table className='full-invoice-table table'>
      <thead>
        <tr>
          <th>Código</th>
          <th className='description-row'>Descripción</th>
          <th className='right-in-table'>Cantidad</th>
          <th className='right-in-table'>P.U</th>
          <th className='right-in-table'>Des%</th>
          {globalDiscountRow}
          <th className='right-in-table'>IV</th>
          {/* <th className='right-in-table'>Lote</th> */}
          <th className='right-in-table'>Precio</th>
        </tr>
      </thead>
      <tbody className=''>
        {items}
      </tbody>

    </table>

  }

}
