import React from 'react'
import {connect} from 'react-redux'
import {updateStoreCardAuth, updateStoreCardDigits} from '../actions'

@connect((store) => {
  return {cardAuth: store.pay.cardAuth, cardDigits: store.pay.cardDigits}
})
export default class PayCard extends React.Component {

  payCardAuthChanged(ev) {

    this.props.dispatch(updateStoreCardAuth(ev.target.value))
  }

  payCardDigitsChanged(ev) {

    this.props.dispatch(updateStoreCardDigits(ev.target.value))
  }

  render() {

    return <div className='pay-method-body'>

      <div className='pay-method-body-header'>
        <span>Tarjeta</span>
      </div>

      <div className='pay-method-body-content'>

        <div className='pay-tag left'>4 DIGITOS:</div>
        <input value={this.props.cardDigits} onChange={this.payCardDigitsChanged.bind(this)} type='Number' className='form-control' />

        <div className='pay-tag left'>AUTORIZACIÓN:</div>
        <input value={this.props.cardAuth} onChange={this.payCardAuthChanged.bind(this)} type='Number' className='form-control' />

        <br />
        <br />

      </div>

    </div>

  }

}
