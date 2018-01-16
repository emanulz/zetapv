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
export default class Sales extends React.Component {

  bntCreditNoteClick(sale, event) {
    this.props.dispatch({type: 'SET_SALE_SELECTED', payload: sale})
    this.props.dispatch({type: 'TOGGLE_CREDIT_NOTE_PANEL', payload: ''})
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
      const selectBtn = <button onClick={this.bntCreditNoteClick.bind(this, sale)} className='btn btn-success'>
        <span className='fa fa-ticket' />
      </button>

      const date = formatDateTimeAmPm(sale.created)

      return <tr key={sale._id}>
        <td>{sale.id}</td>
        <td>{date}</td>
        <td>{`${sale.client.name} ${sale.client.last_name}`}</td>
        <td>₡ {sale.cart.cartTotal.formatMoney(2, ',', '.')}</td>
        <td className='center'>{selectBtn}</td>
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
