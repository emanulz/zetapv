/*
 * Module dependencies
 */
import React from 'react'

import {connect} from 'react-redux'
import {clientSelected, searchClient} from './actions'

@connect((store) => {
  return {clients: store.clients.clients, clientSelected: store.clients.clientSelected}
})
export default class Clients extends React.Component {

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

    const creditIcon = (this.props.clientSelected && this.props.clientSelected.has_credit)
      ? 'fa fa-check-square'
      : 'fa fa-times-circle'

    return <div className='col-xs-12 client'>

      <span>
        <b>
          Datos del Cliente:
          <span>
            <i onClick={this.searchClientClick.bind(this)} className='fa fa-edit btn-client-search' />
          </span>
        </b>
      </span>

      <br /><br />

      <div className='row'>

        <div className='col-xs-2'><img onClick={this.searchClientClick.bind(this)} src='/img/profile.jpg' className='client-avatar' /></div>

        <div className='col-xs-10'>
          <span>
            <b>Código :
            </b>
          </span>

          <input onKeyDown={this.inputKeyPress.bind(this)} type='text' className='client-code' />
          <i className='fa fa-street-view' /><br />

          <span>
            <b>Nombre :
            </b>
          </span>
          <span className='client-name'>{clientToShow}</span>
          <br />
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
          <span className='client-debt-amount credit-status credit-positive'>₡ 0</span>

        </div>

      </div>

    </div>

  }

}
