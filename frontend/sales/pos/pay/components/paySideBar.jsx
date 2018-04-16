import React from 'react'
import {saveItem, loadSale} from '../actions'
import {connect} from 'react-redux'
const Mousetrap = require('mousetrap')

@connect((store) => {
  return {
    cart: store.cart,
    payMethod: store.pay.payMethod,
    pay: store.pay,
    client: store.clients.clientSelected,
    user: store.clients.userSelected,
    debt: store.clients.clientSelectedDebt,
    sales: store.sales.sales,
    saleId: store.sales.saleActiveId,
    sale: store.sales.saleActive,
    movements: store.clientmovements.movements
  }
})
export default class PaySideBar extends React.Component {

  componentWillUpdate(nextProps) {

    if (nextProps.sales.length && nextProps.sales != this.props.sales) {

      const sale = window.location.href.split('/').pop()

      // If is loading sale
      if (sale != 'pos' && sale != '' && sale != 'proforma' && sale != 'presale') {
        console.log('LOADED SALE!!!!!!!', sale)
        this.props.dispatch(loadSale(sale, nextProps.sales))

        Mousetrap.reset()

      }
    }

  }

  saveBtn() {
    const sales = this.props.sales

    const sortedSales = sales.length > 1 ? sales.sort((a, b) => {
      if (a.id < b.id) {
        return 1
      }
      if (a.id > b.id) {
        return -1
      }
      return 0
    }) : sales

    const nextId = sortedSales.length > 0 ? sortedSales[0].id + 1 : 1

    const sale = {
      id: nextId,
      docType: 'SALE',
      cart: this.props.cart,
      client: this.props.client,
      user: this.props.user,
      pay: this.props.pay,
      created: new Date()
    }

    if (this.props.pay.payMethod == 'CREDIT') {
      sale.pay.debt = this.props.cart.cartTotal
      sale.pay.payed = false
    }
    const kwargs = {
      db: 'sales',
      movements: this.props.movements,
      item: sale,
      sucessMessage: 'Venta creada Correctamente.',
      errorMessage: 'Hubo un error al crear la venta, intente de nuevo.'
    }

    this.props.dispatch(saveItem(kwargs))
    Mousetrap.reset()

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
      case 'CREDIT':
      {
        const available = parseFloat(this.props.client.credit_limit) - parseFloat(this.props.debt)
        payButtonClass = (total > 0 && total <= available && this.props.client.has_credit)
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
