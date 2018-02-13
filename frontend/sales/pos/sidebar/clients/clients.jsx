/*
 * Module dependencies
 */
import React from 'react'

import {connect} from 'react-redux'
import {clientSelected, searchClient} from './actions'
import {getClientDebt} from '../../../../admin/utils/receivable'
import {recalcCart} from '../../main/product/actions'

@connect((store) => {
  return {clients: store.clients.clients,
    clientSelected: store.clients.clientSelected,
    cart: store.cart.cartItems,
    globalDiscount: store.cart.globalDiscount,
    client: store.clients.clientSelected,
    movements: store.clientmovements.movements,
    debt: store.clients.clientSelectedDebt,
    disabled: store.sales.completed}
})
export default class Clients extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.clientSelected != this.props.clientSelected) {
      // set the discount: default value or 0

      if (!nextProps.clientSelected.saleLoaded) {
        const discount = nextProps.client.defaultDiscount ? nextProps.client.defaultDiscount : 0

        this.props.dispatch(recalcCart(nextProps.cart, discount, nextProps.client))
        this.props.dispatch({type: 'SET_GLOBAL_DISCOUNT', payload: discount})
        const debt = getClientDebt(nextProps.client._id, nextProps.movements)
        this.props.dispatch({type: 'SET_CLIENT_DEBT', payload: debt})

        // SETS VALUE OF DEFAULT DISCOUNT TO FIELD OR 0
        if (nextProps.client.defaultDiscount) {
          document.getElementById('discountField').value = discount
          document.getElementById('discountField').disabled = true
        } else {
          document.getElementById('discountField').value = ''
          document.getElementById('discountField').disabled = false
        }
      }
    }
  }

  inputKeyPress(ev) {
    // if Key pressed id Enter
    if (ev.key == 'Enter') {

      const code = ev.target.value // Split val [0] is code [1] is qty
      this.props.dispatch(clientSelected(code, this.props.clients)) // dispatchs action according to result
    }

  }

  searchClientClick() {

    this.props.dispatch(searchClient())

  }

  // Main Layout
  render() {

    const clientToShow = (this.props.clientSelected)
      ? `${this.props.clientSelected.name} ${this.props.clientSelected.last_name}`
      : 'Cliente Contado'

    // const creditIcon = (this.props.clientSelected && this.props.clientSelected.has_credit)
    //   ? 'fa fa-check-square'
    //   : 'fa fa-times-circle'

    return <div className='col-xs-12 client'>

      {/* <span>
        <b>
          Datos del Cliente:
          <span>
            <i disabled={this.props.disabled} onClick={this.searchClientClick.bind(this)} className='fa fa-edit btn-client-search' />
          </span>
        </b>
      </span>

      <br /><br /> */}

      <div className='row'>

        <div className='col-xs-2'>
          <img disabled={this.props.disabled} onClick={this.searchClientClick.bind(this)} src='/img/profile.jpg'
            className='client-avatar' />
        </div>

        <div className='col-xs-10'>
          <span>
            <b>Cliente :
            </b>
          </span>

          <input disabled={this.props.disabled} onKeyDown={this.inputKeyPress.bind(this)} type='text' className='client-code' />
          <br />
          <span>
            <b>Nombre :
            </b>
          </span>
          <span className='client-name'>{clientToShow}</span>
          {/* <br />
          <span>
            <b>Crédito :
            </b>
          </span>
          <span>
            <i>
              <span className={creditIcon} />
            </i>
          </span>
          <br />
          <span>
            <b>Balance :
            </b>
          </span>
          <span className='client-debt-amount credit-status credit-negative'>
            ₡ {this.props.debt.formatMoney(2, ',', '.')}
          </span> */}

        </div>

      </div>

    </div>

  }

}
