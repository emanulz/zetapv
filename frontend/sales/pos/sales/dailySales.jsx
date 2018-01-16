import React from 'react'
import {connect} from 'react-redux'
import {formatDateTimeAmPm} from '../../../utils/formatDate.js'

@connect((store) => {
  return {sales: store.sales.sales, isSalesPanelVisible: store.sales.isSalesPanelVisible}
})
export default class SalesPanel extends React.Component {

  hidePanel() {

    this.props.dispatch({type: 'HIDE_SALES_PANEL', payload: -1})
  }

  render() {

    const isVisible = (this.props.isSalesPanelVisible)
      ? 'sales-panel is-visible'
      : 'sales-panel'

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const filteredSales = this.props.sales.filter(sale => {
      const date = new Date(sale.created)
      date.setHours(0, 0, 0, 0)
      return +date === +today
    })

    filteredSales.sort((a, b) => {
      if (a.id > b.id) {
        return 1
      }
      if (a.id < b.id) {
        return -1
      }
      return 0
    })

    const itemsToRender = filteredSales.map(sale => {
      return <tr key={sale._id}>
        <td><a href={`/sales/pos/${sale.id}`} target='_blank'>{sale.id}</a></td>
        <td>{`${formatDateTimeAmPm(sale.created)}`}</td>
        <td>{`${sale.client.name} ${sale.client.last_name}`}</td>
        <td>₡ {parseFloat(sale.cart.cartTotal).formatMoney(2, ',', '.')}</td>
      </tr>
    })

    return <div className={isVisible}>
      <div className='sales-panel-header'>
        VENTAS DEL DÍA
        <i onClick={this.hidePanel.bind(this)} className='fa fa-times' aria-hidden='true' />
      </div>
      <div className='sales-panel-container'>
        <div className='col-xs-12'>
          <table className='table'>
            <thead>
              <tr>
                <td>#</td>
                <td>Fecha</td>
                <td>Cliente</td>
                <td>Monto</td>
              </tr>
            </thead>
            <tbody>
              {itemsToRender}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  }

}
