import React from 'react'
import {saveItem} from '../actions'
import {connect} from 'react-redux'

@connect((store) => {
  return {
    cart: store.cart,
    payMethod: store.pay.payMethod,
    pay: store.pay,
    client: store.clients.clientSelected,
    sales: store.sales.sales
  }
})
export default class PaySideBar extends React.Component {

  saveBtn() {
    const sales = this.props.sales
    const sortedSales = sales.length > 1 ? sales.sort((a, b) => a.id < b.id) : sales
    const nextId = sortedSales.length > 0 ? sortedSales[0].id + 1 : 1

    const sale = {
      id: nextId,
      docType: 'SALE',
      cart: this.props.cart,
      client: this.props.client,
      pay: this.props.pay,
      created: new Date()
    }

    const kwargs = {
      db: 'sales',
      item: sale,
      sucessMessage: 'Venta creada Correctamente.',
      errorMessage: 'Hubo un error al crear la venta, intente de nuevo.',
      dispatchType: 'SHOW_INVOICE_PANEL'
    }

    this.props.dispatch(saveItem(kwargs))

  }

  render() {

    let change = 0
    let payButtonClass = 'pay-tag tag-button'
    const total = parseFloat(this.props.cart.cartTotal)
    const cash = parseFloat(this.props.pay.cashAmount)

    switch (this.props.payMethod) {

      case 'CASH':
      {
        change = cash - total
        payButtonClass = (total > 0 && change >= 0)
          ? 'pay-tag tag-button enable'
          : 'pay-tag tag-button'
        break
      }

      case 'CARD':
      {
        const auth = this.props.pay.cardAuth
        const digits = this.props.pay.cardDigits
        change = parseFloat(this.props.pay.cashAmount) - parseFloat(this.props.total)
        payButtonClass = (total > 0 && auth && digits)
          ? 'pay-tag tag-button enable'
          : 'pay-tag tag-button'
        break
      }

    }

    return <div className='pay-side-bar'>
      <div className='pay-method-body-header'>
        <span>Pago</span>
      </div>

      <div className='pay-method-body-content'>

        <div className='pay-tag left'>
          TOTAL :</div>
        <div className='pay-tag right'>
          ₡ {this.props.cart.cartTotal.formatMoney(2, ',', '.')}</div>

        <div className='pay-tag left'>VUELTO :</div>
        <div className='pay-tag right'>
          ₡ {change.formatMoney(2, ',', '.')}</div>

        <br />

        <div onClick={this.saveBtn.bind(this)} className={payButtonClass}>
          Pagar
          <i className='fa fa-credit-card' aria-hidden='true' />
        </div>

      </div>

    </div>

  }

}
