import React from 'react'
import {connect} from 'react-redux'

@connect((store) => {
  return {client: store.clients.clientSelected, debt: store.clients.clientSelectedDebt}
})
export default class PayCredit extends React.Component {

  render() {
    const available = this.props.client.credit_limit - this.props.debt
    const clientLimit = this.props.client.has_credit
      ? `₡ ${this.props.client.credit_limit.formatMoney(2, ',', '.')}`
      : 'SIN CRÉDITO'
    const clientAvailable = this.props.client.has_credit
      ? `₡ ${available.formatMoney(2, ',', '.')}`
      : 'SIN CRÉDITO'

    return <div className='pay-method-body'>

      <div className='pay-method-body-header'>
        <span>Crédito</span>
      </div>

      <div className='pay-method-body-content'>

        <div className='pay-tag left'>LÍMITE:</div>
        <div className='pay-tag right'>
          {clientLimit}
        </div>

        <div className='pay-tag left'>DISPONIBLE:</div>
        <div className='pay-tag right'>
          {clientAvailable}</div>

        <br />
        <br />

      </div>

    </div>

  }

}
