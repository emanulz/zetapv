/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import Select2 from 'react-select2-wrapper'

@connect((store) => {
  return {
    visible: store.creditNotes.creditPanelVisible,
    sale: store.creditNotes.saleActive
  }
})
export default class SidePanel extends React.Component {

  togglePanel() {
    this.props.dispatch({type: 'CLEAR_SALE_SELECTED', payload: ''})
    this.props.dispatch({type: 'TOGGLE_CREDIT_NOTE_PANEL', payload: ''})
  }

  // Main Layout
  render() {

    const panelClass = this.props.visible
      ? 'creditNote-sidePanel visible'
      : 'creditNote-sidePanel'

    const sale = this.props.sale

    const client = sale.client ? `${sale.client.name} ${sale.client.last_name}` : 'Cliente de Contado'
    const id = sale.id ? sale.id : '00001'
    const dateObj = sale.created ? new Date(sale.created) : []
    const date = sale.created
      ? `${('0' + dateObj.getDate()).slice(-2)}/
      ${('0' + (dateObj.getMonth() + 1)).slice(-2)}/
      ${dateObj.getFullYear()}`
      : '01/01/1970'

    const cartItems = sale.cart ? sale.cart.cartItems : []
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
          ₡ {item.totalWithIv.formatMoney(2, ',', '.')}
        </td>
      </tr>
    })

    return <div className={panelClass}>
      <div className='creditNote-sidePanel-container'>
        <div className='creditNote-sidePanel-container-header'>
          Registrar Nota de crédito a factura
          <span onClick={this.togglePanel.bind(this)} className='fa fa-close' />
        </div>
        <div className='creditNote-sidePanel-container-content'>

          <div className='creditNote-sidePanel-container-content-table'>
            <div className='creditNote-sidePanel-container-content-table-data'>
              <div><h3>Cliente:</h3> <span>{client}</span></div>
              <div><h3>Factuta:</h3> <span>{id}</span></div>
              <div><h3>Fecha:</h3> <span>{date}</span></div>
            </div>

            <table className='full-invoice-table table'>
              <thead>
                <tr>
                  <th>Código</th>
                  <th className='description-row'>Descripción</th>
                  <th className='right-in-table'>Cantidad</th>
                  <th className='right-in-table'>P.U</th>
                  <th className='right-in-table'>Des%</th>
                  <th className='right-in-table'>IV</th>
                  <th className='right-in-table'>Precio IVI</th>
                </tr>
              </thead>
              <tbody className=''>
                {items}
              </tbody>

            </table>

          </div>

          <div className='creditNote-sidePanel-container-content-side'>

          </div>

        </div>
      </div>
    </div>

  }

}
