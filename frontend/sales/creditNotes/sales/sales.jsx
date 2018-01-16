/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {formatDateTimeAmPm} from '../../../utils/formatDate.js'

@connect((store) => {
  return {
    sales: store.creditNotes.salesFiltered
  }
})
export default class Products extends React.Component {

  bntMovementClick(product, event) {
    this.props.dispatch({type: 'SET_PRODUCT', payload: product})
    this.props.dispatch({type: 'TOGGLE_PANEL', payload: ''})
    const movement = {
      ...this.props.movement
    }

    movement.productId = product._id
    this.props.dispatch({type: 'SET_PRODUCT_MOVEMENT', payload: movement})
  }

  // Main Layout
  render() {

    const sales = this.props.sales

    // HEADER OF THE TABLE BASE OF WHETER IS PHYSICAL TAKE OR NOT
    const header = <tr>
      <td className='sale-row'>Venta #</td>
      <td className='date-row'>Fecha</td>
      <td className='client-row'>Cliente</td>
      <td className='client-row'>Monto Total</td>
      <td className='btn-row'>Selecccionar</td>
    </tr>

    // BODY OF THE TABLE
    const body = sales.map(sale => {
      const selectBtn = <button onClick={this.bntMovementClick.bind(this, sale)} className='btn btn-success'>
        <span className='fa fa-exchange' />
      </button>

      const date = formatDateTimeAmPm(sale.created)

      return <tr key={sale._id}>
        <td>{sale.id}</td>
        <td>{date}</td>
        <td>{`${sale.client.name} ${sale.client.last_name}`}</td>
        <td>₡ {sale.cart.cartTotal.formatMoney(2, ',', '.')}</td>
        <td>{selectBtn}</td>
      </tr>
    })

    // RETURN BLOCK
    return <div className='creditNoteSales'>
      <table className='creditNoteSales-table table col-xs-12'>
        <thead>
          {header}
        </thead>
        <tbody>
          {body}
        </tbody>
      </table>

    </div>

  }

}
